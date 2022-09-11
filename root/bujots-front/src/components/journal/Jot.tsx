import { motion } from 'framer-motion';
import React, { ChangeEvent, useState } from 'react';
import { useSelector, useDispatch, } from 'react-redux';
import { getCurrentPage, setJots } from '../../slices/journalSlice'

type Props = {
  text: string,
  index: number,
  saveHandler: () => void,
  addHandler: () => void
};

export default function Jot({ text, index, saveHandler, addHandler }: Props) {
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

  const triggerAdd = (e: React.KeyboardEvent<HTMLInputElement>) => {
    console.log(e.key);
    switch (e.key) {
      case "Enter":
        addHandler();
        break;
      case "Backspace":
        if (!(e.target as HTMLInputElement).value.length) removeJot()
        break;
      default: return
    }
  }

  return (
    <motion.li className='relative'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onHoverStart={() => setIsFocused(true)}
      onHoverEnd={() => setIsFocused(false)}
    >
      <motion.input type="text" defaultValue={text} autoFocus
        className={`w-full
        outline-none
        outline-1
        hover:outline-paper-dark
        hover:bg-white
        focus:bg-white
        focus:outline-paper-dark
        bg-transparent`}
        transition={{ ease: [0.075, 0.82, 0.165, 1], duration: .5 }}
        onChange={(e: ChangeEvent<HTMLInputElement>) => updateJot(e.target.value)}
        onBlur={saveHandler}
        onKeyDown={e => triggerAdd(e)}
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
