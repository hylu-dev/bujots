import { ReactElement, ReactNode } from "react";
import { motion } from 'framer-motion'
import JournalLayout from "./journal/JournalLayout";
import Button from "./common/Button";
import { NavigateFunction, useNavigate } from "react-router-dom";

type Props = {
    children: ReactNode | ReactElement;
};

const JournalBack = ({ children }: Props) => {
    const navigate: NavigateFunction = useNavigate();

    return <>
        <JournalLayout>
            <motion.div className="col-start-2 col-end-3 row-start-2 row-end-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { ease: [0.075, 0.82, 0.165, 1], duration: 1 } }}
                exit={{ opacity: 0, rotate: -5, translateX: 40, translateY: 40 }}
                transition={{ ease: "easeInOut", duration: .5 }}
            >
                {/* A4 Aspect Ratio 1:1.4142 */}
                <div className='bg-cover-pattern flex h-full w-full rounded shadow-md'
                    style={{
                        backgroundColor: '#c29c75'
                    }}
                >
                    <div className='basis-0 grow-[5] p-5'>
                        <div className='relative h-full flex flex-col justify-end items-end'>
                            <div className="rounded shadow bg-cover-label p-5 flex basis-0 max-h-fit max-w-fit flex-col items-center justify-end">
                                {children}
                            </div>
                            <Button
                                styles={"absolute -left-0 -bottom-0 bg-cover-dark text-cover-light rounded p-1"}
                                handler={() => navigate('/')}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.2} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 15l6-6m0 0l-6-6m6 6H9a6 6 0 000 12h3" />
                                </svg>
                            </Button>
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
