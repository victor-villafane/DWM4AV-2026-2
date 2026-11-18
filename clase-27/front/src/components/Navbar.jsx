import { Activity, useContext } from 'react'
import { Link } from 'react-router'
import { contexto, useRol } from '../context/session.context'
export default function Navbar() {
    // const usuario = JSON.parse(localStorage.getItem("usuario"))
    const auth = useContext(contexto)
    const rol = useRol()
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">{auth?.usuario?.email || "Navbar"}</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <Link className="nav-link" to="/">Home</Link>
                        <Link className="nav-link" to="/contact">Contacto</Link>
                        <Activity mode={auth?.usuario ? "visible" : "hidden"} >
                            <Link className="nav-link" to="/productos">Productos</Link>
                            { rol() == "superadmin" && <Link className="nav-link" to="/usuarios">Usuarios</Link>  }
                            <Link className="nav-link" to="/salir">Logout</Link>
                        </Activity>
                        <Activity mode={!auth?.usuario ? "visible" : "hidden"} >
                            <Link className="nav-link" to="/login">Login</Link>
                            <Link className="nav-link" to="/register">Registro</Link>
                        </Activity>
                    </div>
                </div>
            </div>
        </nav>
    )
}
