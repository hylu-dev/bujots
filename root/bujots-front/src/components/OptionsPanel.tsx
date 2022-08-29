import { del } from '../utils';
import { motion } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import { getCurrentPage, getCurrentIndex, getPages, removePage } from '../slices/journalSlice';


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
    <motion.div className="flex h-full border-2 border-paper-dark p-2">
      <motion.button className="grid place-content-center bg-gray-300 p-5"
        whileHover={{ scale: 1.1 }}
        onClick={delPage}
      >
        TRASH
      </motion.button>

    </motion.div>
  )
}
