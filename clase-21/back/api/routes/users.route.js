import { validateRegister } from "../../middlewares/users.validate.js"
import * as userController from "../controllers/users.controller.js"
import { Router } from "express"

const router = Router()

router.get("/api/usuarios", userController.getUsers)
router.post("/api/usuarios",[validateRegister], userController.saveUsers)
router.get("/api/usuarios/:id/reviews", userController.getUserReview)
router.delete("/api/usuarios/review/:id", userController.deleteUserReview)

export default router