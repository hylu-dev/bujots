const router = require('express').Router();
import { Request, Response } from 'express';

import { Error } from 'mongoose';

const User = require('../models/user.model');
import { IUser } from '../models/user.model';

router.get('/all', async (req: Request, res: Response) => {
    User.find()
        .then((users: IUser) => res.json(users))
        .catch((err: Error) => res.status(400).json(`Error: ${err}`))
}).post('/add', async (req: Request, res: Response) => {
    const user: IUser = req.body;

    //check if user exists
    if (await User.findOne({ username: user.username })) {
        return res.status(400).json(`Error: Username is already in use`)
    }

    const newUser = new User({
        username: user.username.toLowerCase(),
        password: user.password
    })

    newUser.save()
        .then(((result: IUser) => res.json(result)))
        .catch((err: Error) => res.status(400).json(`Error: ${err}`))
}).patch('/update/:username', async (req: Request, res: Response) => {
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
}).get('/:username', async (req: Request, res: Response) => {
    const target = req.params.username

    User.findOne({ username: target })
        .then((users: IUser) => {
            users ? res.json(users) : res.status(400).json(`Error: User does not exist`)
        })
        .catch((err: Error) => res.status(400).json(`Error: ${err}`))
}).delete('/:username', async (req: Request, res: Response) => {
    const target = req.params.username

    User.deleteOne({ username: target })
        .then((users: any) => {
            users.deletedCount ? res.json(`User ${target} deleted`) : res.status(400).json(`Error: User does not exist`)
        })
        .catch((err: Error) => res.status(400).json(`Error: ${err}`))
})

module.exports = router;