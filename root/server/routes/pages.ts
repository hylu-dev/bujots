const router = require('express').Router();
import { Request, Response } from 'express';

import { Error, Types } from 'mongoose';

const Page = require('../models/page.model');
import { IPage } from '../models/page.model';

router.get('/all', async (req: Request, res: Response) => {
    Page.find()
        .then((users: any) => res.json(users))
        .catch((err: any) => res.status(400).json(`Error: ${err}`))
}).post('/add', async (req: Request, res: Response) => {
    const page:IPage = req.body;

    const newUser = new Page({
        title: page.title,
        date: page.date,
        body: page.body
    })

    newUser.save()
        .then(((result: IPage) => res.json(result)))
        .catch((err:Error) => res.status(400).json(`Error: ${err}`))
}).patch('/update/:id', async (req: Request, res: Response) => {
    const page = req.body;
    const target = req.params.id

    if (!(await Page.findById(target))) {
        return res.status(400).json(`Error: Page does not exist`)
    }
    await Page.findOneAndUpdate({ id: target }, page, { new: true }).then(
        (result: IPage) => {
            console.log(result);
            return res.json(result);
        }
    ).catch((err: Error) => res.status(400).json(`Error: ${err}`))
}).get('/:id', async (req: Request, res: Response) => {
    const target = req.params.id
    if (!Types.ObjectId.isValid(target)) return res.status(400).json(`Error: Invalid ID format`)

    Page.findById(target)
        .then((pages: IPage) => {
            return pages ? res.json(pages) : res.status(404).json(`Error: Page does not exist`)
        })
        .catch((err: Error) => res.status(400).json(`Error: ${err}`))
}).delete('/:id', async (req: Request, res: Response) => {
    const target = req.params.id
    if (!Types.ObjectId.isValid(target)) return res.status(400).json(`Error: Invalid ID format`)

    Page.findByIdAndDelete(target)
        .then((pages: IPage) => {
            return pages ? res.json(`Page ${target} deleted`) : res.status(404).json(`Error: Page does not exist`)
        })
        .catch((err: Error) => res.status(400).json(`Error: ${err}`))
})

module.exports = router;