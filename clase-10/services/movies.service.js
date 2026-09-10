import { MongoClient, ObjectId } from "mongodb"

const MONGO_URI = "mongodb+srv://admin:admin@dwm4av.gn31ykn.mongodb.net/?appName=dwm4av"

const client = new MongoClient(MONGO_URI)
const db = client.db("dwm4av")

export async function getPeliculas(filtros = {}) {
    const filter = { eliminado: { $ne: true } }     // != true https://www.mongodb.com/es/docs/manual/reference/operator/query/ne/
    // Calculo de paginas
    const page = parseInt( filtros?.page ?? 1 ) 
    const limit = parseInt( filtros?.limit ?? 10 ) 
    const skip = ( page - 1 ) * limit

    // Filtro por idioma
    if( filtros?.language ) filter.language = filtros?.language

    // Filtro por año
    if( filtros?.min_year ) filter.year = { $gte: filtros?.min_year } //https://www.mongodb.com/es/docs/manual/reference/operator/query/gte/
    if( filtros?.max_year ) filter.year = { $lte: filtros?.max_year } //https://www.mongodb.com/es/docs/manual/reference/operator/query/lte/
    if( filtros?.max_year && filtros?.min_year ) filter.$and = [      //https://www.mongodb.com/es/docs/manual/reference/operator/query/and/
        { year: { $gte: filtros?.min_year } },
        { year: { $lte: filtros?.max_year } }
    ]
    // Busqueda por titulo
    if( filtros?.title ) filter.title = { $regex: filtros?.title, $options: "i" }   //https://www.mongodb.com/es/docs/manual/reference/operator/query/regex/
    //if( filtros?.title ) filter.$text = { $search: filtros?.title } //Necesitan un indice //https://www.mongodb.com/es/docs/manual/reference/operator/query/text/

    const peliculas = await db.collection("peliculas").find(filter).skip(skip).limit(limit).toArray()
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