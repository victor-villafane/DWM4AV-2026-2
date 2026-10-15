import { peliculasSchema } from "../shemas/peliculas.js"

export async function validatePelicula(req, res, next){
    console.log("validando...")
    try {
        const peliculaValidada = await peliculasSchema.parseAsync(req.body)
        req.body = peliculaValidada
        next()
    } catch (errors) {
        const messages = errors?.issues?.map( error => `${error?.path?.join(", ")} : ${error?.message}` )
        res.status(400).json(messages)
    }
}