import React, { Component, ChangeEvent } from 'react'

type Props = {
    placeholder?: string
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void
};

export default class LoginInput extends Component<Props> {
    render() {
        const placeholder = this.props.placeholder;
        const onChange = this.props.onChange;
        return (
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
        )
    }
}
