import jwt from 'jsonwebtoken'
import { typeRole } from '../interfaces/enumRole'
import bcrypt from 'bcrypt'

export const createToken=(id:number, login:string, role:typeRole)=>{
    return jwt.sign({id, login, role}, process.env.SECRET_KEY, {expiresIn: 1800})
}

export const hashPassword=(password: string)=>{
    return bcrypt.hashSync(password, 10)
}

export const compatePasswords=(passwordFromRequest:string, passwordFromDB:string)=>{
    return bcrypt.compareSync(passwordFromRequest, passwordFromDB)
}