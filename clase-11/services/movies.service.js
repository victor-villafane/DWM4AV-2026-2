import { ObjectId } from "mongodb"
import { db as conexion } from "../config/db.js"

export async function getPeliculas(filtros = {}) {
    const db = conexion()
    const filter = { eliminado: { $ne: true } }     // != true https://www.mongodb.com/es/docs/manual/reference/operator/query/ne/
    // Calculo de paginas
    const page = parseInt(filtros?.page ?? 1)
    const limit = parseInt(filtros?.limit ?? 10)
    const skip = (page - 1) * limit

    // Filtro por idioma
    if (filtros?.language) filter.language = filtros?.language

    // Filtro por año
    if (filtros?.min_year) filter.year = { $gte: filtros?.min_year } //https://www.mongodb.com/es/docs/manual/reference/operator/query/gte/
    if (filtros?.max_year) filter.year = { $lte: filtros?.max_year } //https://www.mongodb.com/es/docs/manual/reference/operator/query/lte/
    if (filtros?.max_year && filtros?.min_year) filter.$and = [      //https://www.mongodb.com/es/docs/manual/reference/operator/query/and/
        { year: { $gte: filtros?.min_year } },
        { year: { $lte: filtros?.max_year } }
    ]
    // Busqueda por titulo
    if (filtros?.title) filter.title = { $regex: filtros?.title, $options: "i" }   //https://www.mongodb.com/es/docs/manual/reference/operator/query/regex/
    //if( filtros?.title ) filter.$text = { $search: filtros?.title } //Necesitan un indice //https://www.mongodb.com/es/docs/manual/reference/operator/query/text/

    const peliculas = await db.collection("peliculas").find(filter).skip(skip).limit(limit).toArray()
    return peliculas
}

export async function getPeliculaByTitle(id) {
    const db = conexion()
    const pelicula = await db.collection("peliculas").findOne({ _id: new ObjectId(id) })
    return pelicula
}

export async function guardarPelicula(pelicula) {
    const db = conexion()
    await db.collection("peliculas").insertOne(pelicula)
    return pelicula
}

export async function editarPelicula(id, pelicula) {
    const db = conexion()
    await db.collection("peliculas").replaceOne({ _id: new ObjectId(id) }, pelicula)
    // // actualice categorias
    // db.collection("categorias").updateOne({ _id: ObjectId(id) }, { $set: {} })
    // // Actualizar los produtos
    // db.collection("productos").updateMany({ "categoria._id": ObjectId(id) }, { $set: {} })
    return pelicula
}

export async function eliminarPeliculaFisico(id) {
    const db = conexion()
    let pelicula = await getPeliculaByTitle(id)
    await db.collection("peliculas").deleteOne({ _id: new ObjectId(id) })
    return pelicula
}

export async function eliminarPeliculaLogico(id) {
    const db = conexion()
    let pelicula = await getPeliculaByTitle(id)
    await db.collection("peliculas").updateOne(
        { _id: new ObjectId(id) },
        { $set: { eliminado: true } } //https://www.mongodb.com/es/docs/manual/reference/operator/update/set/
    )
    return pelicula
}

export async function savePeliculaReview(id, usuario){
    const db = conexion()
    await db.collection("peliculas").updateOne(
        { _id: new ObjectId(id) },
        { $push: { reviews: {...usuario} } }
    )
    const pelicula = await getPeliculaByTitle(id)
    return pelicula
}