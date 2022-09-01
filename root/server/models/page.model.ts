import mongoose, { Schema, Document, Types } from 'mongoose'
import { IImage, imageSchema } from './image.model'

export interface IJot extends Document {
    text: string
}

export interface ISticker extends Document {
    position: [number, number],
    image_id: string
}

export interface IPage extends Document {
    title: string,
    date: Date,
    author: Schema.Types.ObjectId,
    jots: Types.DocumentArray<IJot>,
    images: Types.DocumentArray<IImage>
    stickers: Types.DocumentArray<ISticker>
}

export const stickerSchema = new Schema<ISticker>({
    position: [Number, Number],
    image_id: String
})

export const jotSchema = new Schema<IJot>({
    text: {
        type: String,
        default: "",
        maxLength: 100
    }
}, { timestamps: true })

export const pageSchema = new Schema<IPage>({
    title: {
        type: String,
        default: "",
        maxLength: 20
    },
    date: {
        type: Date,
        default: Date.now()
    },
    author: {
        type: Schema.Types.ObjectId,
        required: [true, "Cannot be blank"]
    },
    jots: {
        type: [jotSchema],
        default: []   
    },
    images: {
        type: [imageSchema],
        default: []
    },
    stickers: {
        type: [stickerSchema],
        defaut: []
    }

}, { timestamps: true });

const Page = mongoose.model<IPage>('Page', pageSchema);

module.exports = Page;