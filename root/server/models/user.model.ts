import mongoose, { Schema, Document} from 'mongoose'

export interface IUser extends Document {
    username: String,
    password: Date,
}

const userSchema = new Schema({
    username: {
        type: String,
        required: [true, "Cannot be blank"],
        lowercase: true,
        unique: true,
        trim: true,
        minLength: 3
    },
    password: {
        type: String,
        required: [true, "Cannot be blank"],
        minLength: 6
    }
  }, {timestamps: true});
  
  const User = mongoose.model<IUser>('User', userSchema);

  module.exports = User;