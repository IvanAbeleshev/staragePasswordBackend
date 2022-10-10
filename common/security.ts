import jwt from 'jsonwebtoken'
import { typeRole } from '../interfaces/enumRole'
import bcrypt from 'bcrypt'

export const createToken=(login:string, role:typeRole)=>{
    return jwt.sign({login, role}, process.env.SECRET_KEY, {expiresIn: 1800})
}

export const hashPassword=(password: string)=>{
    return bcrypt.hashSync(password, 10)
}

export const compatePasswords=(passwordFromDB:string, passwordFromRequest:string)=>{
    return bcrypt.compareSync(passwordFromRequest, passwordFromDB)
}