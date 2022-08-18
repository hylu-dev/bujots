const router = require('express').Router();
const bcrypt = require('bcrypt');
import { Request, Response } from 'express';

import { Error, Types } from 'mongoose';

const User = require('../models/user.model');
import { IUser } from '../models/user.model';

import { verifyToken } from '../utils/authentication'

router.get('/all', async (req: Request, res: Response) => {
    await User.find()
        .then((users: IUser) => res.json(users))
        .catch((err: Error) => res.status(400).json(`Error: ${err}`))
}).get('/getCurrentUser', verifyToken, async (req: Request, res: Response) => {
    const id = req.user ? req.user : null;
    if (await User.findById(id)) {
        return res.json({ isLoggedIn: true, ...req.user })
    }
    return res.status(400).json(`Error: User does not exist`)
}).post('/add', async (req: Request, res: Response) => {
    const user: IUser = req.body;

    //check if user exists
    if (await User.findOne({ username: user.username })) {
        return res.status(400).json(`Error: Username is already in use`)
    }

    const newUser: IUser = new User({
        username: user.username.toLowerCase(),
        password: (await bcrypt.hash(user.password, 10))
    })

    newUser.save()
        .then(((result: IUser) => res.json(result)))
        .catch((err: Error) => res.status(400).json(`Error: ${err}`))
}).patch('/update/:username', verifyToken, async (req: Request, res: Response) => {
    const user = req.body;
    const target = req.params.username

    if (!(await User.findOne({ username: target }))) {
        return res.status(400).json(`Error: User does not exist`)
    }
    await User.findOneAndUpdate({ username: target }, user, { new: true }).then(
        (result: IUser) => {
            console.log(result);
            return res.json(result);
        }
    ).catch((err: Error) => res.status(400).json(`Error: ${err}`))
}).get('/:id', async (req: Request, res: Response) => {
    const target = req.params.id
    if (!Types.ObjectId.isValid(target)) return res.status(400).json(`Error: Invalid ID format`)

    User.findById(target)
        .then((users: IUser) => {
            users ? res.json(users) : res.status(400).json(`Error: User does not exist`)
        })
        .catch((err: Error) => res.status(400).json(`Error: ${err}`))
}).get('/getByUsername/:username', async (req: Request, res: Response) => {
    const target = req.params.username

    User.findOne({ username: target })
        .then((users: IUser) => {
            users ? res.json(users) : res.status(400).json(`Error: User does not exist`)
        })
        .catch((err: Error) => res.status(400).json(`Error: ${err}`))
}).delete('/:id', verifyToken, async (req: Request, res: Response) => {
    const target = req.params.id
    if (!Types.ObjectId.isValid(target)) return res.status(400).json(`Error: Invalid ID format`)

    User.findByIdAndDelete(target)
        .then((users: any) => {
            users.deletedCount ? res.json(`User ${target} deleted`) : res.status(400).json(`Error: User does not exist`)
        })
        .catch((err: Error) => res.status(400).json(`Error: ${err}`))
})

module.exports = router;