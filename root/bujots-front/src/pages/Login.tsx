import React, { useState, MouseEvent } from 'react'
import LoginInput from '../components/LoginInput'
import Button from '../components/Button'
import JournalCover from '../components/JournalCover'
import { post } from '../utils'

type Props = {};

type State = {
    username: String;
    password: String;
    isLoading: Boolean;
}

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const login_request = async (e: MouseEvent) => {
        e.preventDefault();
        setIsLoading(true);
        let request = post("localhost:5000/users/all");
    }

    return <>
        {/* A4 Aspect Ratio 1:1.4142 */}
        <JournalCover>
            <div className='h-full flex flex-col'>
                <div className="grid place-content-center basis-0 grow-[1]">
                    <h1 className='font-bold text-4xl opacity-75'>Bujots.</h1>
                </div>
                <div className="flex basis-0 grow-[2] flex-col items-center">
                    <LoginInput
                        placeholder='Username'
                        onChange={e => setUsername(e.target.value)}
                    />
                    <LoginInput
                        placeholder='Password'
                        onChange={e => setPassword(e.target.value)}
                    />
                    <Button
                        styles={"bg-cover-dark w-fit px-3 my-5 text-grey"}
                        value={"Login"}
                        handler={login_request}
                    ></Button>
                </div>
            </div>
        </JournalCover>
    </>
}

export default Login
