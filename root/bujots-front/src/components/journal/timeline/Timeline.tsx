import { useContext } from 'react';
import { post } from "../../../utils"
import PageContext, { IPage, emptyPage } from '../../../contexts/PageContext';
import { NavigateFunction, useNavigate } from "react-router-dom";
import AllPagesContext from '../../../contexts/AllPagesContext';
import { motion } from 'framer-motion';
import TimelineNotch from './TimelineNotch';

export default function Timeline() {
  const navigate: NavigateFunction = useNavigate();
  const token = window.localStorage.getItem("access_token") || "";
  const { page, setPage } = useContext(PageContext);
  const { allPages, setAllPages } = useContext(AllPagesContext);

  const addPage = () => {
    post(`${process.env.REACT_APP_API_URL}/pages/add`, emptyPage, token)
      .then(response => {
        if (response.status === 200) {
          response.json().then((data: IPage) => {
            setAllPages([data, ...allPages]);
            setPage(data);
            navigate(`/journal/${data._id || ""}`)
          })
        }
      })
  }

  return (
    <motion.div className='flex h-full items-center justify-center p-5'>
      <div className='h-full border-l-2 border-paper-dark'>
        <ol className='flex flex-col h-full whitespace-nowrap'>
          {
            allPages.slice(0).reverse().map((p) => {
              return <TimelineNotch
                currPage={p}
                key={p._id}
                selected={p._id === page._id}
              ></TimelineNotch>
            })
          }
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
            onClick={addPage}
            whileHover={{
              scaleX: 1.1,
              scaleY: 1.1,
            }}>
            <div className='
                rounded-full
                border-double
                w-4
                h-4
                bg-white
                border-paper-dark
                border-4
                mr-1
                -ml-[9px]
                after:content-none after:absolute after:bg-white'
            ></div>
            <span className='text-paper-dark'>New Page</span>
          </motion.li>
        </ol>

      </div>
    </motion.div>

  )
}
