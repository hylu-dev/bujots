import React, { ReactElement, ReactNode } from "react";

type Props = {
    children: ReactNode | ReactElement;
};

const JournalCover = ({ children }: Props) => {

    return <>
        {/* A4 Aspect Ratio 1:1.4142 */}
        <div className='h-screen w-screen grid place-content-center'>
            <div className='flex h-[500px] w-[354px] bg-cover-light rounded shadow-md'>
                <div className='bg-cover-dark basis-0 grow-[1]'></div>
                <div className='basis-0 grow-[5] p-5'>
                    {children}
                </div>
            </div>
        </div>
    </>
}

export default JournalCover
