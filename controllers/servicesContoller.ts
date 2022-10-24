import { Request, Response } from "express"
import { where } from "sequelize"
import createAnswer from "../common/createAnswer"
import { services } from "../models"

interface IRequestGetAll extends Request{
    query:{
        page: string,
        limit: string
    }
}

interface IRequestGetOne extends Request{
    query:{
        id: string
    }
}

interface IRequestUpdateOne extends IRequestGetOne{
    body:{
        img?: string,
        name: string,
        description?: string    
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
        console.log(req.query)
        const page = Number(req.query.page) || 1
        const limit = Number(req.query.limit) || 15
        const offset = (page-1)*limit
        const data = await services.findAndCountAll({limit, offset})

        return createAnswer(res, 200, false, 'list services', data)
    }

    public createOne=async(req: IRequestCreateOne, res: Response)=>{
        const createdElement = await services.create(req.body)

        return createAnswer(res, 200, false, 'Create new service', createdElement)
    }

    public getOne=async(req: IRequestGetOne, res: Response)=>{
        const id = Number(req.query.id)
        
        const result = await services.findOne({where:{id}})

        return createAnswer(res, 200, false, `Returd data of element with id: ${id}`, result!)
    }

    public updateOne=async(req: IRequestUpdateOne, res: Response)=>{
        const id = Number(req.query.id)

        try{
            const element = await services.findOne({where:{id}})
            await element?.update(req.body)
            return createAnswer(res, 200, false, `Data elemet with id: ${id} is updated`)
        }catch(error){

        }
        return createAnswer(res, 204, true, 'Update error')        
    }
}

export default new ServicesController