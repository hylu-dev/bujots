import { MouseEvent, ReactElement, ReactNode } from 'react'
import { motion } from 'framer-motion';

type Props = {
    styles?: String,
    handler?: (e: MouseEvent) => void,
    value?: String,
    type?: "button" | "submit" | "reset" | undefined
    children?: ReactNode | ReactElement;
};

export default function Button({ styles, handler, value, type, children }: Props) {
    const styleClasses = styles || "";
    const buttonType = type || "button"

    return <>
        <motion.button
            className={`${styleClasses} grid place-content-center`}
            onClick={handler}
            type={buttonType}
            whileHover={{scale:1.1}}
            whileTap={{scale:1}}
        >
            {value}
            {children}
        </motion.button>
    </>
}
