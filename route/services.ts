import { Router } from 'express'
import servicesContoller from '../controllers/servicesContoller'
import checkAdminRole from '../middleware/adminRole'
import { verifyToken } from '../middleware/verifyToken'

const servicesRouter = Router()

servicesRouter.get('/', verifyToken, servicesContoller.getAll)
servicesRouter.get('/getOne', verifyToken, servicesContoller.getOne)

servicesRouter.post('/createOne', [verifyToken, checkAdminRole], servicesContoller.createOne)
servicesRouter.post('/update', [verifyToken, checkAdminRole], servicesContoller.updateOne)
//servicesRouter.post('/createOne', servicesContoller.createOne)

export default servicesRouter
