import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { IImage } from '../../../types';
import { get, getPNG } from '../../../utils';
import AddStickerButton from './AddStickerButton';
import Sticker from './Sticker';
import { Buffer } from "buffer";

export default function StickerTray() {
  const [images, setImages] = useState<IImage[]>([]);
  const token = window.localStorage.getItem("access_token") || "";

  useEffect(() => {
    get(`${process.env.REACT_APP_API_URL}/images/`, token)
      .then(response => {
        if (response.status === 200) {
          response.json().then((data: IImage[]) => {
            setImages(data);
            // data.forEach(async (image) => {
            //   setImages([...images, await (retrieveImage(image))])
            // })
            // const processedImages = data.map(async (image) => {
            //   return (await retrieveImage(image));
            // })
            // Promise.all(processedImages).then((results) => {
            //   setImages(results);
            // })
          })
        }
      })
  }, [])

  const retrieveImage = async (imageID: string) => {
    const response = await getPNG(`${process.env.REACT_APP_API_URL}/images/${imageID}`, token)
    const data = (await response.json()).data;
    const img = await Buffer.from(data).toString("base64");
    return `data:image/png;base64,${img}`
  }

  return (
    <motion.div className="h-full w-full grid grid-cols-stickers grid-flow-row place-content-start gap-3 p-2 pb-0 bg-gray-50 overflow-y-scroll overflow-x-clip snap-y"
      style={{
        scrollbarWidth: 'thin',
        scrollbarColor: '#666 #DDD'
      }}>
      {
        images.map((image: IImage, index: number) => {
          return <Sticker imageID={image._id} key={`image${index}`}></Sticker>
        })
      }
      <AddStickerButton></AddStickerButton>
    </motion.div>
  )
}
