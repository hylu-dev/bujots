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
router.post('/add/:postID', authentication_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userID = req.user ? req.user._id : null;
    const target = req.params.postID;
    const jot = req.body;
    if (!mongoose_1.Types.ObjectId.isValid(target))
        return res.status(400).json({ error: 'Invalid ID format' });
    Page.findById(target)
        .then((page) => {
        if (!page)
            return res.status(404).json({ error: 'Page does not exist' });
        if (page.author != userID)
            return res.status(401).json({ error: 'User not authorized' });
        page.jots.push(jot);
        page.save()
            .then(((result) => res.json(result)))
            .catch((err) => res.status(400).json({ error: err }));
    })
        .catch((err) => res.status(400).json({ error: err }));
})).delete('/remove/:postID/:jotID', authentication_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userID = req.user ? req.user._id : null;
    const target = req.params.postID;
    const jotID = req.params.jotID;
    if (!mongoose_1.Types.ObjectId.isValid(target))
        return res.status(400).json({ error: 'Invalid ID format' });
    Page.findById(target)
        .then((page) => {
        if (!page)
            return res.status(404).json({ error: 'Page does not exist' });
        if (page.author != userID)
            return res.status(401).json({ error: 'User not authorized' });
        const jotToRemove = page.jots.id(jotID);
        if (!jotToRemove)
            return res.status(404).json({ error: 'Jot does not exist' });
        jotToRemove.remove();
        page.save()
            .then(((result) => res.json(result)))
            .catch((err) => res.status(400).json({ error: err }));
    })
        .catch((err) => res.status(400).json({ error: err }));
})).patch('/update/:postID/:jotID', authentication_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userID = req.user ? req.user._id : null;
    const target = req.params.postID;
    const jotID = req.params.jotID;
    const jot = req.body;
    if (!mongoose_1.Types.ObjectId.isValid(target))
        return res.status(400).json({ error: 'Invalid ID format' });
    Page.findById(target)
        .then((page) => {
        if (!page)
            return res.status(404).json({ error: 'Page does not exist' });
        if (page.author != userID)
            return res.status(401).json({ error: 'User not authorized' });
        const jotToUpdate = page.jots.id(jotID);
        if (!jotToUpdate)
            return res.status(404).json({ error: 'Jot does not exist' });
        jotToUpdate.set(jot);
        page.save()
            .then(((result) => res.json(result)))
            .catch((err) => res.status(400).json({ error: err }));
    })
        .catch((err) => res.status(400).json({ error: err }));
})).patch('/updateAll/:postID', authentication_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userID = req.user ? req.user._id : null;
    const target = req.params.postID;
    const jotArray = req.body;
    if (!mongoose_1.Types.ObjectId.isValid(target))
        return res.status(400).json({ error: 'Invalid ID format' });
    if (!(yield Page.findById(target))) {
        return res.status(400).json({ error: 'Page does not exist' });
    }
    yield Page.findOneAndUpdate({ id: target }, { jots: jotArray }, { new: true }).then((page) => {
        if (!page)
            return res.status(404).json({ error: 'Page does not exist' });
        return page.author == userID ? res.json(page) : res.status(401).json({ error: 'User not authorized' });
    }).catch((err) => res.status(400).json({ error: 'err' }));
}));
module.exports = router;
