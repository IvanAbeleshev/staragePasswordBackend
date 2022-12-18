import { Router } from 'express'
import userController from '../controllers/userController'
import { verifyRefreshToken } from '../middleware/verifyRefreshToken'
import { verifyToken } from '../middleware/verifyToken'

const usersRouter = Router()

usersRouter.post('/singIn', userController.singIn)
usersRouter.post('/changeUser', verifyToken, userController.changeUser)
usersRouter.post('/', userController.createUser)
usersRouter.post('/checkUser', verifyRefreshToken, userController.checkUser)

usersRouter.get('/checkAdmin', userController.checkAdminUserInDb)
usersRouter.get('/', verifyToken, userController.getAll)
usersRouter.get('/getOne', verifyToken, userController.getOne)


export default usersRouter