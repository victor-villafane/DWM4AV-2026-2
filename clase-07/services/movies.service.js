import { readFile, writeFile } from "fs/promises"

export async function getPeliculas() {
    return JSON.parse(await readFile("./data/peliculas.json", "utf-8")).filter( p => p.eliminado != true )
}

export async function getPeliculaByTitle(title) {
    const peliculas = await getPeliculas()
    const pelicula = peliculas.find((pelicula) => pelicula.title == title)
    return pelicula
}

export async function guardarPelicula(pelicula) {
    const peliculas = await getPeliculas()

    if (peliculas.some(p => p.title == pelicula.title)) {
        throw new Error("No se puede agregar la pelicula")
    }

    peliculas.push(pelicula)
    await writeFile("./data/peliculas.json", JSON.stringify(peliculas), "utf-8")
    console.log("service", pelicula)
    return pelicula
}

export async function editarPelicula(title, pelicula) {
    const peliculas = await getPeliculas()
    const peliculasNuevas = peliculas.map(p => {
        if (p.title == title) {
            return pelicula
        } else {
            return p
        }
    })
    await writeFile("./data/peliculas.json", JSON.stringify(peliculasNuevas), "utf-8")
    return pelicula
}

export async function eliminarPeliculaFisico(title) {
    const peliculas = await getPeliculas()
    let pelicula = false
    const peliculasNuevas = peliculas.filter(p => {
        if (p.title == title) {
            pelicula = p
            return false
        } else {
            return true
        }
    })
    if (!pelicula) throw new Error("No se pudo borrar la pelicula")
    await writeFile("./data/peliculas.json", JSON.stringify(peliculasNuevas), "utf-8")
    return pelicula
}

export async function eliminarPeliculaLogico(title) {
    const peliculas = await getPeliculas()
    let pelicula = false
    const peliculasNuevas = peliculas.map(p => {
        if (p.title == title) {
            p.eliminado = true
            pelicula = p
        }
        return p
    })
    if (!pelicula) throw new Error("No se pudo borrar la pelicula")
    await writeFile("./data/peliculas.json", JSON.stringify(peliculasNuevas), "utf-8")
    return pelicula
}