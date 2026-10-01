import React from 'react'

export default function Table({ tareas, handleCompletar, handleEliminar }) {
    return (
        <table className='mt-2 table table-striped' >
            <thead>
                <tr>
                    <th>#</th>
                    <th>Nombre</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {
                    tareas.map((tarea) => (
                        <tr key={tarea.id} className={`${tarea.completado ? "text-decoration-line-through" : ""}`} >
                            <td>{tarea.id}</td>
                            <td>{tarea.nombre}</td>
                            <td>
                                <button
                                    className='btn btn-warning mx-1'
                                    onClick={() => handleCompletar(tarea.id)}
                                >
                                    Completar
                                </button>
                                <button
                                    className='btn btn-outline-danger mx-1'
                                    onClick={() => handleEliminar(tarea.id)}
                                >
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    )
}
