const router = require('express').Router();
import { Request, Response } from 'express';

import { Error, Types } from 'mongoose';

const Page = require('../models/page.model');
import { IPage } from '../models/page.model';

import { verifyToken } from '../utils/authentication'

router.get('/', verifyToken, async (req: Request, res: Response) => {
    const id = req.user ? req.user._id : null;
    await Page.find({ author: id }).sort({ "date": -1 }).exec()
        .then((users: any) => res.json(users))
        .catch((err: any) => res.status(400).json({ Error: err }));
}).get('/all', async (req: Request, res: Response) => {
    Page.find()
        .then((users: any) => res.json(users))
        .catch((err: any) => res.status(400).json({ Error: err }));
}).post('/add', verifyToken, async (req: Request, res: Response) => {
    const page: IPage = req.body;
    const author = req.user ? req.user._id : null;
    const date = page.date || Date.now()

    const newUser = new Page({
        title: page.title,
        date: date,
        body: page.body,
        author: author
    })

    newUser.save()
        .then(((result: IPage) => res.json(result)))
        .catch((err: Error) => res.status(400).json({ error: err }))
}).patch('/update/:postID', verifyToken, async (req: Request, res: Response) => {
    const userID = req.user ? req.user._id : null;
    const page = req.body;
    const target = req.params.postID;
    if (!Types.ObjectId.isValid(target)) return res.status(400).json({ error: 'Invalid ID format' });

    if (!(await Page.findById(target))) {
        return res.status(400).json({ error: 'Page does not exist' })
    }
    await Page.findByIdAndUpdate(target, page, { new: true }).then(
        (page: IPage) => {
            if (!page) return res.status(404).json({ error: 'Page does not exist' });
            return page.author == userID ? res.json(page) : res.status(401).json({ error: 'User not authorized' })
        }
    ).catch((err: Error) => res.status(400).json({ error: 'err' }))
}).get('/:postID', verifyToken, async (req: Request, res: Response) => {
    const target = req.params.postID;
    if (!Types.ObjectId.isValid(target)) return res.status(400).json({ error: 'Invalid ID format' });

    Page.findById(target)
        .then((page: IPage) => {
            if (!page) return res.status(404).json({ error: 'Page does not exist' });
            const id = req.user ? req.user._id : null;
            return page.author == id ? res.json(page) : res.status(401).json({ error: 'User not authorized' })
        })
        .catch((err: Error) => res.status(400).json({ error: err }))
}).delete('/:postID', verifyToken, async (req: Request, res: Response) => {
    const target = req.params.postID;
    if (!Types.ObjectId.isValid(target)) return res.status(400).json({ error: 'Invalid ID format' })

    Page.findByIdAndDelete(target)
        .then((page: IPage) => {
            if (!page) return res.status(404).json({ error: 'Page does not exist' });
            const id = req.user ? req.user._id : null;
            return page.author == id ? res.json(`Page ${target} deleted`) : res.status(401).json({ error: 'User not authorized' })
        })
        .catch((err: Error) => res.status(400).json({ error: err }))
})

module.exports = router;