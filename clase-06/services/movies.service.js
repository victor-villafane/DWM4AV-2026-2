import { readFile, writeFile } from "fs/promises"

export async function getPeliculas() {
    return JSON.parse(await readFile("./data/peliculas.json", "utf-8"))
}

export async function getPeliculaByTitle(title) {
    const peliculas = await getPeliculas()
    const pelicula = peliculas.find((pelicula) => pelicula.title == title)
    return pelicula
}

export async function guardarPelicula(pelicula){
    const peliculas = await getPeliculas()

    if( peliculas.some( p => p.title == pelicula.title ) ){
        throw new Error("No se puede agregar la pelicula")
    }

    peliculas.push(pelicula)
    await writeFile("./data/peliculas.json", JSON.stringify(peliculas), "utf-8")
    console.log("service",pelicula)
    return pelicula
}