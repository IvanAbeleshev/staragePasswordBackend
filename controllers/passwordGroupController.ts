import { Request, Response } from 'express'
import { moveFile } from '../common/additionalFS'
import createAnswer from '../common/createAnswer'
import { passwordGroup } from '../models'

interface iRequestcreateGroup extends Request{
  body:{
    name: string,
    idOwner?: number
  }
}

class PasswordGroupController{
  public createGroup=async(req:iRequestcreateGroup, res:Response)=>{
    const icon = moveFile(req.files)
    
    const createdItem = icon?await passwordGroup.create({...req.body, icon}):await passwordGroup.create(req.body)

    return createAnswer(res, 200, false, 'created new element', createdItem.get())
  }

  public getAll=async(req:Request, res:Response)=>{
    //need rework selection by permission access in future
    const dataGroup = await passwordGroup.findAll()
    
    return createAnswer(res, 200, false, 'data of groups', dataGroup)
  }
}

export default new PasswordGroupController() 