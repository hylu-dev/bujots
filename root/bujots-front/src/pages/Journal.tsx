import { useEffect, useContext } from 'react';
import { NavigateFunction, useNavigate } from "react-router-dom";
import { get } from "../utils"
import JournalPage from '../components/journal/JournalPage'
import JournalLayout from '../components/journal/JournalLayout';
import { motion } from 'framer-motion';
import PageContext from '../contexts/PageContext';
import Timeline from '../components/journal/timeline/Timeline';

export default function Journal() {
    const navigate: NavigateFunction = useNavigate();
    const token = window.localStorage.getItem("access_token") || "";
    const { page, setPage } = useContext(PageContext);

    useEffect(() => {
        get(`${process.env.REACT_APP_API_URL}/pages/`, token)
            .then(response => {
                if (response.status === 200) {
                    response.json().then(data => {
                        // need to check here if any pages exist, if not, show new page
                        const p = data[0];
                        setPage({
                            _id: p._id,
                            title: p.title,
                            date: p.date,
                            body: p.body,
                            author: p.author,
                            jots: p.jots,
                            images: p.images
                        })
                    })
                } else {
                    response.json().then(data => {
                        logout();
                    })
                }
            })

    }, [token])

    const logout = () => {
        window.localStorage.removeItem("access_token");
        navigate("/");
    }

    return <>
        <JournalLayout>
            {/* Editor */}
            <motion.div className='col-start-2 col-end-3 row-start-1 row-end-2 bg-gray-300'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { delay: 0 } }}
                exit={{ opacity: 0 }}
                transition={{ ease: "easeOut", duration: .5, delay: .2 }}
            >
            </motion.div>

            {/* Stickers */}
            <motion.div className='col-start-1 col-end-2 row-start-2 row-end-3 bg-gray-300'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { delay: 0 } }}
                exit={{ opacity: 0 }}
                transition={{ ease: "easeOut", duration: .5, delay: .2 }}
            >

            </motion.div>

            {/* Page */}
            <motion.div className='col-start-2 col-end-3 row-start-2 row-end-3'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { ease: [0.075, 0.82, 0.165, 1] } }}
                exit={{ opacity: 0, rotate: 40, translateX: -200, translateY: 300 }}
                transition={{ ease: "easeOut", duration: .5 }}
            >
                <JournalPage></JournalPage>
            </motion.div>

            {/* Timeline */}
            <motion.div className='col-start-3 col-end-4 row-start-2 row-end-3 justify-self-start'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { delay: 0 } }}
                exit={{ opacity: 0 }}
                transition={{ ease: "easeOut", duration: .5, delay: .2 }}
            >
                 <Timeline></Timeline>
            </motion.div>

            {/* Footer */}
            <motion.div className='col-start-2 col-end-3 row-start-3 row-end-4 bg-gray-300'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { delay: 0 } }}
                exit={{ opacity: 0 }}
                transition={{ ease: "easeOut", duration: .5, delay: .2 }}
            >
            </motion.div>
        </JournalLayout>
    </>

}
