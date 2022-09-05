import { useState, useEffect, MouseEvent } from 'react'
import { NavigateFunction, useNavigate } from "react-router-dom";
import FormInput from '../components/common/FormInput'
import Button from '../components/common/Button'
import JournalCover from '../components/JournalCover'
import { get, post } from '../utils'
import Spinner from '../components/common/Spinner';

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState<String[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const navigate: NavigateFunction = useNavigate();
    const token = window.localStorage.getItem("access_token") || "";

    useEffect(() => {
        get(`${process.env.REACT_APP_API_URL}/auth/getCurrentUser`, token)
            .then(response => {
                if (response.status === 200) {
                    response.json().then(() => {
                        navigate("/journal");
                    })
                }
            })

    }, [])

    const login_request = async (e: MouseEvent) => {
        e.preventDefault();
        setIsLoading(true);
        const request = post(`${process.env.REACT_APP_API_URL}/auth/login`, {
            username: username,
            password: password
        }, token)
        const errorList: String[] = [];
        await request.then(res => {
            setIsLoading(false);
            if (res.status === 200) {
                res.json().then(data => {
                    localStorage.setItem('access_token', data.accessToken);
                    navigate("/journal");
                })
            } else {
                res.json().then(data => {
                    errorList.push(data.error)
                    setErrors(errorList);
                })
            }
        })
    }

    return <>
        {/* A4 Aspect Ratio 1:1.4142 */}
        <JournalCover>
            <ul className="flex flex-col px-5">
                {errors.map(item => <li className="text-center list-disc text-xs text-red-800 pb-2">{item}</li>)}
            </ul>
            <form action="" className='flex w-full items-center flex-col'>
                <FormInput
                    placeholder='Username'
                    onChange={e => setUsername(e.target.value)}
                />
                <FormInput
                    placeholder='Password'
                    type='password'
                    onChange={e => setPassword(e.target.value)}
                />
                <Button
                    styles={"bg-cover-dark w-16 h-8 w-fit px-3 py-2 my-5 rounded text-cover-light"}
                    handler={login_request}
                    type={"submit"}
                >{isLoading ? <Spinner size={1} ringColor='#c29c75' spinColor='#5c4d3b'></Spinner> : "Login"}</Button>
            </form>
        </JournalCover>
    </>
}
