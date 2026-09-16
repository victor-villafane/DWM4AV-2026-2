import { ObjectId } from "mongodb"
import { db as conexion } from "../config/db.js"

export async function getUsers(){
    const db = conexion()
    return await db.collection("usuarios").find().toArray()
}