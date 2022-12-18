import { NextFunction, Request, Response } from 'express'
import createAnswer from '../common/createAnswer'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { user } from '../models'

interface iJwtPaylodExtendId extends JwtPayload{
  id: number
}

export const verifyRefreshToken = async(req: Request , res: Response, next: NextFunction) =>{
  const token = req.body.refresh

  if (!token) {
    return createAnswer(res, 401, true, 'A token is required for authentication')
  }

  try {
    const {id} = jwt.verify(token, process.env.SECRET_KEY_REFRESH) as {id: number}
    const userData = await user.findOne({where:{id}})
    req.user = {id, login: userData?.getDataValue('login'), role: userData?.getDataValue('role')}
  } catch (err) {
    return createAnswer(res, 401, true, 'Invalid refresh token')
  }
  
  return next()
}