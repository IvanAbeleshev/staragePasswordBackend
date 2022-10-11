import { Request, Response } from 'express'
import createAnswer from '../common/createAnswer'
import { compatePasswords, createToken, hashPassword } from '../common/security'
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
        const recordingData = {login: req.body.login, password: hashedPassword, role: req.body.role? req.body.role : typeRole.user}
        const userItem = await user.create(recordingData)

        const token = createToken(userItem.getDataValue('id'), recordingData.login, <typeRole>recordingData.role)

        return createAnswer(res, 200, false, 'new user created', {id: userItem.getDataValue('id'), login: userItem.getDataValue('login'), token})    
    }

    public checkAdminUserInDb = async(req: Request, res: Response)=>{
        const candidat = await user.findOne({where:{role: typeRole.admin}})
        if(candidat){
            return createAnswer(res, 200, false, 'in db is present user with admin role')
        }

        return createAnswer(res, 200, true, 'in db is absent user with admin role')
    }

    public singIn=async(req:IRequestCreateUser, res: Response)=>{
        const candidat = await user.findOne({where:{login: req.body.login}})
        if(!candidat){
            return createAnswer(res, 401, true, 'User is not finded')
        }

        if(compatePasswords(req.body.password, candidat.getDataValue('password'))){
            const token = createToken(candidat.getDataValue('id') ,candidat.getDataValue('login'), <typeRole>candidat.getDataValue('role'))
            return createAnswer(res, 200, false, 'welcome to password storage', {id: candidat.getDataValue('id'), login: candidat.getDataValue('login'), token} )
        }

        return createAnswer(res, 401, true, 'incorrect password')
    }

    public checkUser=async(req: Request, res: Response)=>{
        if(!req.user){
            return createAnswer(res, 401, true, 'error')
        }
        
        return createAnswer(res, 200, false, 'user data', {id: req.user.id, login: req.user.login, token: createToken(req.user.id, req.user.login, req.user.role)})            
    }
}

export default new UserController