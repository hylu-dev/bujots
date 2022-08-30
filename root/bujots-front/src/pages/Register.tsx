import { useState, MouseEvent } from 'react'
import { NavigateFunction, useNavigate } from "react-router-dom";
import FormInput from '../components/FormInput'
import JournalCover from '../components/JournalCover';
import Button from '../components/Button'
import { post } from '../utils'

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
            if (res.status === 200) {
                res.json().then(data => {
                    navigate("/");
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
            <ul className="has-text-danger">
                {errors.map(item => <li className="list-disc text-sm text-red-700 pb-2">{item}</li>)}
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
                    styles={"bg-cover-dark w-fit px-3 my-5 rounded"}
                    value={"Create"}
                    handler={register_request}
                    type={"submit"}
                ></Button>
            </form>
            <Button
                    styles={"text-grey"}
                    value={"Back"}
                    handler={() => navigate('/')}
            ></Button>
        </JournalCover>
    </>
}
