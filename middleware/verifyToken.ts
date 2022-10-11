import { NextFunction, Request, Response } from 'express'
import createAnswer from '../common/createAnswer'
import jwt from 'jsonwebtoken'
import { IUser } from '../interfaces/user'

export const verifyToken = (req: Request , res: Response, next: NextFunction) =>{
    const token = req.body.token || req.query.token || req.headers['x-access-token'] || req.headers['authorization']!.split(' ')[1]

    if (!token) {
        return createAnswer(res, 403, true, 'A token is required for authentication')
    }

    try {
        req.user = jwt.verify(token, process.env.SECRET_KEY) as IUser
    } catch (err) {
        return createAnswer(res, 401, true, 'Invalid Token')
    }
    
    return next()
}