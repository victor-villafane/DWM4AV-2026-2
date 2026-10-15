import { usersLoginSchema, usersRegisterSchema } from "../shemas/users"

export async function validateLogin(req, res, next){
    console.log("validando...")
    try {
        const usuarioValidado = await usersLoginSchema.parseAsync(req.body)
        req.body = usuarioValidado
        next()
    } catch (errors) {
        const messages = errors?.issues?.map( error => `${error?.path?.join(", ")} : ${error?.message}` )
        res.status(400).json(messages)
    }
}

export async function validateRegister(req, res, next){
    console.log("validando...")
    try {
        const usuarioValidado = await usersRegisterSchema.parseAsync(req.body)
        req.body = usuarioValidado
        next()
    } catch (errors) {
        const messages = errors?.issues?.map( error => `${error?.path?.join(", ")} : ${error?.message}` )
        res.status(400).json(messages)
    }
}