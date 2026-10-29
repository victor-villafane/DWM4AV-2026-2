import { ObjectId } from "mongodb"
import { db as conexion } from "../config/db.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export async function getUsers() {
    const db = conexion()
    return await db.collection("usuarios").find().toArray()
}

export async function getUserById(id) {
    const db = conexion()
    const usuario = db.collection("usuarios").findOne({ _id: new ObjectId(id) })
    return usuario
}

export async function userExists(id) {
    const db = conexion()
    const count = await db.collection("usuarios").countDocuments({ _id: new ObjectId(id) })
    return count > 0
}

export async function saveUsers(usuario) {
    const db = conexion()
    const existe = await db.collection("usuarios").findOne({ email: usuario.email })
    if (existe) return false
    usuario.password = await bcrypt.hash(usuario.password, 10)
    delete usuario.passwordConfirm
    const user = await db.collection("usuarios").insertOne(usuario)
    return user
}

export async function login(usuario) {
    const db = conexion()
    const usuarioDB = await db.collection("usuarios").findOne({ email: usuario.email })
    if (!usuarioDB) return false

    const valido = await bcrypt.compare(usuario.password, usuarioDB.password)
    if (!valido) return false
    const payload = {
        email: usuarioDB.email,
        usuario: usuarioDB.username,
        name: usuarioDB.name,
        rol: usuarioDB.rol
    }

    const token = jwt.sign(payload, "Mi clave super secreta", {
        expiresIn: "2h"
    })

    return {
        email: usuarioDB.email,
        usuario: usuarioDB.username,
        name: usuarioDB.name,
        rol: usuarioDB.rol,
        token: token
    }
}

export async function cambiarRol(datos) {
    const db = conexion()
    const usuario = datos.usuario
    const nuevoRol = datos.nuevoRol

    await db.collection("usuarios").updateOne(
        { email: usuario.email }, 
        { $set: { rol: nuevoRol }
    })

    return usuario
}