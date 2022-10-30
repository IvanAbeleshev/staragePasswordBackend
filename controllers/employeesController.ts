import { Request, Response } from 'express'
import { UploadedFile } from 'express-fileupload'
import createAnswer from '../common/createAnswer'
import { employees } from '../models'
import path from 'path'
import {v4} from 'uuid'

interface IRequestGetOne extends Request{
    query:{
        id: string,
    }
}

interface IRequestGetAll extends Request{
    query:{
        page?: string,
        limit?: string
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

class EmployeesController{
    public getAll=async(req: IRequestGetAll, res: Response)=>{
        const numberPage = Number(req.query.page) || 1
        const limit = Number(req.query.limit) || 15
        const offset = (numberPage-1)*limit
        
        const result = await employees.findAndCountAll({limit, offset})    
        return createAnswer(res, 200, false, 'List of employees', result)
    }

    public createOne=async(req:IRequestCreateOne, res: Response)=>{
        
        //need add block to check files and place its to special folder
        let img
        if(req.files){
            const arrayFilesName: string[] = []
            for(let item in req.files){
                
                const currentFile: UploadedFile = <UploadedFile>req.files[item];
                let fileName = v4()+'.jpeg'
                currentFile.mv(path.resolve(__dirname, '..', 'static', fileName))
                arrayFilesName.push(fileName)
                if(!img){
                    img = fileName
                }
            }
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

}

export default new EmployeesController()