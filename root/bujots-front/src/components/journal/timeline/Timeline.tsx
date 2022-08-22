import { useState, useEffect, useContext, MouseEvent } from 'react';
import { get } from "../../../utils"
import PageContext, { IPage } from '../../../contexts/PageContext';
import { motion } from 'framer-motion';
import TimelineNotch from './TimelineNotch';

export default function Timeline() {
  const token = window.localStorage.getItem("access_token") || "";
  const { page, setPage } = useContext(PageContext);
  const [pages, setPages] = useState<IPage[]>([]);

  useEffect(() => {
    get(`${process.env.REACT_APP_API_URL}/pages/`, token)
      .then(response => {
        if (response.status === 200) {
          response.json().then(data => {
            setPages(data);
          })
        }
      })

  }, [token, page])

  return (
    <div className='flex h-full items-center justify-center p-5'>
      <div className='h-full border-l-2 border-paper-dark'>
        <ol className='flex flex-col h-full whitespace-nowrap'>
          {
            pages.slice(0).reverse().map((p) => {
              return <TimelineNotch
                currPage={p}
                key={p._id}
                selected={p._id === page._id}
              ></TimelineNotch>
            })
          }
        </ol>

      </div>
    </div>

  )
}
