import * as userController from "../controllers/users.controller.js"
import { Router } from "express"

const router = Router()

router.get("/api/usuarios", userController.getUsers)

export default router