import React, { MouseEvent } from 'react'

type Props = {
    styles?: String,
    handler?: (e: MouseEvent) => void,
    value?: String
};

const Button = ({styles, handler, value}: Props) => {
    const styleClasses = styles ? styles : "";

    return <>
        <button
            className={`${styleClasses}`}
            onClick={handler}
        >
            {value}
        </button>
    </>
}

export default Button
