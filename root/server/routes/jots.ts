const router = require('express').Router();
import { Request, Response } from 'express';

import { Error, Types } from 'mongoose';

const Page = require('../models/page.model');
import { IJot, IPage } from '../models/page.model';

import { verifyToken } from '../utils/authentication'

router.post('/add/:postID', verifyToken, async (req: Request, res: Response) => {
    const userID = req.user ? req.user._id : null;
    const target = req.params.postID;
    const jot: IJot = req.body;
    if (!Types.ObjectId.isValid(target)) return res.status(400).json({ error: 'Invalid ID format' });

    Page.findById(target)
        .then((page: IPage) => {
            if (!page) return res.status(404).json({ error: 'Page does not exist' });
            if (page.author != userID) return res.status(401).json({ error: 'User not authorized' });
            page.jots.push(jot);
            page.save()
                .then(((result: IPage) => res.json(result)))
                .catch((err: Error) => res.status(400).json({ error: err }));
        })
        .catch((err: Error) => res.status(400).json({ error: err }))
}).delete('/remove/:postID/:jotID', verifyToken, async (req: Request, res: Response) => {
    const userID = req.user ? req.user._id : null;
    const target = req.params.postID;
    const jotID = req.params.jotID;
    if (!Types.ObjectId.isValid(target)) return res.status(400).json({ error: 'Invalid ID format' });

    Page.findById(target)
        .then((page: IPage) => {
            if (!page) return res.status(404).json({ error: 'Page does not exist' });
            if (page.author != userID) return res.status(401).json({ error: 'User not authorized' });
            const jotToRemove = page.jots.id(jotID);
            if (!jotToRemove) return res.status(404).json({ error: 'Jot does not exist' });
            jotToRemove.remove();
            page.save()
                .then(((result: IPage) => res.json(result)))
                .catch((err: Error) => res.status(400).json({ error: err }));
        })
        .catch((err: Error) => res.status(400).json({ error: err }))
}).patch('/update/:postID/:jotID', verifyToken, async (req: Request, res: Response) => {
    const userID = req.user ? req.user._id : null;
    const target = req.params.postID;
    const jotID = req.params.jotID;
    const jot = req.body;

    if (!Types.ObjectId.isValid(target)) return res.status(400).json({ error: 'Invalid ID format' });

    Page.findById(target)
        .then((page: IPage) => {
            if (!page) return res.status(404).json({ error: 'Page does not exist' });
            if (page.author != userID) return res.status(401).json({ error: 'User not authorized' });
            const jotToUpdate = page.jots.id(jotID);
            if (!jotToUpdate) return res.status(404).json({ error: 'Jot does not exist' });
            jotToUpdate.set(jot);
            page.save()
                .then(((result: IPage) => res.json(result)))
                .catch((err: Error) => res.status(400).json({ error: err }));
        })
        .catch((err: Error) => res.status(400).json({ error: err }))
}).patch('/updateAll/:postID', verifyToken, async (req: Request, res: Response) => {
    const userID = req.user ? req.user._id : null;
    const target = req.params.postID;
    const jotArray = req.body;

    if (!Types.ObjectId.isValid(target)) return res.status(400).json({ error: 'Invalid ID format' });

    if (!(await Page.findById(target))) {
        return res.status(400).json({ error: 'Page does not exist' })
    }
    await Page.findByIdAndUpdate(target, { jots: jotArray }, { new: true }).then(
        (page: IPage) => {
            if (!page) return res.status(404).json({ error: 'Page does not exist' });
            return page.author == userID ? res.json(page) : res.status(401).json({ error: 'User not authorized' })
        }
    ).catch((err: Error) => res.status(400).json({ error: 'err' }))
})

module.exports = router;