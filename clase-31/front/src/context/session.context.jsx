import { createContext, useContext, useState } from "react"
import { jwtDecode } from "jwt-decode";

export const contexto = createContext()

export function useSession(){
    return useContext(contexto)
}

export function useLogin(){
    const { onLogin } = useSession()
    return onLogin
}

export function useLogout(){
    const {onLogout} = useSession()
    return onLogout
}

export function useUsuario(){
    const { usuario } = useSession()
    return usuario
}

export function useRol(){
    const { onRol } = useSession()
    return onRol
}

export function SessionProvider({ children }) {
    const [usuario, setUsuario] = useState( JSON.parse( localStorage.getItem("usuario") ) || null )

    const onLogin = (usuario) => {
        localStorage.setItem("usuario", JSON.stringify(usuario))
        setUsuario(usuario)
    }

    const onLogout = () => {
        setUsuario(null)
        localStorage.clear()
    }

    const onRol = () => {
        if( usuario?.token ){
            const payload = jwtDecode(usuario?.token)
            return payload.rol
        }
    }

    return (
        <contexto.Provider value={{ usuario, onLogin, onLogout, onRol }} >
            {children}
        </contexto.Provider>
    )
}