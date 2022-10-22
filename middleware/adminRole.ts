import { NextFunction, Request, Response } from "express"
import createAnswer from "../common/createAnswer"
import { typeRole } from "../interfaces/enumRole"

const checkAdminRole=(req: Request, res: Response, next: NextFunction)=>{
    if(req.user){
        if(req.user.role === typeRole.user){
            return createAnswer(res, 403, true, 'You rule is limited. Operation is canceled')
        }
    }

    next()
}

export default checkAdminRole