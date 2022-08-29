import { useState, useEffect, ChangeEvent } from "react";
import { IPage, IJot } from "../../types";
import Jot from './Jot';
import { motion } from 'framer-motion';
import { patch } from '../../utils';

import { useSelector, useDispatch } from 'react-redux';
import { getCurrentPage, setPage, addJot, setTitle } from '../../slices/journalSlice'

const SaveState = Object.freeze({
    UNSAVED: "Unsaved",
    SAVING: "Saving",
    SAVED: "Saved"
})

export default function JournalPage() {
    const token = window.localStorage.getItem("access_token") || "";
    const page = useSelector(getCurrentPage);
    const dispatch = useDispatch();

    const [saveStatus, setSaveStatus] = useState(SaveState.SAVED);
    const [timer, setTimer] = useState<NodeJS.Timeout | undefined>();

    const date = new Date(page.date);

    useEffect(() => {
        //triggerSave();
    }, [page])

    const updatePage = async (p: IPage) => {
        dispatch(setPage(p));
        return patch(`${process.env.REACT_APP_API_URL}/pages/update/${page._id}`, p, token);
    }

    const triggerSave = async () => {
        clearTimeout(timer);
        setSaveStatus(SaveState.UNSAVED);
        setTimer(setTimeout(() => {
            setSaveStatus(SaveState.SAVING);
            updatePage(page).then(() => {
                setSaveStatus(SaveState.SAVED);
            })
        }, 2000));
    }

    const quickSave = async () => {
        clearTimeout(timer);
        updatePage(page).then(() => {
            setSaveStatus(SaveState.SAVED);
        })
    }

    return <>
        {/* A4 Aspect Ratio 1:1.4142 */}
        <div className='flex h-full w-full flex-col bg-paper-light rounded shadow-md p-5'>
            <div className="flex justify-between basis-0 grow-[1] border-b-2 border-paper-dark px-1" key={page._id}>
                <input className="w-[15ch] focus:bg-white bg-paper-light outline-none" type="text" defaultValue={page.title} onChange={(e: ChangeEvent<HTMLInputElement>) => dispatch(setTitle(e.target.value))} />
                <small className="flex items-end">{date.toDateString()}</small>
            </div>
            <div className="p-2 basis-0 grow-[20]">
                <ol className='flex flex-col h-full whitespace-nowrap gap-2'>
                    {
                        page.jots.map((j: IJot, index: number) => {
                            return <Jot key={j._id || index} index={index} text={j.text}></Jot>
                        })
                    }
                    <motion.li onClick={() => dispatch(addJot())} className="select-none grid self-center place-content-center box-border border-t-2 border-b-2 border-paper-dark opacity-50 h-8 w-5/6 my-2"
                        whileHover={{
                            scale: 1.1
                        }}>
                        <span>+</span>
                    </motion.li>
                </ol>
            </div>
            <button className="hover:underline" onClick={quickSave}>{saveStatus}</button>
        </div>
    </>
}
