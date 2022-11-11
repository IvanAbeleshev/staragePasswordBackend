import { Router } from 'express'
import passwordsController from '../controllers/passwordsController'
import { verifyToken } from '../middleware/verifyToken'

const passwordsRouter = Router()

passwordsRouter.get('/', verifyToken, passwordsController.getAll)
passwordsRouter.get('/getOne', verifyToken, passwordsController.getOne)
passwordsRouter.get('/getCorectPassword', verifyToken, passwordsController.getCorectPassword)
passwordsRouter.post('/create', verifyToken, passwordsController.create)
passwordsRouter.post('/changeItem', verifyToken, passwordsController.changeItem)

export default passwordsRouter