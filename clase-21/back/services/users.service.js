import { ObjectId } from "mongodb"
import { db as conexion } from "../config/db.js"

export async function getUsers(){
    const db = conexion()
    return await db.collection("usuarios").find().toArray()
}

export async function getUserById(id){
    const db = conexion()
    const usuario = db.collection("usuarios").findOne({_id:  new ObjectId(id)})
    return usuario
}

export async function userExists(id){
    const db = conexion()
    const count = await db.collection("usuarios").countDocuments({_id:  new ObjectId(id)})
    return count > 0
}

export async function saveUsers(usuario){
    const db = conexion()
    const user = await db.collection("usuarios").insertOne(usuario)
    return user
}