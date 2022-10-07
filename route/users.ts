import { Router } from 'express'
import userController from '../controllers/userController'

const usersRouter = Router()

usersRouter.post('/', userController.createUser)

export default usersRouter