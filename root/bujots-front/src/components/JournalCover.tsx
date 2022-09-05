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
                            </div>
                        </div>

                    </div>
                </div>
            </motion.div>
        </JournalLayout>
    </>
}

export default JournalCover
