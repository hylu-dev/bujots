import { del } from '../../utils';
import { motion } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import { getCurrentPage, getCurrentIndex, getPages, removePage } from '../../slices/journalSlice';


export default function OptionsPanel() {
  const page = useSelector(getCurrentPage);
  const pageIndex = useSelector(getCurrentIndex);
  const pages = useSelector(getPages);
  const dispatch = useDispatch();
  const token = window.localStorage.getItem("access_token") || "";

  const delPage = async () => {
    console.log(page._id, pageIndex, pages.length);
    await del(`${process.env.REACT_APP_API_URL}/pages/${page._id}`,
      token)
      .then(response => {
        if (response.status === 200) {
          dispatch(removePage());
        }
      })
  }

  return (
    <motion.div className="grid gap-2 grid-cols-options grid-flow-col p-2 h-full w-full text-paper-dark shadow">
      <motion.button className="grid place-content-center p-2"
        whileHover={{ scale: 1.1, boxShadow: "1px 1px 0 2px rgba(0, 0, 0, 0.2)" }}
        whileTap={{ scale: 1 }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-10 h-10">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
        </svg>

      </motion.button>
      <motion.button className="grid place-content-center p-2"
        whileHover={{ scale: 1.1, boxShadow: "1px 1px 0 2px rgba(0, 0, 0, 0.2)" }}
        onClick={delPage}
        whileTap={{ scale: 1 }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-10 h-10">
          <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
        </svg>
      </motion.button>
    </motion.div>
  )
}
