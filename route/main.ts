import { Router } from 'express'
import employeesRouter from './employees'
import groupRouter from './group'
import passwordsRouter from './passwords'
import servicesRouter from './services'
import usersRouter from './users'

const mainRouter = Router()

mainRouter.use('/users', usersRouter)
mainRouter.use('/services', servicesRouter)
mainRouter.use('/employees', employeesRouter)
mainRouter.use('/passwords', passwordsRouter)
mainRouter.use('/groups', groupRouter)

export default mainRouter