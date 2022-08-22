import mongoose, { Schema, Document, Types } from 'mongoose'

export interface IJot extends Document {
    text: string
}

export interface IImage extends Document {
    name: string,
    position: [number, number],
    image: {
        data: Buffer,
        contentType: string
    }
}

export interface IPage extends Document {
    title: string,
    date: Date,
    body: string,
    author: Schema.Types.ObjectId,
    jots: Types.DocumentArray<IJot>,
    images: Types.DocumentArray<IImage>
}

export const jotSchema = new Schema<IJot>({
    text: {
        type: String,
        default: ""
    }
}, { timestamps: true })

export const imageSchema = new Schema<IImage>({
    name: {
        type: String,
        required: [true, "Cannot be blank"]
    },
    position: {
        type: [Number, Number],
        required: [true, "Cannot be blank"]
    },
    image: {
        type: {
            data: Buffer,
            contentType: String
        },
        required: [true, "Cannot be blank"]
    }
}, { timestamps: true })

export const pageSchema = new Schema<IPage>({
    title: {
        type: String,
        required: [true, "Cannot be blank"]
    },
    date: {
        type: Date,
        default: Date.now()
    },
    body: String,
    author: {
        type: Schema.Types.ObjectId,
        required: [true, "Cannot be blank"]
    },
    jots: [jotSchema],
    images: [imageSchema]

}, { timestamps: true });

const Page = mongoose.model<IPage>('Page', pageSchema);

module.exports = Page;