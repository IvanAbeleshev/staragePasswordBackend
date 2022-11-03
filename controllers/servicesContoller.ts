import { Request, Response } from "express"
import { Sequelize, where } from "sequelize"
import createAnswer from "../common/createAnswer"
import { services } from "../models"

interface IRequestGetAll extends Request{
    query:{
        page: string,
        limit: string,
        searchString?: string
    }
}

interface IRequestGetOne extends Request{
    query:{
        id: string,
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
        const page = Number(req.query.page) || 1
        const limit = Number(req.query.limit) || 15
        const offset = (page-1)*limit
        let data
        if(req.query.searchString){
            data = await services.findAndCountAll({where:{name: Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('name')), 'LIKE', '%' + req.query.searchString + '%')}, limit, offset, order:[['id', 'ASC']]})
        }else{
            data = await services.findAndCountAll({limit, offset, order:[['id', 'ASC']]})            
        }
        

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
            await services.update(req.body, {where:{id}})
            return createAnswer(res, 200, false, `Data elemet with id: ${id} is updated`)
        }catch(error){

        }
        return createAnswer(res, 204, true, 'Update error')        
    }
}

export default new ServicesController