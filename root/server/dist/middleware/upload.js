"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//from https://www.bezkoder.com/node-js-upload-store-images-mongodb/
const util = require("util");
const multer_1 = __importDefault(require("multer"));
var storage = multer_1.default.memoryStorage();
const upload = (0, multer_1.default)({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith("image")) {
            cb(null, true);
        }
        else {
            cb(null, false);
        }
    }
});
module.exports = upload;
