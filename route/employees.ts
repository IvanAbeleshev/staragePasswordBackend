import { Router } from "express";
import employeesController from "../controllers/employeesController";
import { verifyToken } from "../middleware/verifyToken";

const employeesRouter = Router()

employeesRouter.get('/', verifyToken, employeesController.getAll)
employeesRouter.get('/getOne', verifyToken, employeesController.getOne)

employeesRouter.post('/createOne', verifyToken, employeesController.createOne)

export default employeesRouter