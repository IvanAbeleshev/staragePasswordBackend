import { Request, Response } from "express"
import createAnswer from "../common/createAnswer"
import { services } from "../models"

interface IRequestGetAll extends Request{
    params:{
        page: string,
        limit: string
    }
}

interface IRequestCreateOne extends Request{
    body:{
        img?: string,
        name: string,
        description?: string
    }
}

class ServicesController{

    public getAll=async(req: IRequestGetAll, res: Response)=>{
        const page = Number(req.params.page) || 1
        const limit = Number(req.params.limit) || 15
        const offset = (page-1)*limit
        const data = await services.findAndCountAll({limit, offset})

        return createAnswer(res, 200, false, 'list services', data)
    }

    public createOne=async(req: IRequestCreateOne, res: Response)=>{
        const createdElement = await services.create(req.body)

        return createAnswer(res, 200, false, 'Create new service', createdElement)
    }
}

export default new ServicesController