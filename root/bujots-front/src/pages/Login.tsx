import { useState, useEffect, MouseEvent } from 'react'
import { NavigateFunction, useNavigate } from "react-router-dom";
import LoginInput from '../components/LoginInput'
import Button from '../components/Button'
import JournalCover from '../components/JournalCover'
import { get, post } from '../utils'
import { motion } from 'framer-motion';

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

    }, [token])

    const login_request = async (e: MouseEvent) => {
        e.preventDefault();
        setIsLoading(true);
        const request = post(`${process.env.REACT_APP_API_URL}/auth/login`, {
            username: username,
            password: password
        }, token)
        const errorList: String[] = [];
        await request.then(res => {
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
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { ease: [0.075, 0.82, 0.165, 1] } }}
            exit={{ opacity: 0, rotate: 40, translateX: -200, translateY: 300 }}
            transition={{ ease: "easeOut", duration: .5 }}
        >
            {/* A4 Aspect Ratio 1:1.4142 */}
            <JournalCover>
                <ul className="has-text-danger">
                    {errors.map(item => <li className="list-disc text-sm text-red-700 pb-2">{item}</li>)}
                </ul>
                <form action="" className='flex items-center flex-col'>
                    <LoginInput
                        placeholder='Username'
                        onChange={e => setUsername(e.target.value)}
                    />
                    <LoginInput
                        placeholder='Password'
                        type='password'
                        onChange={e => setPassword(e.target.value)}
                    />
                    <Button
                        styles={"bg-cover-dark w-fit px-3 my-5 text-grey"}
                        value={"Login"}
                        handler={login_request}
                        type={"submit"}
                    ></Button>
                </form>
            </JournalCover>
        </motion.div>
    </>
}
