import { useState, useEffect, ChangeEvent, useRef } from "react";
import { IJot, ISticker } from "../../types";
import Jot from './Jot';
import { motion } from 'framer-motion';
import { patch } from '../../utils';

import { useSelector, useDispatch } from 'react-redux';
import { getCurrentPage, setPage, addJot, setTitle, getSticker, addSticker, setSticker } from '../../slices/journalSlice'
import PlacedSticker from "./PlacedSticker";
import { getMousePos, setMousePos } from "../../slices/userSlice";
import Spinner from "../common/Spinner";

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

    //sticker
    const boundRef = useRef<HTMLDivElement>(null);
    const stickerRef = useRef<HTMLImageElement>(null)
    const selectedSticker = useSelector(getSticker);
    const mousePos = useSelector(getMousePos);

    useEffect(() => {
        triggerSave();
    }, [page])

    const updatePage = async () => {
        return patch(`${process.env.REACT_APP_API_URL}/pages/update/${page._id}`, page, token);
    }

    const triggerSave = async () => {
        clearTimeout(timer);
        setSaveStatus(SaveState.UNSAVED);
        dispatch(setPage(page));
        setTimer(setTimeout(() => {
            setSaveStatus(SaveState.SAVING);
            updatePage().then(() => {
                setSaveStatus(SaveState.SAVED);
            })
        }, 2000));
    }

    const quickSave = async () => {
        clearTimeout(timer);
        setSaveStatus(SaveState.SAVING);
        dispatch(setPage(page));
        updatePage().then(() => {
            setSaveStatus(SaveState.SAVED);
        })
    }

    const calculateStickerMousePos = () => {
        let stickerPos: [number, number] = [0, 0];
        const stickerCenter = [
            (stickerRef.current?.getBoundingClientRect().width || 0) / 2,
            (stickerRef.current?.getBoundingClientRect().height || 0) / 2
        ]
        if (boundRef.current instanceof Element) {
            stickerPos = [
                mousePos[0] - boundRef.current.getBoundingClientRect().left - stickerCenter[0],
                mousePos[1] - boundRef.current.getBoundingClientRect().top - stickerCenter[1]
            ]
        }
        return stickerPos
    }

    const isMouseWithinBounds = () => {
        if (boundRef.current instanceof Element) {
            const bound = boundRef.current.getBoundingClientRect();
            return (
                mousePos[0] > bound.left && mousePos[0] < bound.right &&
                mousePos[1] > bound.top && mousePos[1] < bound.bottom
            )
        }
        return false;
    }

    const placeSticker = () => {
        if (selectedSticker) {
            if (isMouseWithinBounds()) {
                dispatch(addSticker({
                    image_id: selectedSticker,
                    position: calculateStickerMousePos()
                }))
            } else dispatch(setSticker(''));
        }
    }

    return <>
        {/* A4 Aspect Ratio 1:1.4142 */}
        <div className='relative flex h-full w-full flex-col bg-paper-light rounded shadow-md p-5'
            style={{
                overflow: selectedSticker ? 'visible' : 'hidden'
            }}
            onClick={placeSticker}
            onTouchEnd={placeSticker}
            ref={boundRef}
        >
            {
                selectedSticker && <div className="z-50">
                    <PlacedSticker ref={stickerRef}
                        sticker={{
                            image_id: selectedSticker,
                            position: calculateStickerMousePos()
                        }}></PlacedSticker>
                </div>
            }

            {
                page.stickers.map((sticker: ISticker, index: number) => {
                    return <PlacedSticker key={sticker._id || index} index={index} sticker={sticker}></PlacedSticker>
                })
            }

            <div className="flex justify-between basis-0 grow-[1] border-b-2 border-paper-dark px-1" key={page._id}>
                <input className="w-[15ch] focus:bg-white bg-paper-light outline-none" type="text" defaultValue={page.title}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => dispatch(setTitle(e.target.value))} onBlur={triggerSave} />
                <small className="flex items-end">{date.toDateString()}</small>
            </div>
            <div className="p-2 basis-0 grow-[20]">
                <ol className='flex flex-col h-full whitespace-nowrap gap-2'>
                    {
                        page.jots.map((j: IJot, index: number) => {
                            return <Jot key={j._id || index} index={index} text={j.text} saveHandler={triggerSave}></Jot>
                        })
                    }
                    {
                        page.jots.length < 10 && <motion.li onClick={() => dispatch(addJot())} className="select-none grid self-center place-content-center box-border border-t-2 border-b-2 border-paper-dark opacity-50 h-8 w-5/6 my-2"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 1 }}>
                            <span>+</span>
                        </motion.li>
                    }

                </ol>
            </div>

            <button className="grid place-content-center hover:underline text-paper-dark" onClick={quickSave}>
                {
                    saveStatus !== SaveState.SAVED ?
                        <div className="flex items-center"><Spinner size={3}></Spinner><small className="ml-2">Saving...</small></div>
                        : <small>{saveStatus}</small>
                }
            </button>
        </div>
    </>
}
