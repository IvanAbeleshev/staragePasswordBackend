import { Request, Response } from 'express'
import { Sequelize } from 'sequelize'
import createAnswer from '../common/createAnswer'
import { compatePasswords, createAccessToken, createRefreshToken, hashPassword } from '../common/security'
import { typeRole } from '../interfaces/enumRole'
import { user } from '../models'


interface IRequestCreateUser extends Request{
    body:{
        login: string,
        password: string,
        role?: typeRole
    }
}

interface IRequestGetOne extends Request{
    query:{
        id?: string
    }
}
interface IRequestGetAll extends Request{
    query:{
        page?: string,
        limit?: string,
        searchString?: string
    }
}

interface IRequestChangeUser extends IRequestCreateUser{
    query:{
        id?: string
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

        const accessToken = createAccessToken(userItem.getDataValue('id'), recordingData.login, <typeRole>recordingData.role)
        const refreshToken = createRefreshToken(userItem.getDataValue('id'))

        return createAnswer(res, 200, false, 'new user created', {id: userItem.getDataValue('id'), login: userItem.getDataValue('login'), accessToken, refreshToken})    
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

            const accessToken = createAccessToken(candidat.getDataValue('id') ,candidat.getDataValue('login'), <typeRole>candidat.getDataValue('role'))
            const refreshToken = createRefreshToken(candidat.getDataValue('id'))

            return createAnswer(res, 200, false, 'welcome to password storage', {id: candidat.getDataValue('id'), login: candidat.getDataValue('login'), accessToken, refreshToken} )
        }

        return createAnswer(res, 401, true, 'incorrect password')
    }

    public checkUser=async(req: Request, res: Response)=>{
        if(!req.user){
            return createAnswer(res, 401, true, 'error')
        }
        const accessToken = createAccessToken(req.user.id, req.user.login, req.user.role)
        const refreshToken = createRefreshToken(req.user.id)

        return createAnswer(res, 200, false, 'user data', {id: req.user.id, login: req.user.login, accessToken, refreshToken})            
    }

    public getAll=async(req: IRequestGetAll, res: Response)=>{
        const page = Number(req.query.page) || 1
        const limit = Number(req.query.limit) || 15
        const offset = (page-1)*limit

        let result
        if(req.query.searchString){
            result = await user.findAndCountAll({where:{name: Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('name')), 'LIKE', '%' + req.query.searchString.toLowerCase() + '%')},attributes:['id', 'login', 'createdAt', 'updatedAt'] ,limit, offset, order:[['id', 'ASC']]})
        }else{
            result = await user.findAndCountAll({attributes:['id', 'login', 'createdAt', 'updatedAt'] ,limit, offset, order:[['id', 'ASC']]})
        }

        return createAnswer(res, 200, false, 'list of users', result)
    }

    public getOne=async(req: IRequestGetOne, res: Response)=>{
        const id = Number(req.query.id)
        const result = await user.findOne({attributes:['id', 'login', 'role'], where:{id}})

        return createAnswer(res, 200, false, 'user data', result?.get())
    }

    public changeUser = async(req: IRequestChangeUser, res: Response) =>{
        const id = Number(req.query.id)
        const hashedPassword = hashPassword(req.body.password)
        const recordingData = {login: req.body.login, password: hashedPassword, role: req.body.role? req.body.role : typeRole.user}
        const userItem = await user.update(recordingData, {where:{id}})

        return createAnswer(res, 200, false, 'new user created', userItem)    
    }
}

export default new UserController