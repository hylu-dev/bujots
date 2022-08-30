const router = require('express').Router();
const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');
import { Request, Response } from 'express';
import { Error, Types } from 'mongoose';

const User = require('../models/user.model');
import { IUser } from '../models/user.model';

import { verifyToken } from '../utils/authentication'

router.get('/all', async (req: Request, res: Response) => {
    await User.find()
        .then((users: IUser) => res.json(users))
        .catch((err: Error) => res.status(400).json({ error: err }));
}).post('/add',
    [
        body('username', 'Username must be at least 3 characters long')
            .trim().isLength({ min: 3 }),
        body('username')
            .custom((value: string) => {
                return User.findOne({ username: value }).then((user: IUser) => {
                    if (user) return Promise.reject('Username already in use');
                })
            }),
        body('password', 'Password must be at least 6 characters long')
            .trim().isLength({ min: 6 })
    ]
    ,
    async (req: Request, res: Response) => {
        const user: IUser = req.body;

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const newUser: IUser = new User({
            username: user.username.toLowerCase(),
            password: (await bcrypt.hash(user.password, 10))
        })

        newUser.save()
            .then(((result: IUser) => res.json(result)))
            .catch((err: Error) => res.status(400).json({ error: err }))
    }).patch('/update/:username',
        [
            verifyToken,
            body('username', 'Username must be at least 3 characters long')
                .trim().isLength({ min: 3 }),
            body('username')
                .custom((value: string) => {
                    return User.findOne({ username: value }).then((user: IUser) => {
                        if (!user) return Promise.reject('User does not exist');
                    })
                }),
            body('password', 'Password must be at least 6 characters long')
                .trim().isLength({ min: 6 })
        ]
        ,
        async (req: Request, res: Response) => {
            const user = req.body;
            const target = req.params.username;

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            await User.findOneAndUpdate({ username: target }, user, { new: true }).then(
                (result: IUser) => {
                    console.log(result);
                    return res.json(result);
                }
            ).catch((err: Error) => res.status(400).json({ error: err }))
        }).get('/:id', async (req: Request, res: Response) => {
            const target = req.params.id
            if (!Types.ObjectId.isValid(target)) return res.status(400).json({ error: 'Invalid ID format' })

            User.findById(target)
                .then((users: IUser) => {
                    users ? res.json(users) : res.status(400).json({ error: 'User does not exist' })
                })
                .catch((err: Error) => res.status(400).json({ error: err }))
        }).get('/getByUsername/:username', async (req: Request, res: Response) => {
            const target = req.params.username

            User.findOne({ username: target })
                .then((users: IUser) => {
                    users ? res.json(users) : res.status(400).json({ error: 'User does not exist' })
                })
                .catch((err: Error) => res.status(400).json({ error: err }))
        }).delete('/:id', verifyToken, async (req: Request, res: Response) => {
            const target = req.params.id
            if (!Types.ObjectId.isValid(target)) return res.status(400).json({ error: 'Invalid ID format' })

            User.findByIdAndDelete(target)
                .then((users: any) => {
                    users.deletedCount ? res.json(`User ${target} deleted`) : res.status(400).json({ error: 'User does not exist' })
                })
                .catch((err: Error) => res.status(400).json({ error: err }))
        })

module.exports = router;