import { Router } from 'express'
import passwordGroupController from '../controllers/passwordGroupController'
import { verifyToken } from '../middleware/verifyToken'

const groupRouter = Router()

groupRouter.post('/create', verifyToken, passwordGroupController.createGroup)

groupRouter.get('/', verifyToken, passwordGroupController.getAll)

export default groupRouter