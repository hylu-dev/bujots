import { motion } from "framer-motion";

export default function AddStickerButton() {
    return (
        <motion.div className='grid h-[80px] place-content-center border-2 border-paper-dark'
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 1 }}
        >
            <span className="text-black opacity-100 select-none">+</span>
        </motion.div>
    )
}
