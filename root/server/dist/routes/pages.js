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
        .catch((err) => res.status(400).json(`Error: ${err}`));
})).get('/all', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    Page.find()
        .then((users) => res.json(users))
        .catch((err) => res.status(400).json(`Error: ${err}`));
})).post('/add', authentication_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const page = req.body;
    const author = req.user ? req.user._id : null;
    const newUser = new Page({
        title: page.title,
        date: page.date,
        body: page.body,
        author: author
    });
    newUser.save()
        .then(((result) => res.json(result)))
        .catch((err) => res.status(400).json(`Error: ${err}`));
})).patch('/update/:id', authentication_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const page = req.body;
    const target = req.params.id;
    if (!mongoose_1.Types.ObjectId.isValid(target))
        return res.status(400).json(`Error: Invalid ID format`);
    if (!(yield Page.findById(target))) {
        return res.status(400).json(`Error: Page does not exist`);
    }
    yield Page.findOneAndUpdate({ id: target }, page, { new: true }).then((page) => {
        if (!page)
            return res.status(404).json(`Error: Page does not exist`);
        const id = req.user ? req.user._id : null;
        return page.author == id ? res.json(page) : res.status(401).json(`Error: User not authorized`);
    }).catch((err) => res.status(400).json(`Error: ${err}`));
})).get('/:id', authentication_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const target = req.params.id;
    if (!mongoose_1.Types.ObjectId.isValid(target))
        return res.status(400).json(`Error: Invalid ID format`);
    Page.findById(target)
        .then((page) => {
        if (!page)
            return res.status(404).json(`Error: Page does not exist`);
        const id = req.user ? req.user._id : null;
        return page.author == id ? res.json(page) : res.status(401).json(`Error: User not authorized`);
    })
        .catch((err) => res.status(400).json(`Error: ${err}`));
})).delete('/:id', authentication_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const target = req.params.id;
    if (!mongoose_1.Types.ObjectId.isValid(target))
        return res.status(400).json(`Error: Invalid ID format`);
    Page.findByIdAndDelete(target)
        .then((page) => {
        if (!page)
            return res.status(404).json(`Error: Page does not exist`);
        const id = req.user ? req.user._id : null;
        return page.author == id ? res.json(`Page ${target} deleted`) : res.status(401).json(`Error: User not authorized`);
    })
        .catch((err) => res.status(400).json(`Error: ${err}`));
}));
module.exports = router;
