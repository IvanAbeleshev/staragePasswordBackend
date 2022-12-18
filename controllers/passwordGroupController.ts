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
  public createGroup=async(req: iRequestcreateGroup, res:Response)=>{
    let icon
    if(req.files){
        icon = moveFile(req.files)
    }
    
    if(icon)
    {
        await passwordGroup.create({...req.body, icon})
    }else{
        await passwordGroup.create(req.body)
    }

    return createAnswer(res, 200, false, 'created new element')
  }
}

export default new PasswordGroupController() 