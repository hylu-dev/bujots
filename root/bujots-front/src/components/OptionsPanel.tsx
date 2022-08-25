import { useContext, useState, useEffect } from "react";
import PageContext, { IJot, IPage, emptyJot, emptyPage } from '../contexts/PageContext';
import { NavigateFunction, useNavigate } from "react-router-dom";
import AllPagesContext from '../contexts/AllPagesContext';
import { del } from '../utils';
import { motion } from 'framer-motion';


export default function OptionsPanel() {
  const { page, setPage } = useContext(PageContext);
  const { allPages, setAllPages } = useContext(AllPagesContext);
  const token = window.localStorage.getItem("access_token") || "";
  const navigate: NavigateFunction = useNavigate();

  const removePage = async () => {
    await del(`${process.env.REACT_APP_API_URL}/pages/${page._id}`,
      token)
      .then(response => {
        if (response.status === 200) {
          response.json().then(data => {
            // After page is removed, need to update page contexts
            const currPage = allPages.findIndex(p => page._id == p._id);
            allPages.splice(currPage, 1);
            setAllPages([...allPages]);
            console.log(currPage, allPages.length)
            if (allPages.length == 1) switchPage(allPages[0]); // iff on page 0 and there's 1 page left
            else if (currPage == 0) allPages.length > 1 ? switchPage(allPages[currPage]) : switchPage(emptyPage); // iff on page 0 and there's > 1 page left
            else allPages.length > 1 ? switchPage(allPages[currPage-1]) : switchPage(emptyPage); // iff not on page 0
          })
        }
      })
  }

  const switchPage = (p: IPage) => {
    setPage(p);
    navigate(`/journal/${p._id || ""}`)
}

  return (
    <motion.div className="flex h-full border-2 border-paper-dark p-2">
      <motion.button className="grid place-content-center bg-gray-300 p-5"
        whileHover={{ scale: 1.1 }}
        onClick={removePage}
      >
        TRASH
      </motion.button>

    </motion.div>
  )
}
