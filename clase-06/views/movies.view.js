import { createPage, createList } from "../page/utils.js"

export function createMoviePage(peliculas) {
    return createPage("Peliculas", createList(peliculas))
}

export function createDetailPage(pelicula) {
    let html = `<p>Año de estreno: ${pelicula.year}</p>`
    html += `<p>Genero: ${pelicula.primary_genre}</p>`
    html += `<p>Pais: ${pelicula.country}</p>`
    html += `<p>Idioma: ${pelicula.language}</p>`
    html += `<p>Produccion: ${pelicula.production_scale}</p>`
    html += "<a href='/peliculas' >Volver</a>"
    return createPage(pelicula.title, html)
}

export function pageError(error, mensaje){
    return createPage(error, mensaje)
}

export function nuevaPeliculaForm() {
    let html = `<form action="/peliculas/nuevo" method="POST" >`
    html += `
        <div class="mt-2" >
            <label class="form-label" >Titulo: </label>
            <input class="form-control" type="text" name="title" />
        </div>
        <div class="mt-2" >
            <label class="form-label" >Año de estreno: </label>
            <input class="form-control" type="number" name="year" />
        </div>
        <div class="mt-2" >
            <label class="form-label" >Genero: </label>
            <input class="form-control" type="text" name="primary_genre" />
        </div>   
       <div class="mt-2" >
            <label class="form-label" >Pais: </label>
            <input class="form-control" type="text" name="country" />
        </div>
        <div class="mt-2" >
            <label class="form-label" >Idioma: </label>
            <input class="form-control" type="text" name="language" />
        </div>
        <div class="mt-2" >
            <label class="form-label" >Produccion: </label>
            <input class="form-control" type="text" name="production_scale" />
        </div>      
        <button class="btn btn-primary mt-2" type="submit" >Guardar</button>                 
    `
    html += `</form>`
    html += "<a href='/peliculas' class='mt-4' >Volver</a>"
    return createPage("Nueva pelicula", html)
}