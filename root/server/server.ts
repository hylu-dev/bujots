import mongoose from "mongoose";

const express = require('express');
const cors = require('cors');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(`${uri}`).then(
    () => { /** ready to use. The `mongoose.connect()` promise resolves to undefined. */ },
  ).catch((err: Error) => {
    console.log('MongoDB connection error. Please make sure MongoDB is running. \n' + err)
    process.exit();
  })

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB connection established")
})

app.use('/users', require('./routes/users'));
app.use('/pages', require('./routes/pages'));

app.listen(port, () => {
    console.log(`Server is running on port : ${port}`)
})