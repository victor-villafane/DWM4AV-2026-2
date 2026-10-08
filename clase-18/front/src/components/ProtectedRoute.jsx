import { Navigate } from 'react-router'

export default function ProtectedRoute({element, rol}) {
    const usuario = JSON.parse(localStorage.getItem("usuario"))
    
    if(usuario && rol.includes(usuario?.rol) ) return element
    if(usuario) alert("No se puede ingresar a la seccion")
    return <Navigate to="/login" />
}
