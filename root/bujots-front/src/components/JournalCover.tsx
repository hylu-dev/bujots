import React, { useState, MouseEvent } from 'react'
import LoginInput from './LoginInput'
import Button from './Button'
import { post } from '../utils'

type Props = {};

type State = {
    username: String;
    password: String;
    isLoading: Boolean;
}

const JournalCover = () => {
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
        <div className='flex h-[500px] w-[354px] bg-cover-light rounded shadow-md'>
            <div className='bg-cover-dark basis-0 grow-[1]'>

            </div>
            <div className='basis-0 grow-[5] p-5'>
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
            </div>
        </div>
    </>
}

export default JournalCover
