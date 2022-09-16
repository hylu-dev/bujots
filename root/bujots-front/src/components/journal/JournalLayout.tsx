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
    <motion.div className='h-screen w-screen grid p-5'
      onMouseMove={(e) => dispatch(setMousePos([e.clientX, e.clientY]))}
      onTouchStart={(e) => dispatch(setMousePos([e.touches[0].clientX, e.touches[0].clientY]))}
      onTouchMove={(e) => dispatch(setMousePos([e.touches[0].clientX, e.touches[0].clientY]))}
    >
      <div className="grid m-auto
      grid-cols-journal-xl grid-rows-journal-xl
      sm:grid-cols-journal sm:grid-rows-journal
      md:grid-cols-journal md:grid-rows-journal
      lg:grid-cols-journal lg:grid-rows-journal
      xl:grid-cols-journal-xl xl:grid-rows-journal-xl
      3xl:grid-cols-journal-2xl 3xl:grid-rows-journal-2xl
      ">
        {children}

        {/* Footer */}
        <motion.div className='col-start-2 col-end-3 row-start-3 row-end-4 p-1'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}>
          <div className='w-full flex items-center p-1 gap-2 justify-end'>
            <motion.a className='text-paper-dark w-fit h-fit' initial={{ opacity: .5 }} whileHover={{ scale: 1.1, opacity: 1 }}
              target="_blank" href="https://github.com/hylu-dev/bujots">
              {/* https://iconmonstr.com/github-1-svg/ */}
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
            </motion.a>
            <motion.a className='text-paper-dark w-fit h-fit flex justify-center text-xs' initial={{ opacity: .5 }} whileHover={{ scale: 1.1, opacity: 1 }}
              target="_blank" href="https://hylu.dev">
              <small className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3">
                  <path d="M9.653 16.915l-.005-.003-.019-.01a20.759 20.759 0 01-1.162-.682 22.045 22.045 0 01-2.582-1.9C4.045 12.733 2 10.352 2 7.5a4.5 4.5 0 018-2.828A4.5 4.5 0 0118 7.5c0 2.852-2.044 5.233-3.885 6.82a22.049 22.049 0 01-3.744 2.582l-.019.01-.005.003h-.002a.739.739 0 01-.69.001l-.002-.001z" />
                </svg>
                Hylu</small>
            </motion.a>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
