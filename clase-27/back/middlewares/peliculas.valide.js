import { peliculasSchema } from "../shemas/peliculas.js"

export async function validatePelicula(req, res, next){
    console.log("validando...", req.body)
    try {
        const peliculaValidada = await peliculasSchema.parseAsync({
            ...req.body,
            portada: req.file
        })
        req.body = peliculaValidada
        next()
    } catch (errors) {
        if(req.file){
            //deberia borrarlo
        }
        const messages = errors?.issues?.map( error => `${error?.path?.join(", ")} : ${error?.message}` )
        res.status(400).json(messages)
    }
}