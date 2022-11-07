import { Request, Response } from "express"
import { WhereOptions } from "sequelize"
import createAnswer from "../common/createAnswer"
import { passwordStorage } from "../models"

interface IRequestGetAll extends Request{
    query:{
        limit?: string,
        page?: string,
        serviceId?: string,
        employeeId?: string
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

        const result = await passwordStorage.findAndCountAll({where: selectionParams, offset, limit})
        return createAnswer(res, 200, false, 'passwords data', result)
    }
}

export default new PasswordsController()