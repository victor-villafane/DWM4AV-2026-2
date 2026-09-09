import { readFile, writeFile } from "fs/promises"
import { MongoClient, ObjectId } from "mongodb"

const MONGO_URI = "mongodb+srv://admin:admin@dwm4av.gn31ykn.mongodb.net/?appName=dwm4av"

const client = new MongoClient(MONGO_URI)
const db = client.db("dwm4av")

export async function getPeliculas() {
    const peliculas = await db.collection("peliculas").find().toArray()
    return peliculas
}

export async function getPeliculaByTitle(id) {
    const pelicula = await db.collection("peliculas").findOne( { _id: new ObjectId(id) } )
    return pelicula
}

export async function guardarPelicula(pelicula) {
    await db.collection("peliculas").insertOne(pelicula)
    return pelicula
}

export async function editarPelicula(id, pelicula) {
    await db.collection("peliculas").replaceOne({_id:new ObjectId(id) }, pelicula)
    return pelicula
}

export async function eliminarPeliculaFisico(id) {
    let pelicula = await getPeliculaByTitle(id)
    await db.collection("peliculas").deleteOne({ _id: new ObjectId(id) })
    return pelicula
}

export async function eliminarPeliculaLogico(id) {
    let pelicula = await getPeliculaByTitle(id)
    await db.collection( "peliculas" ).updateOne(
        { _id: new ObjectId(id) },
        { $set: { eliminado: true } } //https://www.mongodb.com/es/docs/manual/reference/operator/update/set/
    )
    return pelicula
}