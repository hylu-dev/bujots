import { motion } from 'framer-motion'
import { useSelector, useDispatch } from 'react-redux';
import { switchPage, getCurrentIndex, getCurrentPage, getPages } from '../../../slices/journalSlice'
import { patch } from '../../../utils';

type Props = {
    pageIndex: number,
    sameDate?: boolean
};

export default function TimelineNotch({ pageIndex, sameDate }: Props) {
    const token = window.localStorage.getItem("access_token") || "";
    const currPage = useSelector(getCurrentIndex);
    const page = useSelector(getCurrentPage)
    const pages = useSelector(getPages);
    const dispatch = useDispatch();

    const selected = () => {
        return pageIndex === currPage ? true : false;
    }

    const updatePage = () => {
        patch(`${process.env.REACT_APP_API_URL}/pages/update/${page._id}`, page, token);
        dispatch(switchPage(pageIndex))
    }

    return <>
        <motion.li className={`
            flex
            text-xs
            items-center
            basis-0
            grow-[.3]
            select-none
            transition-all
            ease-out-cubic
            origin-left
            hover:underline
        `}
            style={{
                scale: selected() ? 1.2 : 1,
                fontWeight: selected() ? 'bold' : 'normal',
                marginBottom: sameDate ? 0 : 20,
            }}
            onClick={updatePage}
            whileHover={{ scaleX: 1.1, scaleY: 1.1, }}
            whileTap={{ scaleX: 1, scaleY: 1 }}>
            {/* note notches are 10px with width+border so 5px is the center point */}
            <div className={`
                rounded-full
                w-2
                h-2
                ${selected() ? 'bg-paper-dark' : 'bg-white'}
                border-paper-dark
                border-2
                mr-1
                -ml-[5px]
                after:content-none after:absolute after:bg-white`}
            ></div>
            <span className={`text-paper-dark opacity-${selected() ? 100 : 75}`}>
                {(new Date(pages[pageIndex].date)).toDateString()}
            </span>
        </motion.li>
    </>

}
