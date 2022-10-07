import { Response } from "express";

const createAnswer=(res: Response, statusCode: number, isError: boolean, message: string, data?: Object)=>{
    return res.status(statusCode).json({error: isError, message, data})
}

export default createAnswer