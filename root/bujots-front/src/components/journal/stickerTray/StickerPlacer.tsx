import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addSticker, getCurrentPage, getImageFiles, getSticker, setSticker } from '../../../slices/journalSlice'
import { getMousePos } from '../../../slices/userSlice'
import { ISticker } from '../../../types'
import PlacedSticker from './PlacedSticker'

type Props = {
    boundRef: React.RefObject<HTMLDivElement>
}

const StickerPlacer = ({ boundRef }: Props) => {
    const selectedSticker = useSelector(getSticker);
    const mousePos = useSelector(getMousePos);
    const imageFiles = useSelector(getImageFiles);
    const stickerFile = imageFiles[selectedSticker];
    const page = useSelector(getCurrentPage);
    const dispatch = useDispatch();

    const stickerRef = useRef<HTMLImageElement>(null);
    const [stickerPos, setStickerPos] = useState<[number, number]>([0, 0])

    useEffect(() => {
        const stickerCenter = [
            (stickerRef.current?.getBoundingClientRect().width || 150) / 2,
            (stickerRef.current?.getBoundingClientRect().height || 150) / 2
        ]
        if (boundRef.current instanceof Element) {
            setStickerPos([
                mousePos[0] - boundRef.current.getBoundingClientRect().left - stickerCenter[0],
                mousePos[1] - boundRef.current.getBoundingClientRect().top - stickerCenter[1]
            ])
        }

    }, [mousePos])

    const isMouseWithinBounds = () => {
        if (boundRef.current instanceof Element) {
            const bound = boundRef.current.getBoundingClientRect();
            return (
                mousePos[0] > bound.left && mousePos[0] < bound.right &&
                mousePos[1] > bound.top && mousePos[1] < bound.bottom
            )
        }
        return false;
    }

    const placeSticker = () => {
        if (selectedSticker) {
            if (isMouseWithinBounds()) {
                dispatch(addSticker({
                    image_id: selectedSticker,
                    position: stickerPos
                }))
            } else dispatch(setSticker(''));
        }
    }

    return <>
        <img ref={stickerRef} src={stickerFile}
            className={`absolute drop-shadow-sticker max-h-[150px] max-w-[150px] z-50`}
            onClick={placeSticker}
            style={{
                left: stickerPos[0],
                top: stickerPos[1],
                display: selectedSticker ? 'initial' : 'none'
            }}
        />
        {
            page.stickers.map((sticker: ISticker, index: number) => {
                return <PlacedSticker key={sticker._id || index} index={index} sticker={sticker}></PlacedSticker>
            })
        }
    </>
}

export default StickerPlacer
