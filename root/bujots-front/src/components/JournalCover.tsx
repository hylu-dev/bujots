import { ReactElement, ReactNode } from "react";
import { motion } from 'framer-motion'
import JournalLayout from "./journal/JournalLayout";
import Button from "./common/Button";
import { NavigateFunction, useNavigate } from "react-router-dom";

type Props = {
    children: ReactNode | ReactElement;
};

const JournalCover = ({ children }: Props) => {
    const navigate: NavigateFunction = useNavigate();

    return <>

        <JournalLayout>
            <motion.div className="col-start-2 col-end-3 row-start-2 row-end-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { ease: [0.075, 0.82, 0.165, 1], duration: 1 } }}
                exit={{ opacity: 0, rotate: 20, translateX: -100, translateY: 100 }}
                transition={{ ease: "easeInOut", duration: .5 }}
            >
                {/* A4 Aspect Ratio 1:1.4142 */}
                <div className='bg-cover-pattern flex h-full w-full rounded shadow-md'
                    style={{
                        backgroundColor: '#c29c75'
                    }}
                >
                    <div className='bg-spine-pattern basis-0 grow-[1]'
                        style={{
                            backgroundColor: '#5c4d3b'
                        }}
                    ></div>

                    <div className='basis-0 grow-[5] p-5'>
                        <div className='h-full flex flex-col'>
                            <div className="grid place-content-center basis-0 grow-[1]">
                                <h1 className='font-bold text-4xl opacity-75'>Bujots</h1>
                            </div>
                            <div className="relative flex basis-0 grow-[2] flex-col items-center">
                                {children}
                                <Button
                                    styles={"absolute -right-0 -bottom-0 bg-cover-dark text-cover-light rounded p-1"}
                                    handler={() => navigate('/register')}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.2} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
                                    </svg>
                                </Button>
                            </div>
                        </div>

                    </div>
                </div>
            </motion.div>
        </JournalLayout>
    </>
}

export default JournalCover
