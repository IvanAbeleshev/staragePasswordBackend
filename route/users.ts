import { Router } from 'express'
import userController from '../controllers/userController'

const usersRouter = Router()

usersRouter.post('/singIn', userController.singIn)
usersRouter.post('/', userController.createUser)


usersRouter.get('/checkAdmin', userController.checkAdminUserInDb)


export default usersRouter