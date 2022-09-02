import { post } from "../../../utils"
import { motion } from 'framer-motion';
import TimelineNotch from './TimelineNotch';

import { useSelector, useDispatch } from 'react-redux';
import { addPage, getPages } from '../../../slices/journalSlice'
import { emptyPage, IPage } from '../../../types';
import { useState } from "react";

export default function Timeline() {
  const token = window.localStorage.getItem("access_token") || "";
  const pages = useSelector(getPages);
  const dispatch = useDispatch();
  //console.log(pages.map(page => page.date));

  const newPage = () => {
    post(`${process.env.REACT_APP_API_URL}/pages/add`, emptyPage, token).then(response => {
      if (response.status === 200) {
        response.json().then((data: IPage) => {
          dispatch(addPage(data));
        })
      }
    });
  }

  const pageToDateString = (p: IPage) => {
    const date = new Date(p.date);
    console.log(date.toDateString())
    return date.toDateString();
  }

  return (
    <motion.div className='flex h-full items-center justify-center p-5'>
      <div className='h-full border-l-2 border-paper-dark'>
        <ol className='flex flex-col h-full whitespace-nowrap'>
          {
            pages.slice(0).map((p: IPage, index: number, arr: IPage[]) => {
              return <TimelineNotch
                pageIndex={index}
                key={p._id || index}
                sameDate={
                  (pageToDateString(arr[index]) === pageToDateString(arr[index+1] || "") ? true : false)
                }
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
            onClick={newPage}
            whileHover={{ scaleX: 1.1, scaleY: 1.1 }}
            whileTap={{ scaleX: 1, scaleY: 1 }}>
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
