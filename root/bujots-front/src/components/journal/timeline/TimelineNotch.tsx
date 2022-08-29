import { motion } from 'framer-motion'
import { useSelector, useDispatch } from 'react-redux';
import { switchPage, getCurrentIndex, getCurrentPage } from '../../../slices/journalSlice'
import { RootState } from '../../../store';

type Props = {
    pageIndex: number,
};

export default function TimelineNotch({ pageIndex }: Props) {
    const currPage = useSelector(getCurrentIndex);
    const page = useSelector(getCurrentPage)
    const dispatch = useDispatch();

    const selected = () => {
        return pageIndex === currPage ? true : false;
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
                scale: selected() ? 1.2 : 1,
                fontWeight: selected() ? 'bold' : 'normal',
            }}
            onClick={() => dispatch(switchPage(pageIndex))}
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
            <span className={`text-paper-dark opacity-${selected() ? 100 : 75}`}>
                {(new Date(page.date)).toDateString()}
            </span>
        </motion.li>
    </>

}
