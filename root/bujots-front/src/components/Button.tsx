import { MouseEvent } from 'react'

type Props = {
    styles?: String,
    handler?: (e: MouseEvent) => void,
    value?: String,
    type?: "button" | "submit" | "reset" | undefined
};

export default function Button({styles, handler, value, type}: Props) {
    const styleClasses = styles || "";
    const buttonType = type || "button"

    return <>
        <button
            className={`${styleClasses}`}
            onClick={handler}
            type={buttonType}
        >
            {value}
        </button>
    </>
}
