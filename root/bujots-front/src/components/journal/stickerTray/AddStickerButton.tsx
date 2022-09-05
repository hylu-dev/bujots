import { motion } from "framer-motion";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addImage } from "../../../slices/journalSlice";
import { post_form } from "../../../utils";

export default function AddStickerButton() {
    const token = window.localStorage.getItem("access_token") || "";
    const inputRef = React.useRef<HTMLInputElement>(null);
    const dispatch = useDispatch();

    const clickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (inputRef) inputRef.current?.click();
    };

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const uploaded = e.target.files[0];
            uploadImage(uploaded);
        }
    }

    const uploadImage = async (file: File) => {
        const formData = new FormData();
        formData.append('image', file);
        const response = await post_form(`${process.env.REACT_APP_API_URL}/images/add`, formData, token)
        response.json().then(data => {
            dispatch(addImage(data));
        })
    }
    return (
        <motion.button className='grid h-5/6 w-5/6 place-content-center rounded border-2 border-paper-dark opacity-75'
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 1 }}
            onClick={e => clickHandler(e)}
        >
            <input className="invisible w-0 h-0" ref={inputRef} type="file"
                onChange={e => changeHandler(e)} />
            <span className="text-black opacity-100 select-none">+</span>
        </motion.button>
    )
}
