import { ReactElement, ReactNode } from "react";
import { motion } from 'framer-motion'
import JournalLayout from "./journal/JournalLayout";

type Props = {
    children: ReactNode | ReactElement;
};

const JournalBack = ({ children }: Props) => {

    return <>

        <JournalLayout>
            <motion.div className="col-start-2 col-end-3 row-start-2 row-end-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { ease: [0.075, 0.82, 0.165, 1], duration: 1 } }}
                exit={{ opacity: 0, rotate: -20, translateX: 100, translateY: 100 }}
                transition={{ ease: "easeInOut", duration: .5 }}
            >
                {/* A4 Aspect Ratio 1:1.4142 */}
                <div className='flex h-full w-full bg-cover-light rounded shadow-md'>
                    <div className='basis-0 grow-[5] p-5'>
                        <div className='h-full flex flex-col justify-end items-end'>
                            <div className="relative rounded bg-cover-label p-5 flex basis-0 max-h-fit max-w-fit flex-col items-center justify-end">
                                {children}
                            </div>
                        </div>
                    </div>
                    <div className='bg-cover-dark basis-0 grow-[1]'></div>
                </div>
            </motion.div>
        </JournalLayout>
    </>
}

export default JournalBack
