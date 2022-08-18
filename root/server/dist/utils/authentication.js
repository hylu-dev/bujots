"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jwt = require('jsonwebtoken');
function verifyToken(req, res, next) {
    const header = req.headers['authorization'];
    const token = header && header.split(' ')[1];
    if (!token)
        return res.status(401).json(`Error: Failed to authenticate`);
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err)
            return res.status(403).json(`Error: Invalid token`);
        req.user = Object.assign({}, user);
        next();
    });
}
exports.verifyToken = verifyToken;
