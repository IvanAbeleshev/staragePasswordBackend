import { Request, Response } from "express"
import createAnswer from "../common/createAnswer"
import { employees } from "../models"

interface IRequestGetAll extends Request{
    query:{
        page?: string,
        limit?: string
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

}

export default new EmployeesController()