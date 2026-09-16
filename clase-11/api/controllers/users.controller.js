import * as userService from "../../services/users.service.js"

export async function getUsers(req, res){
    try {
        const usuarios = await userService.getUsers()
        res.status(200).json(usuarios)
    } catch (error) {
        res.status(500).json({ message: "No se puede traer los usuarios" })
    }
}