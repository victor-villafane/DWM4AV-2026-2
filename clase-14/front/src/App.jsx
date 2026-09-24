import "./App.css"
import { useState } from "react"

export default function App() {
  const mensaje = "Hola soy un mensaje"
  // const personajes = [
  //   "Homero",
  //   "Marge",
  //   "Lisa",
  //   "Bart",
  //   "Maggie"
  // ]
  const personajes = [
    {
      nombre: "Homero",
      completado: false
    },
    {
      nombre: "Marge",
      completado: false
    },
    {
      nombre: "Lisa",
      completado: false
    },
    {
      nombre: "Bart",
      completado: true
    },
    {
      nombre: "Maggie",
      completado: false
    }
  ]
  const [personajesEstado, setPersonajesEstado] = useState(personajes)
  // console.log( useState() )
  const [contador, setContador] = useState(0)
  const [nombre, setNombre] = useState("")
  const [err, setErr] = useState("")

  const handleClick = () => {
    // setContador(contador + 1)
    // console.log(contador)
    setErr("")
    if( nombre.length < 3 ){
      setErr("Debe tener mas de 3 caracteres")
      return
    }
    const personajeAux = [...personajesEstado]
    personajeAux.push( { nombre: nombre, completado: false } )
    // setPersonajesEstado(personajeAux)
    setPersonajesEstado( [...personajesEstado, { nombre: nombre, completado: false } ] )
  }

  const handleCompletado = (indice) => {
    // evento.target.style.color = "green"
    // console.log(evento.target)
    // evento.target.className = "verde"
    console.log(indice)
    const personajeAux = [...personajesEstado]
    personajeAux[indice].completado = true
    setPersonajesEstado(personajeAux)
    // console.log(personajesEstado)
  }
  // 1. Necesito un input
  // 2. Necesito un estado para guardar el valor del input
  // 3. Necesito un boton para agregar el nuevo personaje

  const handleChange = (event) => setNombre(event.target.value)

  return (
    <div>
      <div>
        <div>
          {/* <span> {contador} </span> */}
          <input type="text" onChange={ handleChange }/>
          <button onClick={handleClick} >Agregar</button>
          {err}
        </div>
      </div>
      <ul>
        {/* v-for="(personaje, indice) in personajes" */}
        {
          personajesEstado.map((personaje, indice) =>
            <li
              className={personaje?.completado ? "verde" : "rojo"}
              key={indice}
              onClick={() => handleCompletado(indice)}
            >
              {personaje.nombre}
            </li>
          )
        }
      </ul>

    </div>
  )
}