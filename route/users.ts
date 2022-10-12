import { Router } from 'express'
import userController from '../controllers/userController'
import { verifyToken } from '../middleware/verifyToken'

const usersRouter = Router()

usersRouter.post('/singIn', userController.singIn)
usersRouter.get('/checkUser', verifyToken ,userController.checkUser)
usersRouter.post('/', userController.createUser)


usersRouter.get('/checkAdmin', userController.checkAdminUserInDb)


export default usersRouter