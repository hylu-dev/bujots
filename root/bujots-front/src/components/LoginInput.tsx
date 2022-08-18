import React, { ChangeEvent } from 'react'

type Props = {
    placeholder?: string
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void
};

const LoginInput = ({ placeholder, onChange }: Props) => {
    return <>
        <div className='flex justify-center'>
            <input type="text" placeholder={placeholder} className='
            bg-transparent
            border-0
            border-b
            border-black
            opacity-75
            placeholder-gray-800
            '
                onChange={onChange}
            />
        </div>
    </>

}

export default LoginInput
