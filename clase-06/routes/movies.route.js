import * as movieController from "../controllers/movies.controller.js"
import { Router } from "express"

const router = Router()

router.get("/peliculas", movieController.getPeliculas)
router.get("/peliculas/nuevo", movieController.nuevaPeliculaForm)      // Route -> Controller -> View
router.post("/peliculas/nuevo", movieController.guardarPelicula)      // Route -> Controller -> View
router.get("/peliculas/:title", movieController.getPeliculaByTitle)

export default router