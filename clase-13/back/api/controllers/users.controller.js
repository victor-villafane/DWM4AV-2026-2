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