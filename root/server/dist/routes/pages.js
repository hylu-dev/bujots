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
router.get('/all', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    Page.find()
        .then((users) => res.json(users))
        .catch((err) => res.status(400).json(`Error: ${err}`));
})).post('/add', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const page = req.body;
    const newUser = new Page({
        title: page.title,
        date: page.date,
        body: page.body
    });
    newUser.save()
        .then(((result) => res.json(result)))
        .catch((err) => res.status(400).json(`Error: ${err}`));
})).patch('/update/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const page = req.body;
    const target = req.params.id;
    if (!(yield Page.findById(target))) {
        return res.status(400).json(`Error: Page does not exist`);
    }
    yield Page.findOneAndUpdate({ id: target }, page, { new: true }).then((result) => {
        console.log(result);
        return res.json(result);
    }).catch((err) => res.status(400).json(`Error: ${err}`));
})).get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const target = req.params.id;
    if (!mongoose_1.Types.ObjectId.isValid(target))
        return res.status(400).json(`Error: Invalid ID format`);
    Page.findById(target)
        .then((pages) => {
        return pages ? res.json(pages) : res.status(404).json(`Error: Page does not exist`);
    })
        .catch((err) => res.status(400).json(`Error: ${err}`));
})).delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const target = req.params.id;
    if (!mongoose_1.Types.ObjectId.isValid(target))
        return res.status(400).json(`Error: Invalid ID format`);
    Page.findByIdAndDelete(target)
        .then((pages) => {
        return pages ? res.json(`Page ${target} deleted`) : res.status(404).json(`Error: Page does not exist`);
    })
        .catch((err) => res.status(400).json(`Error: ${err}`));
}));
module.exports = router;
