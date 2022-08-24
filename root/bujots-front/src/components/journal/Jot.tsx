import { motion } from 'framer-motion';
import { ChangeEvent } from 'react';

type Props = {
  text: string,
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
};

export default function Jot({ text, onChange }: Props) {

  return (
    <motion.li>
      <input type="text" defaultValue={text} onChange={onChange}
        className="w-full focus:bg-white bg-paper-light outline-none focus:outline-paper-dark"
      />
    </motion.li>
  )
}
