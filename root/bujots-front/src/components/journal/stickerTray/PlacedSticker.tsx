import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteSingleSticker, deleteSticker, getImageFiles, setSticker } from '../../../slices/journalSlice'
import { setMousePos } from '../../../slices/userSlice'
import { ISticker } from '../../../types'
import Spinner from '../../common/Spinner'

type Props = {
    sticker: ISticker
    index: number
}

const PlacedSticker = React.forwardRef<HTMLImageElement, Props>(({ sticker, index }, ref) => {
    const imageFiles = useSelector(getImageFiles);
    const stickerFile = imageFiles[sticker.image_id];
    const dispatch = useDispatch();

    const selectSticker = (x: number, y: number) => {
        console.log('test')
        dispatch(setMousePos([x, y]))
        dispatch(setSticker(sticker.image_id));
        if (index !== undefined) dispatch(deleteSingleSticker(index));
    }

    const showSticker = () => {
        if (stickerFile) {
            return <img ref={ref} src={stickerFile}
                draggable='false'
                onMouseDown={e => selectSticker(e.clientX, e.clientY)}
                onTouchStart={e => selectSticker(e.touches[0].clientX, e.touches[0].clientX)}
                className={`absolute drop-shadow-sticker max-h-[150px] max-w-[150px] z-10 touch-none select-none`}
                style={{
                    left: sticker.position[0],
                    top: sticker.position[1]
                }}
            />

        }
        return <div className='absolute h-[100px] w-[100px] grid place-content-center bg-black opacity-20 sticker rounded select-none' style={{
            left: sticker.position[0],
            top: sticker.position[1]
        }}><Spinner></Spinner></div>
    }

    return <>
        {
            showSticker()
        }

    </>
})

export default PlacedSticker
