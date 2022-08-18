import mongoose, { Schema, Document } from 'mongoose'

export interface IJot extends Document {
    text: String
}

export interface IImage extends Document {
    name: String,
    position: [Number, Number],
    image: {
        data: Buffer,
        contentType: String
    }
}

export interface IPage extends Document {
    title: String,
    date: Date,
    body: String,
    author: Schema.Types.ObjectId,
    jots: [IJot],
    images: [IImage]
}

const jotSchema = new Schema({
    text: String
}, { timestamps: true })

const imageSchema = new Schema({
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

const pageSchema = new Schema<IPage>({
    title: {
        type: String,
        required: [true, "Cannot be blank"]
    },
    date: Date,
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