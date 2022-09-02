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
    var _a;
    yield Image.find({ author: (_a = req.user) === null || _a === void 0 ? void 0 : _a._id }).sort({ "createdAt": -1 }).select('_id name').exec()
        .then((images) => {
        res.json(images);
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
        var _a;
        if (!image)
            return res.status(404).json({ error: 'Image does not exist' });
        res.contentType('image/png');
        image.author == ((_a = req.user) === null || _a === void 0 ? void 0 : _a._id) ? res.json(image.data) : res.status(401).json({ error: 'User not authorized' });
    })
        .catch((err) => res.status(400).json({ error: err }));
})).post('/add', [authentication_1.verifyToken, upload.single('image')], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const file = req.file;
    const image = yield sharp(file.buffer).resize({
        width: 300,
        height: 300,
        fit: sharp.fit.inside,
    }).trim().png();
    const buffer = yield image.toBuffer();
    const newImage = new Image({
        name: `${Date.now()}_image_${file.originalname}`,
        data: buffer,
        author: (_b = req.user) === null || _b === void 0 ? void 0 : _b._id
    });
    newImage.save()
        .then(((result) => res.json({ _id: result._id })))
        .catch((err) => res.status(400).json(err));
})).delete('/:imageID', authentication_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const target = req.params.imageID;
    if (!mongoose_1.Types.ObjectId.isValid(target))
        return res.status(400).json({ error: 'Invalid ID format' });
    Image.findByIdAndDelete(target)
        .then((image) => {
        var _a;
        if (!image)
            return res.status(404).json({ error: 'Image does not exist' });
        return image.author == ((_a = req.user) === null || _a === void 0 ? void 0 : _a._id) ? res.json(`Image ${target} deleted`) : res.status(401).json({ error: 'User not authorized' });
    })
        .catch((err) => res.status(400).json({ error: err }));
}));
module.exports = router;
