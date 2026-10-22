import { Router } from "express"
import * as movieController from "../controllers/movies.controller.js"
import { validatePelicula } from "../../middlewares/peliculas.valide.js"
import { validateRol, validateToken } from "../../middlewares/auth.validate.js"

const router = Router()

router.get("/api/peliculas", [validateToken, validateRol(["user", "admin", "superadmin"])], movieController.getPeliculas)
router.get("/api/peliculas/:id", movieController.getPeliculaByTitle)
router.post("/api/peliculas",[validatePelicula], movieController.savePelicula)
router.delete("/api/peliculas/:id", movieController.deletePelicula)
router.put("/api/peliculas/:title",[validatePelicula], movieController.replacePelicula)
router.patch("/api/peliculas/:title",[validatePelicula], movieController.updatePelicula)
router.post("/api/peliculas/:id/reviews", movieController.savePeliculaReview)

export default router