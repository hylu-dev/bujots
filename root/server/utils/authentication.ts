const jwt = require('jsonwebtoken');
import { JsonWebTokenError } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { IUser } from '../models/user.model';

export function verifyToken(req: Request, res: Response, next: NextFunction): Response | void {
    const header = req.headers['authorization'];
    const token = header && header.split(' ')[1]
    if (!token) return res.status(401).json(`Error: Failed to authenticate`);
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err: JsonWebTokenError, user: IUser) => {
        if (err) return res.status(403).json(`Error: Invalid token`);
        req.user = {...user};
        next();
    })
}