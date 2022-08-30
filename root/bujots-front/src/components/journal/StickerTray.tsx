import { motion } from 'framer-motion'

export default function StickerTray() {
  return (
    <div className='flex h-full w-full bg-gray-200 p-2 flex-col'>
      <motion.div className='flex grow-[1] bg-gray-300'>

      </motion.div>
      <motion.div className="grid gap-1 basis-0 grow-[5] bg-gray-50">
        <img 
        className='drop-shadow-sticker'
        src="https://s3.getstickerpack.com/storage/uploads/sticker-pack/menhera-chan-3-1/sticker_12.png?0fce8e4c13ea0763f40b8d577fd192f3&d=200x200" width="250"/>
        <img 
        className='drop-shadow-sticker'
        src="https://stickerly.pstatic.net/sticker_pack/pNrRYJ9UdquhNwz9jZkQ/VLRH5L/92/e4158468-b2cb-4c01-b1cd-ce7b3ecce631.png" width="250"/>
      </motion.div>
    </div>
  )
}
