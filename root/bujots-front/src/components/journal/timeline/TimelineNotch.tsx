import { useContext } from 'react'
import PageContext, { IPage } from '../../../contexts/PageContext'
import { motion } from 'framer-motion'

type Props = {
    currPage: IPage,
    selected?: Boolean
};

export default function TimelineNotch({ currPage, selected }: Props) {
    const { page, setPage } = useContext(PageContext);

    const setCurrentPage = (page: IPage) => {
        setPage(page);
    }

    return <>
        <motion.li className={`
        flex text-xs items-center basis-0 grow-[1] select-none transition-all ease-out-cubic
        `}
            style={{
                scale: selected ? 1.2 : 1,
                fontWeight: selected ? 'bold' : 'normal',
                originX: 0
            }}
            onClick={() => setCurrentPage(currPage)}
            whileHover={{
                scaleX: 1.1,
                scaleY: 1.1,
            }}
        >
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
            after:content-none after:absolute after:w-2 after:h-2 after:bg-white'
            >
            </div>
            <span className={`
            text-paper-dark
            opacity-${selected ? 100 : 75}
            `}>
                {(new Date(currPage.date)).toDateString()}
            </span>
        </motion.li>
    </>

}
