import * as userService from "../../services/users.service.js"
import * as reviewService from "../../services/reviews.service.js"

export async function getUsers(req, res) {
    try {
        const usuarios = await userService.getUsers()
        res.status(200).json(usuarios)
    } catch (error) {
        res.status(500).json({ message: "No se puede traer los usuarios" })
    }
}

export async function getUserReview(req, res) {
    try {
        const id = req.params.id
        const usuario = await userService.getUserById(id)
        res.status(200).json(usuario?.reviews || [])
    } catch (error) {
        res.status(500).json({ message: "No se puede traer los usuarios" })
    }
}

export async function deleteUserReview(req, res) {
    try {
        const id = req.params.id
        const ok = await reviewService.deleteReview(id)
        res.status(200).json(ok)
    } catch (error) {
        res.status(500).json({ message: "No se puede traer los usuarios" })
    }
}

export async function saveUsers(req, res) {
    try {
        const user = await userService.saveUsers(req.body)
        if (user) res.status(200).json(user)
        else res.status(400).json({ message: "No se pudo crear el usuario" })
    } catch (error) {
        res.status(500).json({ message: "No se pudo crear el usuario" })
    }
}

export async function login(req, res) {
    try {
        const user = await userService.login(req.body)
        if (!user) res.status(400).json({ message: "Usuario/contraseña incorrectos" })
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({ message: "No se pudo loguear el usuario" })
    }
}

export async function cambiarRol(req, res) {
    try {
        const user = await userService.cambiarRol(req.body)
        if (!user) res.status(400).json({ message: "Usuario no encontrado" })
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({ message: "Usuario no encontrado" })
    }
}