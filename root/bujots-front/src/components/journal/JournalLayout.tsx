import { ReactElement, ReactNode } from "react";
import { motion } from 'framer-motion'
import { useDispatch } from "react-redux";
import { setMousePos } from "../../slices/userSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

type Props = {
  children: ReactNode | ReactElement;
};

export default function JournalLayout({ children }: Props) {
  const dispatch = useDispatch();

  {/* A4 Aspect Ratio 1:1.4142 */ }
  return (
    <motion.div className='h-screen w-screen grid sm:place-content-start lg:justify-center xl:place-content-center p-5'
      onMouseMove={(e) => dispatch(setMousePos([e.clientX, e.clientY]))}
      onTouchStart={(e) => dispatch(setMousePos([e.touches[0].clientX, e.touches[0].clientY]))}
      onTouchMove={(e) => dispatch(setMousePos([e.touches[0].clientX, e.touches[0].clientY]))}
    >
      <div className="grid 
      md:grid-cols-journal md:grid-rows-journal
      lg:grid-cols-journal lg:grid-rows-journal
      xl:grid-cols-journal-xl xl:grid-rows-journal-xl
      3xl:grid-cols-journal-2xl 3xl:grid-rows-journal-2xl
      ">
        {children}

        {/* Footer */}
        <motion.div className='col-start-2 col-end-3 row-start-3 row-end-4'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}>
          <div className='w-full flex items-center p-1 gap-2 justify-end'>
            <motion.a className='text-paper-dark w-fit h-fit' initial={{ opacity: .5 }} whileHover={{ scale: 1.1, opacity: 1 }}
              target="_blank" href="https://github.com/hylu-dev/bujots">
              <FontAwesomeIcon icon={faGithub} />
            </motion.a>
            <motion.a className='text-paper-dark w-fit h-fit flex justify-center text-xs' initial={{ opacity: .5 }} whileHover={{ scale: 1.1, opacity: 1 }}
              target="_blank" href="https://hylu.dev">
              <small><FontAwesomeIcon icon={faHeart} /> Hylu</small>
            </motion.a>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
