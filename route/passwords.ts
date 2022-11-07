import { Router } from 'express'
import passwordsController from '../controllers/passwordsController'
import { verifyToken } from '../middleware/verifyToken'

const passwordsRouter = Router()

passwordsRouter.get('/', verifyToken, passwordsController.getAll)

export default passwordsRouter