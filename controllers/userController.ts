import { Request, Response } from "express";
import createAnswer from "../common/createAnswer";
import { typeRole } from "../interfaces/enumRole";
import { user } from "../models";

interface IRequestCreateUser extends Request{
    body:{
        login: string,
        password: string,
        role?: typeRole
    }
}

class UserController{

    public createUser = async(req: IRequestCreateUser, res: Response) =>{
        const userItem = await user.create(req.body)
        return createAnswer(res, 200, false, 'new user created', userItem)    
    }



}

export default new UserController