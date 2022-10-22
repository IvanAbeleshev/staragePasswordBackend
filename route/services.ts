import { Router } from 'express'
import servicesContoller from '../controllers/servicesContoller'
import checkAdminRole from '../middleware/adminRole'
import { verifyToken } from '../middleware/verifyToken'

const servicesRouter = Router()

servicesRouter.get('/', verifyToken, servicesContoller.getAll)

servicesRouter.post('/createOne', [verifyToken, checkAdminRole], servicesContoller.createOne)
//servicesRouter.post('/createOne', servicesContoller.createOne)

export default servicesRouter
