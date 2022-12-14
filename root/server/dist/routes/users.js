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
const { body, validationResult } = require('express-validator');
const mongoose_1 = require("mongoose");
const User = require('../models/user.model');
const authentication_1 = require("../utils/authentication");
router.get('/all', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield User.find()
        .then((users) => res.json(users))
        .catch((err) => res.status(400).json({ error: err }));
})).post('/add', [
    body('username', 'Username must be at least 3 characters long')
        .trim().isLength({ min: 3 }),
    body('username')
        .custom((value) => {
        return User.findOne({ username: value }).then((user) => {
            if (user)
                return Promise.reject('Username already in use');
        });
    }),
    body('password', 'Password must be at least 6 characters long')
        .trim().isLength({ min: 6 })
], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const newUser = new User({
        username: user.username.toLowerCase(),
        password: (yield bcrypt.hash(user.password, 10))
    });
    newUser.save()
        .then(((result) => res.json(result)))
        .catch((err) => res.status(400).json({ error: err }));
})).patch('/update/:username', [
    authentication_1.verifyToken,
    body('username', 'Username must be at least 3 characters long')
        .trim().isLength({ min: 3 }),
    body('username')
        .custom((value) => {
        return User.findOne({ username: value }).then((user) => {
            if (!user)
                return Promise.reject('User does not exist');
        });
    }),
    body('password', 'Password must be at least 6 characters long')
        .trim().isLength({ min: 6 })
], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.body;
    const target = req.params.username;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    yield User.findOneAndUpdate({ username: target }, user, { new: true }).then((result) => {
        return res.json(result);
    }).catch((err) => res.status(400).json({ error: err }));
})).get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const target = req.params.id;
    if (!mongoose_1.Types.ObjectId.isValid(target))
        return res.status(400).json({ error: 'Invalid ID format' });
    User.findById(target)
        .then((users) => {
        users ? res.json(users) : res.status(400).json({ error: 'User does not exist' });
    })
        .catch((err) => res.status(400).json({ error: err }));
})).get('/getByUsername/:username', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const target = req.params.username;
    User.findOne({ username: target })
        .then((users) => {
        users ? res.json(users) : res.status(400).json({ error: 'User does not exist' });
    })
        .catch((err) => res.status(400).json({ error: err }));
})).delete('/:id', authentication_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const target = req.params.id;
    if (!mongoose_1.Types.ObjectId.isValid(target))
        return res.status(400).json({ error: 'Invalid ID format' });
    User.findByIdAndDelete(target)
        .then((users) => {
        users.deletedCount ? res.json(`User ${target} deleted`) : res.status(400).json({ error: 'User does not exist' });
    })
        .catch((err) => res.status(400).json({ error: err }));
}));
module.exports = router;
