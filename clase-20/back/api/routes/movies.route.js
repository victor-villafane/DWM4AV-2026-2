import { Router } from "express"
import * as movieController from "../controllers/movies.controller.js"
import { validatePelicula } from "../../middlewares/peliculas.valide.js"

const router = Router()

router.get("/api/peliculas", movieController.getPeliculas)
router.get("/api/peliculas/:id", movieController.getPeliculaByTitle)
router.post("/api/peliculas",[validatePelicula], movieController.savePelicula)
router.delete("/api/peliculas/:id", movieController.deletePelicula)
router.put("/api/peliculas/:title",[validatePelicula], movieController.replacePelicula)
router.patch("/api/peliculas/:title",[validatePelicula], movieController.updatePelicula)
router.post("/api/peliculas/:id/reviews", movieController.savePeliculaReview)

export default router