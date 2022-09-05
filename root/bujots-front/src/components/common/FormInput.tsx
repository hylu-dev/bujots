import { ChangeEvent } from 'react'

type Props = {
    placeholder?: string
    type?: string,
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void
};

export default function FormInput({ placeholder, type, onChange }: Props) {
    return <>
        <div className='flex justify-center'>
            <input type={type || "text"} placeholder={placeholder} maxLength={20} className='
            bg-transparent
            border-0
            border-b
            border-black
            opacity-75
            placeholder-gray-800
            text-center
            w-4/5
            outline-none
            box-border
            focus:p-1
            transition-all
            '
                onChange={onChange}
            />
        </div>
    </>
}