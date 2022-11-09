import { Request, Response } from "express"
import { WhereOptions } from "sequelize"
import createAnswer from "../common/createAnswer"
import { employees, passwordStorage, services } from "../models"

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
        const result = await passwordStorage.create(req.body)
        return createAnswer(res, 200, false, 'created new password item', result)
    }
}

export default new PasswordsController()