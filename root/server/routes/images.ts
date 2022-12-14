const router = require('express').Router();
import { Request, Response } from 'express';
import { Error, Types } from 'mongoose';
const Page = require('../models/page.model');
const Image = require('../models/image.model')
import { IPage } from '../models/page.model';
import { IImage } from '../models/image.model';
import { verifyToken } from '../utils/authentication';
const upload = require("../middleware/upload")
const fs = require('file-system');
const sharp = require('sharp');

router.get('/', verifyToken, async (req: Request, res: Response) => {
    await Image.find({ author: req.user?._id }).sort({ "createdAt": -1 }).select('_id name').exec()
        .then((images: any) => {
            res.json(images);
        })
        .catch((err: any) => res.status(400).json(err));
}).get('/all', async (req: Request, res: Response) => {
    Image.find()
        .then((images: IImage[]) => {
            const imgArray = images.map((image: IImage) => image._id);
            res.json(imgArray);
        })
        .catch((err: any) => res.status(400).json({ Error: err }))
}).get('/:imageID', verifyToken, async (req: Request, res: Response) => {
    const target = req.params.imageID;
    if (!Types.ObjectId.isValid(target)) return res.status(400).json({ error: 'Invalid ID format' });

    Image.findById(target)
        .then((image: IImage) => {
            if (!image) return res.status(404).json({ error: 'Image does not exist' });
            res.contentType('image/png');
            image.author == req.user?._id ? res.json(image.data) : res.status(401).json({ error: 'User not authorized' })
        })
        .catch((err: Error) => res.status(400).json({ error: err }))
}).post('/add', [verifyToken, upload.single('image')], async (req: Request, res: Response) => {
    const file = req.file as Express.Multer.File;
    const image = await sharp(file.buffer).resize({
        width: 300,
        height: 300,
        fit: sharp.fit.inside,
    }).trim().png()
    const buffer = await image.toBuffer();

    const newImage = new Image({
        name: `${Date.now()}_image_${file.originalname}`,
        data: buffer,
        author: req.user?._id
    })
    newImage.save()
        .then(((result: IImage) => res.json({ _id: result._id })))
        .catch((err: Error) => res.status(400).json(err))
}).delete('/:imageID', verifyToken, async (req: Request, res: Response) => {
    const target = req.params.imageID;
    if (!Types.ObjectId.isValid(target)) return res.status(400).json({ error: 'Invalid ID format' })

    Image.findByIdAndDelete(target)
        .then((image: IImage) => {
            if (!image) return res.status(404).json({ error: 'Image does not exist' });
            return image.author == req.user?._id ? res.json(`Image ${target} deleted`) : res.status(401).json({ error: 'User not authorized' })
        })
        .catch((err: Error) => res.status(400).json({ error: err }))
})

module.exports = router;