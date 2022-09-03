import { ReactElement, ReactNode } from "react";
import { motion } from 'framer-motion'
import { useDispatch } from "react-redux";
import { setMousePos } from "../../slices/userSlice";

type Props = {
  children: ReactNode | ReactElement;
};

export default function JournalLayout({ children }: Props) {
  const dispatch = useDispatch();

  return (
    <motion.div className='h-screen w-screen grid sm:place-content-start md:place-content-center'
      onMouseMove={(e) => dispatch(setMousePos([e.clientX, e.clientY]))}
      onTouchStart={(e) => dispatch(setMousePos([e.touches[0].clientX, e.touches[0].clientY]))}
      onTouchMove={(e) => dispatch(setMousePos([e.touches[0].clientX, e.touches[0].clientY]))}
    >
      <div className="grid grid-cols-journal grid-rows-journal">
        {children}
      </div>
    </motion.div>
  )
}
