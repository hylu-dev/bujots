import { motion } from 'framer-motion';
import { ChangeEvent } from 'react';

type Props = {
  text: string,
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void,
  onDelete?: () => void
};

export default function Jot({ text, onChange, onDelete }: Props) {

  return (
    <motion.li className='relative'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}>
      <input type="text" defaultValue={text} onChange={onChange}
        className={`w-full
        focus:bg-white
        outline-none
        bg-white
        focus:outline-paper-dark`}
      />
      <motion.div className='grid place-content-center select-none text-white text-[.5rem] rounded-full h-3 w-3 bg-paper-dark
      absolute -top-1.5 -right-1.5'
        onClick={onDelete}
        whileHover={{ scale: 1.3 }}>
        &#10005;
      </motion.div>
    </motion.li >
  )
}
