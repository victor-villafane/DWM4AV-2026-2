import * as movieController from "../controllers/movies.controller.js"
import { Router } from "express"

const router = Router()

router.get("/peliculas", movieController.getPeliculas)
router.get("/peliculas/nuevo", movieController.nuevaPeliculaForm)      // Route -> Controller -> View/Service
router.post("/peliculas/nuevo", movieController.guardarPelicula)       // Route -> Controller -> View/Service
router.get("/peliculas/editar/:title", movieController.editarPeliculaForm)       // Route -> Controller -> View/Service
router.post("/peliculas/editar/:title", movieController.editarPelicula)       // Route -> Controller -> View/Service
router.get("/peliculas/eliminar/:title", movieController.eliminarPeliculaForm)       // Route -> Controller -> View/Service
router.post("/peliculas/eliminar/:title", movieController.eliminarPelicula)       // Route -> Controller -> View/Service
router.get("/peliculas/:title", movieController.getPeliculaByTitle)

export default router