import { createDetailPage, createMoviePage } from "../views/movies.view.js"
import * as movieService from "../services/movies.service.js"
import * as movieView from "../views/movies.view.js"

export async function getPeliculas(req, res) {
    try {
        const peliculas = await movieService.getPeliculas()
        // console.log(peliculas.length)
        res.send(createMoviePage(peliculas))
    } catch (error) {
        res.send(movieView.pageError(404, "Pagina no encontrada"))
    }
}

export async function getPeliculaByTitle(req, res) {
    try {
        const title = req.params.title
        const pelicula = await movieService.getPeliculaByTitle(title)
        res.send(createDetailPage(pelicula))
    } catch (error) {
        res.send( movieView.pageError("404", "Pelicula no encontrada") )
    }
}


export async function nuevaPeliculaForm(req, res) {
    try {
        res.send(movieView.nuevaPeliculaForm())
    } catch (error) {
        res.send( movieView.pageError("404", "Pagina no encontrada") )
    }
}

export async function guardarPelicula(req, res){
    console.log(req.body)
    try {
        const pelicula = await movieService.guardarPelicula(req.body)
        res.send( createDetailPage(pelicula) )
    } catch (error) {
        res.send( movieView.pageError("400", "No se pudo agregar la pelicula") )
    }
}