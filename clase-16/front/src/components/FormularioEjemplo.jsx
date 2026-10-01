import React from 'react'

export default function Formulario({ setNombre, handleGuardar, handleKey }) {
    return (
        <div className='d-flex gap-1 my-2' >
            <input
                onChange={(event) => setNombre(event.target.value)}
                onKeyDown={handleKey}
                className='form-control'
                placeholder='Ingresar nombre de la tarea'
            />
            <button onClick={handleGuardar} className='btn btn-outline-primary' >+</button>
        </div>
    )
}
