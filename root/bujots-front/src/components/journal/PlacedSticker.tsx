import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { getImageFiles } from '../../slices/journalSlice'
import { ISticker } from '../../types'

type Props = {
    sticker: ISticker
}

export default function PlacedSticker({ sticker }: Props) {
    const imageFiles = useSelector(getImageFiles);
    let stickerFile = imageFiles[sticker.image_id];
    let position = [sticker.position[0] || 0, sticker.position[1] || 0];

    return (
        <img src={stickerFile} className={`absolute drop-shadow-sticker max-h-[200px] max-w-[200px] z-20`}
            style={{
                left: sticker.position[0],
                top: sticker.position[1]
            }}
        />
    )
}
