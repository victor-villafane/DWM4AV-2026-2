import { ObjectId } from "mongodb"
import { db as conexion, client } from "../config/db.js"
import * as movieService from "./movies.service.js"
import * as userService from "./users.service.js"
import { MongoClient } from "mongodb"

export async function saveReview(usuario, pelicula) {

    const db = conexion()

    if (!(await movieService.movieExists(pelicula._id) && await userService.userExists(usuario._id))) {
        throw new Error("Exploto")
    }
    usuario._idReview = new ObjectId()
    await db.collection("peliculas").updateOne(
        { _id: new ObjectId(pelicula._id) },
        { $push: { reviews: { ...usuario } } }
    )

    usuario.pelicula = { ...pelicula, reviews: undefined }
    await db.collection("usuarios").updateOne(
        { _id: new ObjectId(usuario._id) },
        { $push: { reviews: { ...usuario, _id: undefined } } }
    )
    return pelicula
}

export async function deleteReview(id) { // este no haca falta para el TP1
    const mongoClient = client()
    // 1. iniciamos una session en mongodb
    const session = mongoClient.startSession()
    try {
        // 2. Comenzamos una transaccion
        session.startTransaction()

        const db = mongoClient.db("dwm4av")
        const resUsuario = await db.collection("usuarios").updateOne(
            { "reviews._idReview": new ObjectId(id) },
            { $pull: { reviews: { _idReview: new ObjectId(id) } } },
            { session }
        )
        const resPelicula = await db.collection("peliculas").updateOne(
            { "reviews._idReview": new ObjectId(id) },
            { $pull: { reviews: { _idReview: new ObjectId(id) } } },
            { session }
        )
        if (resUsuario.modifiedCount == 0 || resPelicula.modifiedCount == 0) {
            throw new Error("NO se modifico uno")
        }
        await session.commitTransaction()
        return true
    } catch (error) {
        console.log(error)
        await session.abortTransaction()
        return false
    } finally {
        await session.endSession()
    }
}