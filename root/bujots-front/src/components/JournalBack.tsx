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
                <div className='bg-cover-pattern flex h-full w-full rounded shadow-md'
                    style={{
                        backgroundColor: '#c29c75'
                    }}
                >
                    <div className='basis-0 grow-[5] p-5'>
                        <div className='h-full flex flex-col justify-end items-end'>
                            <div className="relative rounded shadow bg-cover-label p-5 flex basis-0 max-h-fit max-w-fit flex-col items-center justify-end">
                                {children}
                            </div>
                        </div>
                    </div>
                    <div className='bg-spine-pattern basis-0 grow-[1]'
                        style={{
                            backgroundColor: '#5c4d3b'
                        }}
                    ></div>
                </div>
            </motion.div>
        </JournalLayout>
    </>
}

export default JournalBack
