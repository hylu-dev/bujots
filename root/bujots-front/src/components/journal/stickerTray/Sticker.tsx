import { useEffect, useState } from 'react'
import { del, getPNG } from '../../../utils';
import { Buffer } from "buffer";
import { motion } from "framer-motion";
import Spinner from '../../common/Spinner';
import { useDispatch } from 'react-redux';
import { addImageFile, removeImage, setSticker } from '../../../slices/journalSlice';

type Props = {
    imageID: string
    index: number
};

export default function Sticker({ imageID, index }: Props) {
    const [image, setImage] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const token = window.localStorage.getItem("access_token") || "";
    const dispatch = useDispatch();

    useEffect(() => {
        getPNG(`${process.env.REACT_APP_API_URL}/images/${imageID}`, token).then(response => {
            response.json().then(async data => {
                const img = await Buffer.from(data).toString("base64");

                const imgSource = `data:image/png;base64,${img}`
                setImage(imgSource);
                dispatch(addImageFile({
                    _id: imageID,
                    source: imgSource
                }))

                setIsLoading(false);

            })
        })
    }, [])

    const deleteImage = () => {
        setIsLoading(true);
        del(`${process.env.REACT_APP_API_URL}/images/${imageID}`, token).then(response => {
            if (response.status === 200) {
                response.json().then(() => {
                    dispatch(removeImage(index));
                })
            } else {
                setIsLoading(false);
            }
        })
    }   

    return (
        <div className='relative grid place-content-center'>
            <motion.div className={`cursor-grab active:cursor-grabbing ${(index) % 2 ? 'snap-end' : ''}`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 2, zIndex: 10 }}
                onClick={() => dispatch(setSticker(imageID))}
            >
                {
                    isLoading ? <Spinner></Spinner> : <img className='max-h-[100px] drop-shadow-sticker' src={image} />
                }

            </motion.div>
            <motion.div className='grid place-content-center select-none text-white text-[.5rem] rounded-full h-3 w-3 bg-paper-dark
                absolute -top-1.5 -right-1.5'
                onClick={deleteImage}
                whileHover={{ scale: 1.3 }}
                whileTap={{ scale: 1 }}>
                &#10005;
            </motion.div>
        </div>

    )
}
