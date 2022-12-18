import { Request, Response } from 'express'
import fileUpload, { UploadedFile } from 'express-fileupload'
import createAnswer from '../common/createAnswer'
import { employees } from '../models'
import path from 'path'
import fs from 'fs'
import { Sequelize } from 'sequelize'
import {Op} from 'sequelize'
import { moveFile } from '../common/additionalFS'

interface IRequestGetOne extends Request{
    query:{
        id: string,
    }
}

interface IRequestGetAll extends Request{
    query:{
        page?: string,
        limit?: string,
        searchString?: string
    }
}

interface IRequestCreateOne extends Request{
    body:{
        name: string,
        jobTitle?: string,
        employmentDate?: Date,
        dismissDate?: Date,
        img?: string,
        comment?:string
    }
}

interface IRequestChangeOne extends IRequestGetOne{
    body:{
        id?:number,
        name: string,
        jobTitle?: string,
        employmentDate?: Date,
        dismissDate?: Date,
        img?: string,
        comment?:string
    }
}

class EmployeesController{
    public getAll=async(req: IRequestGetAll, res: Response)=>{
        const numberPage = Number(req.query.page) || 1
        const limit = Number(req.query.limit) || 15
        const offset = (numberPage-1)*limit
        let result
        if(req.query.searchString){
            result = await employees.findAndCountAll({where: {[Op.or]:[
                {name: Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('name')), 'LIKE', '%' + req.query.searchString.toLocaleLowerCase() + '%')},
                {jobTitle: Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('jobTitle')), 'LIKE', '%' + req.query.searchString.toLowerCase() + '%')},
                {comment: Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('comment')), 'LIKE', '%' + req.query.searchString.toLowerCase() + '%')},
            ]}, limit, offset, order:[['id', 'ASC']]})    
        }else{
            result = await employees.findAndCountAll({limit, offset, order:[['id', 'ASC']]})    
        }
        
        return createAnswer(res, 200, false, 'List of employees', result)
    }

    public createOne=async(req:IRequestCreateOne, res: Response)=>{
        //need add block to check files and place its to special folder
        let img
        if(req.files){
            img = moveFile(req.files)
        }
        
        if(img)
        {
            await employees.create({...req.body, img})
        }else{
            await employees.create(req.body)
        }

        return createAnswer(res, 200, false, 'created new element')
    }

    public getOne=async(req:IRequestGetOne, res: Response)=>{
        const id = Number(req.query.id)
        const employeeItem = await employees.findOne({where:{id}})

        return createAnswer(res, 200, false, `get data item with id ${id}`, employeeItem!)
    }

    public changeOne=async(req: IRequestChangeOne, res: Response)=>{
        const id = Number(req.query.id)
        // delete req.body.id
        let img
        if(req.files){
            //remove file and
            const employee = await employees.findOne({where:{id}})
            const imgName = employee?.getDataValue('img')
            if(employee?.getDataValue('img')){
                fs.unlinkSync(path.resolve(__dirname, '..', 'static', imgName))
            }
            
            img = moveFile(req.files)
        }

        try{
            if(img){
                await employees.update({...req.body, img}, {where:{id}})
            }else{
                await employees.update(req.body, {where:{id}})
            }
            return createAnswer(res, 200, false, `Data elemet with id: ${id} is updated`)
        }catch(error){

        }
        return createAnswer(res, 204, true, 'Update error') 

    }

}

export default new EmployeesController()