import { Router } from "express";
import employeesController from "../controllers/employeesController";
import { verifyToken } from "../middleware/verifyToken";

const employeesRouter = Router()

employeesRouter.get('/', verifyToken, employeesController.getAll)

export default employeesRouter