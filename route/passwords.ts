import { Router } from 'express'
import passwordsController from '../controllers/passwordsController'
import { verifyToken } from '../middleware/verifyToken'

const passwordsRouter = Router()

passwordsRouter.get('/', verifyToken, passwordsController.getAll)
passwordsRouter.get('/getOne', verifyToken, passwordsController.getOne)
passwordsRouter.post('/create', verifyToken, passwordsController.create)

export default passwordsRouter