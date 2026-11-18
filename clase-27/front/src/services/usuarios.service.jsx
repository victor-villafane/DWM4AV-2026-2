import { call } from "./api.service"

export function useApiUsuarios(){
    const getUsuarios = () => call("/usuarios")
    const asignarRol = (datos) => call("/usuarios/cambiarRol", "POST", datos)
    const resetPassword = (usuario) => call("/usuarios/reset", "POST", usuario) 

    return {
        getUsuarios,
        asignarRol,
        resetPassword
    }
}