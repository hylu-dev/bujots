import mongoose, { Schema, Document} from 'mongoose'

export interface IPage extends Document {
    title: String,
    date: Date,
    body: String,
    owner: String
}

const pageSchema = new Schema({
    title: {
        type: String,
        required: [true, "Cannot be blank"]
    },
    date: Date,
    body: String
  }, {timestamps: true});
  
  const Page = mongoose.model<IPage>('Page', pageSchema);

  module.exports = Page;