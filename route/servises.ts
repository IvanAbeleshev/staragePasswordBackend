import { Router } from 'express'
import servisesContoller from '../controllers/servisesContoller'
import checkAdminRole from '../middleware/adminRole'
import { verifyToken } from '../middleware/verifyToken'

const servisesRouter = Router()

servisesRouter.get('/', verifyToken, servisesContoller.getAll)

servisesRouter.post('/createOne', checkAdminRole, servisesContoller.createOne)

export default servisesRouter
