import * as movieService from "../../services/movies.service.js"

export async function getPeliculas(req, res) {
    try {
        const filtros = req.query
        const peliculas = await movieService.getPeliculas(filtros)
        res.status(200).json(peliculas)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export async function getPeliculaByTitle(req, res) {
    try {
        const id = req.params.id
        const pelicula = await movieService.getPeliculaByTitle(id)
        if (pelicula) {
            res.status(200).json(pelicula)
        } else {
            res.status(404).json({ message: "Pelicula no encontrada" })
        }
    } catch (error) {
        res.status(500).json({ message: error })
    }
}

export async function savePelicula(req, res) {
    try {
        console.log(req.body)
        const pelicula = await movieService.guardarPelicula(req.body)

        if (pelicula) { //Object.key( pelicula ).length > 0
            res.status(200).json(pelicula)
        } else {
            res.status(400).json({ message: "El titulo de la pelicula ya esta registrado" })
        }

    } catch (error) {
        res.status(500).json({ message: error })
    }
}

export async function deletePelicula(req, res) {
    try {
        const id = req.params.id
        const pelicula = await movieService.eliminarPeliculaLogico(id)
        if (pelicula) {
            res.status(200).json(pelicula)
        } else {
            res.status(404).json({ message: "Pelicula no encontrada" })
        }
    } catch (error) {
        res.status(500).json({ message: "No se pudo borrar la pelicula" })
    }
}

export async function replacePelicula(req, res) {
    try {
        const title = req.params.title
        const pelicula = await movieService.editarPelicula(title, req.body)
        if (pelicula) {
            res.status(200).json(pelicula)
        } else {
            res.status(404).json({ message: "Pelicula no encontrada" })
        }
    } catch (error) {
        res.status(500).json({ message: "No se pudo reemplazar la pelicula" })
    }
}

export async function updatePelicula(req, res) {
    try {
        const title = req.params.title
        const peliculaActual = await movieService.getPeliculaByTitle(title)
        req.body = {
            "title": req.body.title ?? peliculaActual?.title,                        //null collage
            "year": req.body.year ?? peliculaActual?.year,
            "primary_genre": req.body.primary_genre ?? peliculaActual?.primary_genre,
            "country": req.body.country ?? peliculaActual?.country,
            "language": req.body.language ?? peliculaActual?.language,
            "production_scale": req.body.production_scale ?? peliculaActual?.production_scale
        }
        const pelicula = await movieService.editarPelicula(title, req.body)
        if (pelicula) {
            res.status(200).json(pelicula)
        } else {
            res.status(404).json({ message: "Pelicula no encontrada" })
        }
    } catch (error) {
        res.status(500).json({ message: "No se pudo reemplazar la pelicula" })
    }
}

export async function savePeliculaReview(req, res) {
    try {
        const id = req.params.id
        const pelicula = await movieService.savePeliculaReview(id, req.body)
        if (pelicula) {
            res.status(200).json(pelicula)
        } else {
            res.status(404).json({ message: "Pelicula no encontrada" })
        }
    } catch (error) {
        res.status(500).json({ message: "No se pudo comentar en la pelicula" })
    }
}

