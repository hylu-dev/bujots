import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { IImage } from '../../../types';
import { get, getPNG } from '../../../utils';
import AddStickerButton from './AddStickerButton';
import Sticker from './Sticker';
import { Buffer } from "buffer";
import { useDispatch, useSelector } from 'react-redux';
import { getImages, setImages } from '../../../slices/journalSlice';

export default function StickerTray() {
  const images = useSelector(getImages);
  const dispatch = useDispatch();
  const token = window.localStorage.getItem("access_token") || "";

  useEffect(() => {
    get(`${process.env.REACT_APP_API_URL}/images/`, token)
      .then(response => {
        if (response.status === 200) {
          response.json().then((data: IImage[]) => {
            dispatch(setImages(data));
          })
        }
      })
  }, [])

  return (
    <motion.div className="h-full w-full grid grid-cols-stickers grid-flow-row place-content-start gap-3 p-2 bg-gray-50 overflow-y-scroll overflow-x-clip"
      style={{
        scrollbarWidth: 'thin',
        scrollbarColor: '#666 #DDD'
      }}>
      <AddStickerButton></AddStickerButton>
      {
        images.map((image: IImage, index: number) => {
          return <Sticker imageID={image._id} key={image._id} index={index}></Sticker>
        })
      }

    </motion.div>
  )
}
