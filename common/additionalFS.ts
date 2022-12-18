import path from 'path'
import fs from 'fs'
import fileUpload, { UploadedFile } from 'express-fileupload'
import { v4 } from 'uuid'

export const moveFile=(files: fileUpload.FileArray):string|undefined=>{
  const arrayFilesName: string[] = []
  const isCatalogExist = fs.existsSync(path.resolve(__dirname, '..', 'static'))
  if(!isCatalogExist){
      fs.mkdirSync(path.resolve(__dirname, '..', 'static'))
  }

  for(let item in files){
      
      const currentFile: UploadedFile = <UploadedFile>files[item];
      let fileName = v4()+'.jpeg'
      currentFile.mv(path.resolve(__dirname, '..', 'static', fileName))
      arrayFilesName.push(fileName)
  
  }

  if(arrayFilesName.length>0){
      return arrayFilesName[0]
  }

}