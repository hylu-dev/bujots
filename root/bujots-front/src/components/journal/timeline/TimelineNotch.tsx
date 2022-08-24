import { useContext } from 'react'
import PageContext, { IPage } from '../../../contexts/PageContext'
import { NavigateFunction, useNavigate } from "react-router-dom";
import { motion } from 'framer-motion'

type Props = {
    currPage: IPage,
    selected?: Boolean
};

export default function TimelineNotch({ currPage, selected }: Props) {
    const navigate: NavigateFunction = useNavigate();
    const { page, setPage } = useContext(PageContext);

    const setCurrentPage = (p: IPage) => {
        setPage(p);
        navigate(`/journal/${p._id}`)
    }

    return <>
        <motion.li className={`
            flex
            text-xs
            items-center
            basis-0
            grow-[1]
            select-none
            transition-all
            ease-out-cubic
            origin-left
            hover:underline
        `}
            style={{
                scale: selected ? 1.2 : 1,
                fontWeight: selected ? 'bold' : 'normal',
            }}
            onClick={() => setCurrentPage(currPage)}
            whileHover={{
                scaleX: 1.1,
                scaleY: 1.1,
            }}>
            {/* note notches are 10px with width+border so 5px is the center point */}
            <div className='
                rounded-full
                w-2
                h-2
                bg-white
                border-paper-dark
                border-2
                mr-1
                -ml-[5px]
                after:content-none after:absolute after:bg-white'
            ></div>
            <span className={`text-paper-dark opacity-${selected ? 100 : 75}`}>
                {(new Date(currPage.date)).toDateString()}
            </span>
        </motion.li>
    </>

}
