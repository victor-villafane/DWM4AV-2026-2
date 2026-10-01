import React from 'react'

export default function Formulario({ handleGuardar }) {
    return (
        <form onSubmit={handleGuardar} className='d-flex gap-1 my-2' >
            <input
                className='form-control'
                placeholder='Ingresar nombre de la tarea'
                name='nombre'
            />
            <button type='submit' className='btn btn-outline-primary' >+</button>
        </form>
    )
}
