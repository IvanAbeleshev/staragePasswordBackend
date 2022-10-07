import { Request, Response } from "express";
import { typeRole } from "../interfaces/enumRole";

interface IRequestCreateUser extends Request{
    body:{
        login: string,
        password: string,
        role?: typeRole
    }
}

class UserController{

    public createUser = (req: IRequestCreateUser, res: Response) =>{
        
    }


    
}

export default new UserController