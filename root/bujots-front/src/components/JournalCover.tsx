import { ReactElement, ReactNode } from "react";
import { motion } from 'framer-motion'
import JournalLayout from "./journal/JournalLayout";

type Props = {
    children: ReactNode | ReactElement;
};

const JournalCover = ({ children }: Props) => {

    return <>

        <JournalLayout>
            <motion.div className="col-start-2 col-end-3 row-start-2 row-end-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { ease: [0.075, 0.82, 0.165, 1] } }}
                exit={{ opacity: 0, rotate: 40, translateX: -200, translateY: 300 }}
                transition={{ ease: "easeOut", duration: .5 }}
            >
                {/* A4 Aspect Ratio 1:1.4142 */}
                <div className='flex h-full w-full bg-cover-light rounded shadow-md'>
                    <div className='bg-cover-dark basis-0 grow-[1]'></div>
                    <div className='basis-0 grow-[5] p-5'>
                        <div className='h-full flex flex-col'>
                            <div className="grid place-content-center basis-0 grow-[1]">
                                <h1 className='font-bold text-4xl opacity-75'>Bujots</h1>
                            </div>
                            <div className="flex basis-0 grow-[2] flex-col items-center">
                                {children}
                            </div>
                        </div>

                    </div>
                </div>
            </motion.div>
        </JournalLayout>
    </>
}

export default JournalCover
