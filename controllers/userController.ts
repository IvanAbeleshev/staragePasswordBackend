import { Request, Response } from 'express'
import createAnswer from '../common/createAnswer'
import { createToken, hashPassword } from '../common/security'
import { typeRole } from '../interfaces/enumRole'
import { user } from '../models'


interface IRequestCreateUser extends Request{
    body:{
        login: string,
        password: string,
        role?: typeRole
    }
}

class UserController{

    public createUser = async(req: IRequestCreateUser, res: Response) =>{
        //create check to existing user with login
        //1. create used in db
        //2. create new token
        //3. pass data next view{id, login, token}
        const candidat = await user.findOne({where:{login: req.body.login}})
        if(candidat){
            return createAnswer(res, 409, true, `user with login: ${req.body.login} is exist`)
        }
        const hashedPassword = hashPassword(req.body.password)
        const recordingData = {login: req.body.login, password: hashedPassword, role: req.body.role? req.body.password : typeRole.user}
        const userItem = await user.create(recordingData)

        const token = createToken(recordingData.login, <typeRole>recordingData.role)

        return createAnswer(res, 200, false, 'new user created', {id: userItem.getDataValue('id'), login: userItem.getDataValue('login'), token})    
    }

    public checkAdminUserInDb = async(req: Request, res: Response)=>{
        const candidat = await user.findOne({where:{role: typeRole.admin}})
        if(candidat){
            return createAnswer(res, 200, false, 'in db is present user with admin role')
        }

        return createAnswer(res, 200, true, 'in db is absent user with admin role')
    }


}

export default new UserController