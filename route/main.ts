import { Router } from 'express'
import servisesRouter from './servises'
import usersRouter from './users'

const mainRouter = Router()

mainRouter.use('/users', usersRouter)
mainRouter.use('/servises', servisesRouter)

export default mainRouter