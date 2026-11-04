import { supabase } from "../services/supabase.service.js"

export async function validateTokenSupabase( req, res, next ){
    try {
        const [ bearer, token ] = req.headers.authorization.split(" ")
        const { data, error } = await supabase.auth.getUser(token)
        if( error || !data.user ) throw new Error()
        req.usuario = data.user
        next()
    } catch (error) {
        res.status(401).json({message: "Usuario no autorizado"})
    }
}