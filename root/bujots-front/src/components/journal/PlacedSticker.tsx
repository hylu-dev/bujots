import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getImageFiles } from '../../slices/journalSlice'
import { ISticker } from '../../types'

type Props = {
    sticker: ISticker
}

const PlacedSticker = React.forwardRef<HTMLImageElement, Props>(({ sticker }, ref) => {
    const imageFiles = useSelector(getImageFiles);
    let stickerFile = imageFiles[sticker.image_id];

    return (
        <img ref={ref} src={stickerFile} className={`absolute drop-shadow-sticker max-h-[200px] max-w-[200px] z-10`}
            style={{
                left: sticker.position[0],
                top: sticker.position[1]
            }}
        />
    )
})

export default PlacedSticker
