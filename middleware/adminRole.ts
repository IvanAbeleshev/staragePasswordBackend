import { NextFunction, Request, Response } from "express"
import createAnswer from "../common/createAnswer"
import { typeRole } from "../interfaces/enumRole"
import { verifyToken } from "./verifyToken"

const checkAdminRole=()=>{
    return (req: Request, res: Response, next: NextFunction)=>
        verifyToken(req, res, ()=>{
            if(req.user){
                if(req.user.role === typeRole.user){
                    return createAnswer(res, 403, true, 'You rule is limited. Operation is canceled')
                }
            }

            next()
        })
}

export default checkAdminRole