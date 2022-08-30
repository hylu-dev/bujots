import { motion } from 'framer-motion';
import { ChangeEvent } from 'react';
import { useSelector, useDispatch, } from 'react-redux';
import { getCurrentPage, setJots } from '../../slices/journalSlice'

type Props = {
  text: string,
  index: number
};

export default function Jot({ text, index }: Props) {
  const page = useSelector(getCurrentPage);
  const dispatch = useDispatch();

  const removeJot = () => {
    const newJots = [...page.jots];
    newJots.splice(index, 1);
    dispatch(setJots(newJots));
  }

  const updateJot = (text: string) => {
    const newJots = [...page.jots];
    newJots[index] = { text: text };
    dispatch(setJots(newJots));
  }

  return (
    <motion.li className='relative'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}>
      <input type="text" defaultValue={text} onChange={ (e: ChangeEvent<HTMLInputElement>) => updateJot(e.target.value)}
        className={`w-full
        focus:bg-white
        outline-none
        bg-white
        focus:outline-paper-dark`}
      />
      <motion.div className='grid place-content-center select-none text-white text-[.5rem] rounded-full h-3 w-3 bg-paper-dark
      absolute -top-1.5 -right-1.5'
        onClick={removeJot}
        whileHover={{ scale: 1.3 }}
        whileTap={{ scale: 1 }}>
        &#10005;
      </motion.div>
    </motion.li >
  )
}
