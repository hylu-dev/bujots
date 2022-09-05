import { ReactElement, ReactNode } from "react";
import { motion } from 'framer-motion'
import { useDispatch } from "react-redux";
import { setMousePos } from "../../slices/userSlice";

type Props = {
  children: ReactNode | ReactElement;
};

export default function JournalLayout({ children }: Props) {
  const dispatch = useDispatch();

  {/* A4 Aspect Ratio 1:1.4142 */ }
  return (
    <motion.div className='h-screen w-screen grid sm:place-content-start md:place-content-center'
      onMouseMove={(e) => dispatch(setMousePos([e.clientX, e.clientY]))}
      onTouchStart={(e) => dispatch(setMousePos([e.touches[0].clientX, e.touches[0].clientY]))}
      onTouchMove={(e) => dispatch(setMousePos([e.touches[0].clientX, e.touches[0].clientY]))}
    >
      <div className="grid 
      grid-cols-journal-sm grid-rows-sm
      lg:grid-cols-journal lg:grid-rows-journal
      xl:grid-cols-journal-xl xl:grid-rows-journal-xl
      3xl:grid-cols-journal-2xl 3xl:grid-rows-journal-2xl
      ">
        {children}
      </div>
    </motion.div>
  )
}
