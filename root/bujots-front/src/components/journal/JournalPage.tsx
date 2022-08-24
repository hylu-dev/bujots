import { useContext, useState, useEffect } from "react";
import PageContext, { IJot, IPage, emptyJot, emptyPage } from '../../contexts/PageContext';
import AllPagesContext from '../../contexts/AllPagesContext';
import Jot from './Jot';
import { motion } from 'framer-motion';
import { post, del, patch } from '../../utils';


export default function JournalPage() {
    const { page, setPage } = useContext(PageContext);
    const { allPages, setAllPages } = useContext(AllPagesContext);
    const [jots, setJots] = useState<IJot[]>([]);
    const token = window.localStorage.getItem("access_token") || "";
    const date = new Date(page.date);

    useEffect(() => {
        setJots(page.jots);
    }, [page])

    const updatePage = (p: IPage) => {
        if (p) setPage({
            _id: p._id,
            title: p.title,
            date: p.date,
            body: p.body,
            author: p.author,
            jots: p.jots,
            images: p.images
        });
    }

    const updateJots = async () => {
        await patch(`${process.env.REACT_APP_API_URL}/jots/updateAll/${page._id}`,
            jots,
            token)
            .then(response => {
                if (response.status === 200) {
                    response.json().then(data => {
                        updatePage(data);
                    })
                }
            })
    }


    const updateTitle = async () => { }

    const updateJot = async (text: string, index: number) => {
        jots[index] = {text: text};
    }

    const addJot = async () => {
        setJots([...jots, emptyJot]);
    }

    const removeJot = async (index: number) => {
        jots.splice(index);
        setJots([...jots]);
    }

    const removePage = async () => {
        await del(`${process.env.REACT_APP_API_URL}/pages/${page._id}`,
          token)
          .then(response => {
            if (response.status === 200) {
              response.json().then(data => {
                allPages.length ? setPage(allPages[0]) : setPage(emptyPage);
              })
            }
          })
      }

    return <>
        {/* A4 Aspect Ratio 1:1.4142 */}
        <div className='flex h-full w-full flex-col bg-paper-light rounded shadow-md p-5'>
            <div className="flex justify-between basis-0 grow-[1] border-b-2 border-paper-dark px-1">
                <input className="w-[15ch] focus:bg-white bg-paper-light outline-none" type="text" defaultValue={page.title} />
                <small className="flex items-end">{date.toDateString()}</small>
            </div>
            <div className="p-2 basis-0 grow-[20]">
                <ol className='flex flex-col h-full whitespace-nowrap gap-2'>
                    {
                        jots.map((j, index) => {
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
            <button className="hover:underline" onClick={updateJots}>Test Save</button>

        </div>
    </>
}
