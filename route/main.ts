import { Router } from 'express'
import servicesRouter from './services'
import usersRouter from './users'

const mainRouter = Router()

mainRouter.use('/users', usersRouter)
mainRouter.use('/services', servicesRouter)

export default mainRouter