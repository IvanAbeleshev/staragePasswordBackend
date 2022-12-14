import { Request, Response } from 'express'
import { where, WhereOptions } from 'sequelize'
import createAnswer from '../common/createAnswer'
import { employees, passwordStorage, services } from '../models'
import CryptoJS from 'crypto-js'
import {v4} from 'uuid'

interface IRequestGetAll extends Request{
    query:{
        limit?: string,
        page?: string,
        serviceId?: string,
        employeeId?: string
    }
}

interface IRequestPasswordItem extends Request{
    body:{
        serviceId: number,
        employeeId: number,
        password: string,
        login?: string,
        comment?: string
    }
}

interface IRequestGetOne extends Request{
    query:{
        id: string
    }
}

interface IRequestChangeItem extends IRequestPasswordItem{
    query:{
        id: string
    }   
}

class PasswordsController{
    public getAll=async(req: IRequestGetAll, res: Response)=>{
      
        const page = Number(req.query.page) || 1
        const limit = Number(req.query.limit) || 15
        const offset = (page-1)*limit

        const selectionParams:WhereOptions={}
        if(req.query.employeeId){
            selectionParams.employeeId = Number(req.query.employeeId)
        }
        if(req.query.serviceId){
            selectionParams.serviceId = Number(req.query.serviceId)
        }

        const result = await passwordStorage.findAndCountAll({where: selectionParams, offset, limit, include: [{model: employees}, {model: services}], order:[['id', 'ASC']]})
        return createAnswer(res, 200, false, 'passwords data', result)
    }

    public create=async(req: IRequestPasswordItem, res: Response)=>{
        const supplementKey = v4()
        const ciphertext = CryptoJS.AES.encrypt(req.body.password, process.env.CRYPTO_KEY+supplementKey).toString()
        const result = await passwordStorage.create({...req.body, supplementKey, password: ciphertext})

        return createAnswer(res, 200, false, 'created new password item', result)
    }

    public getOne=async(req: IRequestGetOne, res: Response)=>{
        const id = Number(req.query.id)
        const result = await passwordStorage.findOne({where:{id}, include: [{model: employees}, {model: services}]})

        return createAnswer(res, 200, false, 'data of password', result?.get())
    }

    public getCorectPassword=async(req: IRequestGetOne, res: Response)=>{
        const id = Number(req.query.id)
        const result = await passwordStorage.findOne({where:{id}})
        const bytes  = CryptoJS.AES.decrypt(result?.getDataValue('password'), process.env.CRYPTO_KEY+result?.getDataValue('supplementKey'))
        const password = bytes.toString(CryptoJS.enc.Utf8)

        return createAnswer(res, 200, false, 'data of password', password)
    }

    public changeItem=async(req: IRequestChangeItem, res: Response)=>{
        const id = Number(req.query.id)
        const supplementKey = v4()
        const ciphertext = CryptoJS.AES.encrypt(req.body.password, process.env.CRYPTO_KEY+supplementKey).toString()
        const result = await passwordStorage.update({...req.body, supplementKey, password: ciphertext}, {where: {id}})

        return createAnswer(res, 200, false, 'item is updated', result)
    }
}

export default new PasswordsController()