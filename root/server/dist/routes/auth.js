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
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user.model');
router.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const credentials = req.body;
    const dbUser = yield User.findOne({ username: credentials.username }).lean();
    if (!dbUser)
        return res.status(400).json(`Error: Invalid Username or Password`);
    if (!(yield bcrypt.compare(credentials.password, dbUser.password))) {
        return res.status(400).json(`Error: Invalid Username or Password`);
    }
    jwt.sign(dbUser, process.env.ACCESS_TOKEN_SECRET, { expiresIn: 86400 }, (err, token) => {
        return (err) ? res.status(400).json(`Error: ${err}`) : res.json({ accessToken: token });
    });
}));
module.exports = router;
