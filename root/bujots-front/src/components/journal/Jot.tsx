import { motion } from 'framer-motion';
import { ChangeEvent, useState } from 'react';
import { useSelector, useDispatch, } from 'react-redux';
import { getCurrentPage, setJots } from '../../slices/journalSlice'

type Props = {
  text: string,
  index: number,
  saveHandler: () => void
};

export default function Jot({ text, index, saveHandler }: Props) {
  const page = useSelector(getCurrentPage);
  const dispatch = useDispatch();
  const [isFocused, setIsFocused] = useState(false);

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
      onHoverStart={() => setIsFocused(true)}
      onHoverEnd={() => setIsFocused(false)}
    >
      <motion.input type="text" defaultValue={text}
        transition={{ ease: [0.075, 0.82, 0.165, 1], duration: .5 }}
        whileHover={{
          translateY: -2,
          background: 'white',
          boxShadow: '0px 0px 2px #666'
        }}
        onChange={(e: ChangeEvent<HTMLInputElement>) => updateJot(e.target.value)}
        onBlur={saveHandler}
        className={`w-full
        outline-none
        outline-1
        focus:outline-paper-dark
        bg-transparent`}
      />
      {
        isFocused && <motion.button className='grid place-content-center select-none text-white text-[.5rem] rounded-full h-3 w-3 bg-paper-dark
        absolute -top-1.5 -right-1.5'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ ease: [0.075, 0.82, 0.165, 1], duration: .5 }}
          onClick={removeJot}
          whileHover={{ scale: 1.3 }}
          whileTap={{ scale: 1 }}>
          &#10005;
        </motion.button>
      }

    </motion.li >
  )
}
