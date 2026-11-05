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

export function pageError(error, mensaje) {
    return createPage(error, mensaje)
}

export function nuevaPeliculaForm() {
    let html = `<form action="/peliculas/nuevo" method="POST" >`
    html += `
        <div className="mt-2" >
            <label className="form-label" >Titulo: </label>
            <input className="form-control" type="text" name="title" />
        </div>
        <div className="mt-2" >
            <label className="form-label" >Año de estreno: </label>
            <input className="form-control" type="number" name="year" />
        </div>
        <div className="mt-2" >
            <label className="form-label" >Genero: </label>
            <input className="form-control" type="text" name="primary_genre" />
        </div>   
       <div className="mt-2" >
            <label className="form-label" >Pais: </label>
            <input className="form-control" type="text" name="country" />
        </div>
        <div className="mt-2" >
            <label className="form-label" >Idioma: </label>
            <input className="form-control" type="text" name="language" />
        </div>
        <div className="mt-2" >
            <label className="form-label" >Produccion: </label>
            <input className="form-control" type="text" name="production_scale" />
        </div>      
        <button className="btn btn-primary mt-2" type="submit" >Guardar</button>                 
    `
    html += `</form>`
    html += "<a href='/peliculas' className='mt-4' >Volver</a>"
    return createPage("Nueva pelicula", html)
}

export function editarPeliculaForm(pelicula) {
    let html = `<form action="/peliculas/editar/${pelicula.title}" method="POST" >`
    html += `
        <div className="mt-2" >
            <label className="form-label" >Titulo: </label>
            <input className="form-control" type="text" name="title" value="${pelicula.title}" />
        </div>
        <div className="mt-2" >
            <label className="form-label" >Año de estreno: </label>
            <input className="form-control" type="number" name="year" value="${pelicula.year}"/>
        </div>
        <div className="mt-2" >
            <label className="form-label" >Genero: </label>
            <input className="form-control" type="text" name="primary_genre" value="${pelicula.primary_genre}"/>
        </div>   
       <div className="mt-2" >
            <label className="form-label" >Pais: </label>
            <input className="form-control" type="text" name="country" value="${pelicula.country}"/>
        </div>
        <div className="mt-2" >
            <label className="form-label" >Idioma: </label>
            <input className="form-control" type="text" name="language" value="${pelicula.language}"/>
        </div>
        <div className="mt-2" >
            <label className="form-label" >Produccion: </label>
            <input className="form-control" type="text" name="production_scale" value="${pelicula.production_scale}"/>
        </div>      
        <button className="btn btn-primary mt-2" type="submit" >Guardar</button>                 
    `
    html += `</form>`
    html += "<a href='/peliculas' className='mt-4' >Volver</a>"
    return createPage("Editar pelicula", html)
}

export function eliminarPeliculaForm(pelicula) {
    let html = ``
    html += `<form action="/peliculas/eliminar/${pelicula.title}" method="POST" >`
    html += `<p>Año de estreno: ${pelicula.year}</p>`
    html += `<p>Genero: ${pelicula.primary_genre}</p>`
    html += `<p>Pais: ${pelicula.country}</p>`
    html += `<p>Idioma: ${pelicula.language}</p>`
    html += `<p>Produccion: ${pelicula.production_scale}</p>`
    html += `<button className="btn btn-danger" >Eliminar</button>`
    html += `</form>`
    html += "<a href='/peliculas' >Volver</a>"
    return createPage(pelicula.title, html)
}