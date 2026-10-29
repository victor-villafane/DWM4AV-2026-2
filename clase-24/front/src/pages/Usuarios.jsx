import React, { useEffect, useState } from 'react'
import { useApiUsuarios } from '../services/usuarios.service'

export default function Usuarios() {

    const [usuarios, setUsuarios] = useState()
    const [nuevoRol, setNuevoRol] = useState()
    const { getUsuarios, asignarRol } = useApiUsuarios()

    useEffect(() => {
        getUsuarios()
            .then(data => setUsuarios(data))
            .catch(err => console.log(err))
    }, [])

    const handleAsignar = async (usuario) => {
        const datos = { usuario: usuario, nuevoRol: nuevoRol }
        try {
            await asignarRol(datos)
            getUsuarios()
                .then(data => setUsuarios(data))
                .catch(err => console.log(err))
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='' >
            <h1>Listado de usuarios</h1>
            <table className='table striped mt-3' >
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nombre</th>
                        <th>Nombre de usuario</th>
                        <th>Email</th>
                        <th>Rol</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        usuarios?.map(usuario => (
                            <tr key={usuario._id} >
                                <td>{usuario._id}</td>
                                <td>{usuario.name}</td>
                                <td>{usuario.username}</td>
                                <td>{usuario.email}</td>
                                <td className='d-flex g-1' >
                                    <select
                                        className='form-select'
                                        name="rol"
                                        id="rol"
                                        defaultValue={usuario?.rol || "user"}
                                        onChange={(event) => setNuevoRol(event.target.value)}
                                    >
                                        <option value="user">
                                            user
                                        </option>
                                        <option value="admin">
                                            admin
                                        </option>
                                        <option value="superadmin">
                                            superadmin
                                        </option>
                                    </select>
                                    <button
                                        onClick={() => handleAsignar(usuario)}
                                        className='btn btn-outline-secondary' >
                                        Asignar
                                    </button>
                                    <button
                                        onClick={() => handleAsignar(usuario)}
                                        className='btn btn-outline-secondary' >
                                        reset
                                    </button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}
