import { Router } from "express"
import * as movieController from "../controllers/movies.controller.js"
import { validatePelicula } from "../../middlewares/peliculas.valide.js"
import { validateRol, validateToken } from "../../middlewares/auth.validate.js"

const router = Router()

router.get("/api/peliculas", [validateToken, validateRol(["user", "admin", "superadmin"])], movieController.getPeliculas)
router.get("/api/peliculas/:id", [validateToken, validateRol(["user", "admin", "superadmin"])], movieController.getPeliculaByTitle)
router.post("/api/peliculas",[validateToken, validateRol(["admin", "superadmin"]), validatePelicula], movieController.savePelicula)
router.delete("/api/peliculas/:id", [validateToken, validateRol(["superadmin"])], movieController.deletePelicula)
router.put("/api/peliculas/:title",[validateToken, validateRol(["admin", "superadmin"]), validatePelicula], movieController.replacePelicula)
router.patch("/api/peliculas/:title",[validateToken, validateRol(["admin", "superadmin"]), validatePelicula], movieController.updatePelicula)
router.post("/api/peliculas/:id/reviews", [validateToken, validateRol(["user","admin", "superadmin"]), validatePelicula], movieController.savePeliculaReview)

export default router