import { useEffect } from 'react';
import { NavigateFunction, useNavigate } from "react-router-dom";

import { get } from "../utils"
import { motion } from 'framer-motion';

import { IPage } from '../types';
import { useSelector, useDispatch, } from 'react-redux';
import { getPages, resetState, setPages } from '../slices/journalSlice'

import JournalPage from '../components/journal/JournalPage'
import JournalLayout from '../components/journal/JournalLayout';
import Timeline from '../components/journal/timeline/Timeline';
import OptionsPanel from '../components/journal/OptionsPanel'
import StickerTray from '../components/journal/stickerTray/StickerTray';

export default function Journal() {
    const navigate: NavigateFunction = useNavigate();
    const token = window.localStorage.getItem("access_token") || "";
    const pages = useSelector(getPages);
    const dispatch = useDispatch();

    useEffect(() => {
        get(`${process.env.REACT_APP_API_URL}/pages/`, token)
            .then(response => {
                ;
                if (response.status === 200) {
                    response.json().then((data: IPage[]) => {
                        dispatch(setPages(data));
                    })
                } else {
                    response.json().then(() => {
                        logout();
                    })
                }
            })

    }, [])

    const logout = () => {
        window.localStorage.removeItem("access_token");
        dispatch(resetState())
        navigate("/");
    }

    return <>
        <JournalLayout>
            {/* Editor */}
            <motion.div className='col-start-2 col-end-3 row-start-1 row-end-2'>
                <OptionsPanel></OptionsPanel>
            </motion.div>

            {/* Stickers */}
            <motion.div className='col-start-1 col-end-2 row-start-2 row-end-3'>
                <StickerTray></StickerTray>
            </motion.div>

            {/* Page */}
            {!pages.length ? null :
                <motion.div className='col-start-2 col-end-3 row-start-2 row-end-3'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, rotate: 40, translateX: -200, translateY: 300 }}
                    transition={{ ease: "easeOut", duration: .5 }}>
                    <JournalPage></JournalPage>
                </motion.div>
            }

            {/* Timeline */}
            <motion.div className='col-start-3 col-end-4 row-start-2 row-end-3 justify-self-start'>
                <Timeline></Timeline>
            </motion.div>

            {/* Footer */}
            <motion.div className='col-start-2 col-end-3 row-start-3 row-end-4'
            >
                <button className='text-sm p-1 mt-1 rounded text-paper-dark hover:underline' onClick={logout}>Close Journal</button>
            </motion.div>
        </JournalLayout>
    </>

}
