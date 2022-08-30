import { MouseEvent } from 'react'
import { motion } from 'framer-motion';

type Props = {
    styles?: String,
    handler?: (e: MouseEvent) => void,
    value?: String,
    type?: "button" | "submit" | "reset" | undefined
};

export default function Button({ styles, handler, value, type }: Props) {
    const styleClasses = styles || "";
    const buttonType = type || "button"

    return <>
        <motion.button
            className={`${styleClasses}`}
            onClick={handler}
            type={buttonType}
            whileHover={{scale:1.1}}
            whileTap={{scale:1}}
        >
            {value}
        </motion.button>
    </>
}
