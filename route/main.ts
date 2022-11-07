import { Router } from 'express'
import employeesRouter from './employees'
import passwordsRouter from './passwords'
import servicesRouter from './services'
import usersRouter from './users'

const mainRouter = Router()

mainRouter.use('/users', usersRouter)
mainRouter.use('/services', servicesRouter)
mainRouter.use('/employees', employeesRouter)
mainRouter.use('/passwoeds', passwordsRouter)

export default mainRouter