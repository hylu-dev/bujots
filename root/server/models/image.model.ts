import mongoose, { Schema, Document } from 'mongoose'

export interface IImage extends Document {
    name: string,
    data: Buffer,
    author: Schema.Types.ObjectId
}

export const imageSchema = new Schema<IImage>({
    name: {
        type: String,
        required: [true, "Cannot be blank"]
    },
    data: {
        type: Buffer,
        required: [true, "Cannot be blank"]
    },
    author: Schema.Types.ObjectId
}, { timestamps: true })

const Image = mongoose.model<IImage>('Image', imageSchema);

module.exports = Image;