"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
const uri = process.env.ATLAS_URI;
mongoose_1.default.connect(`${uri}`).then(() => { }).catch((err) => {
    console.log('MongoDB connection error. Please make sure MongoDB is running. \n' + err);
    process.exit();
});
const connection = mongoose_1.default.connection;
connection.once('open', () => {
    console.log("MongoDB connection established");
});
app.use('/users', require('./routes/users'));
app.use('/pages', require('./routes/pages'));
app.listen(port, () => {
    console.log(`Server is running on port : ${port}`);
});
