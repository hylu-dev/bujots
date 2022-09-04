import { useState, MouseEvent } from 'react'
import { NavigateFunction, useNavigate } from "react-router-dom";
import FormInput from '../components/FormInput'
import JournalCover from '../components/JournalCover';
import Button from '../components/common/Button'
import { post } from '../utils'
import Spinner from '../components/common/Spinner';

export default function Register() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState<String[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const navigate: NavigateFunction = useNavigate();
    const token = window.localStorage.getItem("access_token") || "";

    const register_request = async (e: MouseEvent) => {
        e.preventDefault();
        setIsLoading(true);
        const request = post(`${process.env.REACT_APP_API_URL}/users/add`, {
            username: username,
            password: password
        }, token)
        const errorList: String[] = [];
        await request.then(res => {
            setIsLoading(false);
            if (res.status === 200) {
                res.json().then(data => {
                    navigate("/");
                })
            } else if (res.status === 400) {
                res.json().then(data => {
                    
                    data.errors.forEach((err: any) => {
                        errorList.push(err.msg)
                    })
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
            <form action="" className='flex items-center flex-col'>
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
                    styles={"bg-cover-dark w-fit px-3 py-2 my-5 rounded"}
                    handler={register_request}
                    type={"submit"}
                >{isLoading ? <Spinner size={1.5} ringColor='#c29c75' spinColor='#5c4d3b'></Spinner> : "Create"}</Button>
            </form>
            <Button
                    styles={"text-grey"}
                    value={"Back"}
                    handler={() => navigate('/')}
            ></Button>
        </JournalCover>
    </>
}
