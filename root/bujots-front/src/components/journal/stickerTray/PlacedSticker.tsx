import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteSingleSticker, deleteSticker, getImageFiles, setSticker } from '../../../slices/journalSlice'
import { setMousePos } from '../../../slices/userSlice'
import { ISticker } from '../../../types'

type Props = {
    sticker: ISticker
    index: number
}

const PlacedSticker = React.forwardRef<HTMLImageElement, Props>(({ sticker, index }, ref) => {
    const imageFiles = useSelector(getImageFiles);
    const stickerFile = imageFiles[sticker.image_id];
    const dispatch = useDispatch();

    const selectSticker = (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
        dispatch(setMousePos([
            e.clientX,
            e.clientY
        ]))
        dispatch(setSticker(sticker.image_id));
        if (index !== undefined) dispatch(deleteSingleSticker(index));
    }

    const selectStickerTouch = (e: React.TouchEvent<HTMLImageElement>) => {
        dispatch(setMousePos([
            e.touches[0].clientX,
            e.touches[0].clientY
        ]))
        dispatch(setSticker(sticker.image_id));
        if (index !== undefined) dispatch(deleteSingleSticker(index));
    }

    return (
        <img ref={ref} src={stickerFile}
            onClick={e => selectSticker(e)}
            onTouchStart={e => selectStickerTouch(e)}
            className={`absolute drop-shadow-sticker max-h-[150px] max-w-[150px] z-10 touch-none`}
            style={{
                left: sticker.position[0],
                top: sticker.position[1]
            }}
        />
    )
})

export default PlacedSticker
