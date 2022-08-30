import { ChangeEvent } from 'react'

type Props = {
    placeholder?: string
    type?: string,
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void
};

export default function FormInput({ placeholder, type, onChange }: Props) {
    return <>
        <div className='flex justify-center'>
            <input type={type || "text"} placeholder={placeholder} className='
            bg-transparent
            border-0
            border-b
            border-black
            opacity-75
            placeholder-gray-800
            text-center
            '
                onChange={onChange}
            />
        </div>
    </>
}