import { call } from "./api.service";

export function useApiAuth() {
    const login = (usuario) => call("/usuarios/login", "POST", usuario)
    const register = (usuario) => call("/usuarios", "POST", usuario)

    return {
        login,
        register
    }
}