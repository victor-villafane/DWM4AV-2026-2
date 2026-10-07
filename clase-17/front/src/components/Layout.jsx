import React from 'react'
import { Link, Outlet } from 'react-router'

export default function Layout() {
    return (
        <div className='container-fluid' >
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/listado">Monedas</Link></li>
                    <li><Link to="/contact">Contacto</Link></li>
                </ul>
            </nav>
            <Outlet />
        </div>
    )
}
