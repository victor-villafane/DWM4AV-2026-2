import { Navigate } from 'react-router'
import { useRol, useUsuario } from '../context/session.context'

export default function ProtectedRoute({element, rol}) {
    const usuario = useUsuario()
    const userRol = useRol()
    console.log(userRol())
    if(usuario && rol.includes(usuario?.rol) ) return element
    if(usuario) alert("No se puede ingresar a la seccion")
    return <Navigate to="/login" />
}
