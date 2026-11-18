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
    console.log("id usuario",id)
    const count = await db.collection("usuarios").countDocuments({_id:  new ObjectId(id)})
    console.log("DOCUMENTOS", count, count > 0)
    return count > 0
}