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
const authentication_1 = require("../utils/authentication");
router.get('/', authentication_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.user ? req.user._id : null;
    yield Page.find({ author: id }).sort({ "date": -1 }).exec()
        .then((users) => res.json(users))
        .catch((err) => res.status(400).json({ Error: err }));
})).get('/all', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    Page.find()
        .then((users) => res.json(users))
        .catch((err) => res.status(400).json({ Error: err }));
})).post('/add', authentication_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const page = req.body;
    const author = req.user ? req.user._id : null;
    const date = page.date || Date.now();
    const newUser = new Page({
        title: page.title,
        date: date,
        body: page.body,
        author: author
    });
    newUser.save()
        .then(((result) => res.json(result)))
        .catch((err) => res.status(400).json({ error: err }));
})).patch('/update/:postID', authentication_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userID = req.user ? req.user._id : null;
    const page = req.body;
    const target = req.params.postID;
    if (!mongoose_1.Types.ObjectId.isValid(target))
        return res.status(400).json({ error: 'Invalid ID format' });
    if (!(yield Page.findById(target))) {
        return res.status(400).json({ error: 'Page does not exist' });
    }
    yield Page.findByIdAndUpdate(target, page, { new: true }).then((page) => {
        if (!page)
            return res.status(404).json({ error: 'Page does not exist' });
        return page.author == userID ? res.json(page) : res.status(401).json({ error: 'User not authorized' });
    }).catch((err) => res.status(400).json({ error: 'err' }));
})).get('/:postID', authentication_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const target = req.params.postID;
    if (!mongoose_1.Types.ObjectId.isValid(target))
        return res.status(400).json({ error: 'Invalid ID format' });
    Page.findById(target)
        .then((page) => {
        if (!page)
            return res.status(404).json({ error: 'Page does not exist' });
        const id = req.user ? req.user._id : null;
        return page.author == id ? res.json(page) : res.status(401).json({ error: 'User not authorized' });
    })
        .catch((err) => res.status(400).json({ error: err }));
})).delete('/:postID', authentication_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const target = req.params.postID;
    if (!mongoose_1.Types.ObjectId.isValid(target))
        return res.status(400).json({ error: 'Invalid ID format' });
    Page.findByIdAndDelete(target)
        .then((page) => {
        if (!page)
            return res.status(404).json({ error: 'Page does not exist' });
        const id = req.user ? req.user._id : null;
        return page.author == id ? res.json(`Page ${target} deleted`) : res.status(401).json({ error: 'User not authorized' });
    })
        .catch((err) => res.status(400).json({ error: err }));
}));
module.exports = router;
