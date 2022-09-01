"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const router = require('express').Router();
const mongoose_1 = require("mongoose");
const Page = require('../models/page.model');
const Image = require('../models/image.model');
const authentication_1 = require("../utils/authentication");
const upload = require("../middleware/upload");
const fs = require('file-system');
const sharp = require('sharp');
router.get('/', authentication_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.user ? req.user._id : null;
    yield Image.find({ author: id }).sort({ "createdAt": -1 }).exec()
        .then((images) => {
        const imgArray = images.map((image) => image._id);
        res.json(imgArray);
    })
        .catch((err) => res.status(400).json(err));
})).get('/all', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    Image.find()
        .then((images) => {
        const imgArray = images.map((image) => image._id);
        res.json(imgArray);
    })
        .catch((err) => res.status(400).json({ Error: err }));
})).get('/:imageID', authentication_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const target = req.params.imageID;
    if (!mongoose_1.Types.ObjectId.isValid(target))
        return res.status(400).json({ error: 'Invalid ID format' });
    Image.findById(target)
        .then((image) => {
        if (!image)
            return res.status(404).json({ error: 'Image does not exist' });
        res.contentType('image/png');
        res.send(image.data);
        const id = req.user ? req.user._id : null;
        //return page.author == id ? res.json(page) : res.status(401).json({ error: 'User not authorized' })
    })
        .catch((err) => res.status(400).json({ error: err }));
})).post('/add', [authentication_1.verifyToken, upload.single('image')], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const file = req.file;
    const user_id = req.user ? req.user._id : null;
    const image = yield sharp(file.buffer).resize({
        width: 300,
        height: 300,
        fit: sharp.fit.inside,
    }).trim().png();
    const buffer = yield image.toBuffer();
    const newImage = new Image({
        name: `${Date.now()}_image_${file.originalname}`,
        data: buffer,
        author: user_id
    });
    newImage.save()
        .then(((result) => res.json(result._id)))
        .catch((err) => res.status(400).json(err));
}));
module.exports = router;
