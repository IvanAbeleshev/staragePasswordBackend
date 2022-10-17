import { Request, Response } from "express"
import createAnswer from "../common/createAnswer"
import { servises } from "../models"

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

class ServisesController{

    public getAll=async(req: IRequestGetAll, res: Response)=>{
        const page = Number(req.params.page) || 1
        const limit = Number(req.params.limit) || 15
        const offset = (page-1)*limit
        const data = await servises.findAndCountAll({limit, offset})

        return createAnswer(res, 200, false, 'list servises', data)
    }

    public createOne=async(req: IRequestCreateOne, res: Response)=>{
        const createdElement = await servises.create(req.body)

        return createAnswer(res, 200, false, 'Create new servise', createdElement)
    }
}

export default new ServisesController