"use strict";
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;
app.use(express.json());
app.use(cors());
const uri = process.env.ATLAS_URI;
mongoose.connect(`${uri}`).then(() => { }).catch((err) => {
    console.log('MongoDB connection error. Please make sure MongoDB is running. \n' + err);
    process.exit();
});
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB connection established");
});
app.use('/api/users', require('./routes/users'));
app.use('/api/images', require('./routes/images'));
app.use('/api/pages', require('./routes/pages'));
app.use('/api/jots', require('./routes/jots'));
app.use('/api/auth', require('./routes/auth'));
app.listen(port, () => {
    console.log(`Server is running on port : ${port}`);
});
