import { Router } from "express"
import * as movieController from "../controllers/movies.controller.js"

const router = Router()

router.get("/api/peliculas", movieController.getPeliculas)
router.get("/api/peliculas/:id", movieController.getPeliculaByTitle)
router.post("/api/peliculas", movieController.savePelicula)
router.delete("/api/peliculas/:id", movieController.deletePelicula)
router.put("/api/peliculas/:title", movieController.replacePelicula)
router.patch("/api/peliculas/:title", movieController.updatePelicula)

export default router