import React, { useEffect, useState } from 'react'
import { getPNG } from '../../../utils';
import { Buffer } from "buffer";
import { motion } from "framer-motion";
import Spinner from '../../common/Spinner';

type Props = {
    imageID: string
};

export default function Sticker({ imageID }: Props) {
    const [image, setImage] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const token = window.localStorage.getItem("access_token") || "";

    useEffect(() => {
        getPNG(`${process.env.REACT_APP_API_URL}/images/${imageID}`, token).then(response => {
            response.json().then(async data => {
                const img = await Buffer.from(data).toString("base64");
                setImage(`data:image/png;base64,${img}`)
                setIsLoading(false);
            })
        })
    }, [])

    return (
        <motion.div className='grid place-content-center cursor-grab active:cursor-grabbing snap-end'
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 2, zIndex: 10 }}
        >
            {
                isLoading ? <Spinner></Spinner> : <img className='max-h-[100px] drop-shadow-sticker' src={image} />
            }
        </motion.div>
    )
}
