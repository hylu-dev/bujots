import { useContext, useState, useEffect, useRef } from "react";
import PageContext, { IPage, emptyJot } from '../../contexts/PageContext';
import AllPagesContext from '../../contexts/AllPagesContext';
import Jot from './Jot';
import { motion } from 'framer-motion';
import { patch } from '../../utils';

const SaveState = Object.freeze({
    UNSAVED: "Unsaved",
    SAVING: "Saving",
    SAVED: "Saved"
})

export default function JournalPage() {
    const firstUpdate = useRef(true);

    const token = window.localStorage.getItem("access_token") || "";
    const { page, setPage } = useContext(PageContext);
    const { allPages, setAllPages } = useContext(AllPagesContext);
    const [saveStatus, setSaveStatus] = useState(SaveState.SAVED);
    const [timer, setTimer] = useState<NodeJS.Timeout | undefined>();
    const [pageCopy, setPageCopy] = useState({...page});

    const date = new Date(page.date);

    useEffect(() => {
        if (firstUpdate.current) firstUpdate.current = false;
        else {
            console.log(firstUpdate);
            triggerSave();
        }
    }, [])

    const updatePage = async (p: IPage) => {
        setPage(p);
        return patch(`${process.env.REACT_APP_API_URL}/pages/update/${page._id}`,
            p,
            token)
            .then(response => {
                if (response.status === 200) {
                    response.json().then(data => {
                        const index = allPages.findIndex(p => data._id == p._id);
                        allPages.splice(index, 1, data);
                        setAllPages([...allPages]);
                    })
                }
            })

    }

    const triggerSave = async () => {
        clearTimeout(timer);
        setSaveStatus(SaveState.UNSAVED);
        setTimer(setTimeout(() => {
            setSaveStatus(SaveState.SAVING);
            updatePage(pageCopy).then(() => {
                setSaveStatus(SaveState.SAVED);
            })
        }, 2000));
    }

    const quickSave = async () => {
        clearTimeout(timer);
        updatePage(pageCopy).then(() => {
            setSaveStatus(SaveState.SAVED);
        })
    }

    const addJot = async () => {
        const p = { ...pageCopy }
        p.jots.push(emptyJot)
        setPageCopy(p);
    }

    const removeJot = async (index: number) => {
        const p = { ...pageCopy }
        p.jots.splice(index);
        setPageCopy(p);
    }

    const updateJot = async (text: string, index: number) => {
        const p = { ...pageCopy }
        p.jots[index].text = text;
        setPageCopy(p);
    }

    const updateTitle = async (text: string) => {
        const p = { ...pageCopy }
        p.title = text;
        setPageCopy(p);
    }

    return <>
        {/* A4 Aspect Ratio 1:1.4142 */}
        <div className='flex h-full w-full flex-col bg-paper-light rounded shadow-md p-5'>
            <div className="flex justify-between basis-0 grow-[1] border-b-2 border-paper-dark px-1">
                <input className="w-[15ch] focus:bg-white bg-paper-light outline-none" type="text" defaultValue={pageCopy.title} onChange={e => updateTitle(e.target.value)} />
                <small className="flex items-end">{date.toDateString()}</small>
            </div>
            <div className="p-2 basis-0 grow-[20]">
                <ol className='flex flex-col h-full whitespace-nowrap gap-2'>
                    {
                        pageCopy.jots.map((j, index) => {
                            return <Jot key={j._id || index} onDelete={() => removeJot(index)} text={j.text} onChange={e => updateJot(e.target.value, index)}></Jot>
                        })
                    }
                    <motion.li onClick={addJot} className="select-none grid self-center place-content-center box-border border-t-2 border-b-2 border-paper-dark opacity-50 h-8 w-5/6 my-2"
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
