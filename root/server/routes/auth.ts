const router = require('express').Router();
const jwt = require('jsonwebtoken');
import { JsonWebTokenError } from 'jsonwebtoken';
const bcrypt = require('bcrypt');
import { Request, Response } from 'express';

const User = require('../models/user.model')
import { IUser } from '../models/user.model';

import { verifyToken } from '../utils/authentication'

router.post('/login', async (req: Request, res: Response) => {
    const credentials: IUser = req.body;

    const dbUser: IUser = await User.findOne({ username: credentials.username }).lean()
    if (!dbUser) return res.status(400).json({ error: 'Invalid Username or Password' })

    if (!(await bcrypt.compare(credentials.password, dbUser.password))) {
        return res.status(400).json({ error: 'Invalid Username or Password' })
    }

    jwt.sign(dbUser,
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: 86400 },
        (err: JsonWebTokenError, token: String) => {
            return (err) ? res.status(400).json({ error: err }) : res.json({ accessToken: token });
        })
}).get('/getCurrentUser', verifyToken, async (req: Request, res: Response) => {
    const id = req.user ? req.user : null;
    if (await User.findById(id)) {
        return res.json({ isLoggedIn: true, ...req.user });
    }
    return res.status(400).json({ error: 'User does not exist' })
})

module.exports = router;