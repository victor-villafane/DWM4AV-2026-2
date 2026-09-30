import React from 'react'
import { useState } from 'react'
import Titulo from './components/Titulo'
import Table from './components/Table'
import Error from './components/Error'
import Formulario from './components/Formulario'

const tareasInit = [
  {
    "id": 1,
    "nombre": "Tarea 1",
    "completado": false
  },
  {
    "id": 2,
    "nombre": "Tarea 2",
    "completado": false
  },
  {
    "id": 3,
    "nombre": "Tarea 3",
    "completado": false
  }
]

export default function App() {

  const [tareas, setTareas] = useState(tareasInit)
  const [nombre, setNombre] = useState("")
  const [err, setErr] = useState("")

  const handleCompletar = (id) => {
    const tareasActualizadas = tareas.map(tarea => {
      if (tarea.id == id) {
        tarea.completado = !tarea.completado
      }
      return tarea
    })
    setTareas(tareasActualizadas)
  }

  const handleEliminar = (id) => {
    const tareasActualizadas = tareas.filter(tarea => tarea.id != id)
    setTareas(tareasActualizadas)
  }

  const handleGuardar = (event) => {
    event.preventDefault()

    setErr("")
    if (event.target.nombre.value.length < 3) {
      setErr("El nombre debe tener mas de 3 caracteres")
      return
    }

    const tareasActualizadas = [...tareas]
    tareasActualizadas.push(
      {
        id: tareasActualizadas.length + 1,
        nombre: event.target.nombre.value,
        completado: false
      }
    )
    setTareas(tareasActualizadas)
  }

  const handleKey = (event) => {
    if (event.key == "Enter")
      handleGuardar()
  }

  return (
    <div className='container-fluid' >
      <Titulo texto="Listado de tareas" className="text-danger" />
      <Formulario
        handleGuardar={handleGuardar}
        setNombre={setNombre}
        handleKey={handleKey}
      />
      <Error err={err} />
      <Table
        tareas={tareas}
        handleEliminar={handleEliminar}
        handleCompletar={handleCompletar}
      />
    </div>
  )
}
