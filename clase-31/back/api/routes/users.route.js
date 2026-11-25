import { validateRol, validateToken } from "../../middlewares/auth.validate.js"
import { validateTokenSupabase } from "../../middlewares/supabase.validate.js"
import { validateLogin, validateRegister } from "../../middlewares/users.validate.js"
import * as userController from "../controllers/users.controller.js"
import { Router } from "express"

const router = Router()

router.get("/api/usuarios",[validateToken, validateRol(["superadmin"])], userController.getUsers)
router.post("/api/usuarios",[validateRegister], userController.saveUsers)
router.post("/api/usuarios/login",[validateLogin], userController.login)
router.get("/api/usuarios/:id/reviews", userController.getUserReview)
router.delete("/api/usuarios/review/:id", userController.deleteUserReview)
router.post("/api/usuarios/cambiarRol", userController.cambiarRol)
router.post("/api/usuarios/reset",[validateToken, validateRol(["superadmin"])], userController.reset)
router.post("/api/usuarios/social-login",[validateTokenSupabase], userController.socialLogin)

export default router