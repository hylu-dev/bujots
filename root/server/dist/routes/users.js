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
const bcrypt = require('bcrypt');
const mongoose_1 = require("mongoose");
const User = require('../models/user.model');
const authentication_1 = require("../utils/authentication");
router.get('/all', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield User.find()
        .then((users) => res.json(users))
        .catch((err) => res.status(400).json(`Error: ${err}`));
})).get('/getCurrentUser', authentication_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.user ? req.user : null;
    if (yield User.findById(id)) {
        return res.json(Object.assign({ isLoggedIn: true }, req.user));
    }
    return res.status(400).json(`Error: User does not exist`);
})).post('/add', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.body;
    //check if user exists
    if (yield User.findOne({ username: user.username })) {
        return res.status(400).json(`Error: Username is already in use`);
    }
    const newUser = new User({
        username: user.username.toLowerCase(),
        password: (yield bcrypt.hash(user.password, 10))
    });
    newUser.save()
        .then(((result) => res.json(result)))
        .catch((err) => res.status(400).json(`Error: ${err}`));
})).patch('/update/:username', authentication_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.body;
    const target = req.params.username;
    if (!(yield User.findOne({ username: target }))) {
        return res.status(400).json(`Error: User does not exist`);
    }
    yield User.findOneAndUpdate({ username: target }, user, { new: true }).then((result) => {
        console.log(result);
        return res.json(result);
    }).catch((err) => res.status(400).json(`Error: ${err}`));
})).get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const target = req.params.id;
    if (!mongoose_1.Types.ObjectId.isValid(target))
        return res.status(400).json(`Error: Invalid ID format`);
    User.findById(target)
        .then((users) => {
        users ? res.json(users) : res.status(400).json(`Error: User does not exist`);
    })
        .catch((err) => res.status(400).json(`Error: ${err}`));
})).get('/getByUsername/:username', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const target = req.params.username;
    User.findOne({ username: target })
        .then((users) => {
        users ? res.json(users) : res.status(400).json(`Error: User does not exist`);
    })
        .catch((err) => res.status(400).json(`Error: ${err}`));
})).delete('/:id', authentication_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const target = req.params.id;
    if (!mongoose_1.Types.ObjectId.isValid(target))
        return res.status(400).json(`Error: Invalid ID format`);
    User.findByIdAndDelete(target)
        .then((users) => {
        users.deletedCount ? res.json(`User ${target} deleted`) : res.status(400).json(`Error: User does not exist`);
    })
        .catch((err) => res.status(400).json(`Error: ${err}`));
}));
module.exports = router;
