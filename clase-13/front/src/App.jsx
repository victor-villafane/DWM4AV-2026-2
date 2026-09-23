// 1. Funtional Component -> rfc
// export default function App(){
//   // Logica
//   console.log("Todo el codigo js")
//   // UI
//   return <div>Hola!</div>
// }
// 2. Arrow Function Component -> rafce
// const App = () => {
//   // Logica
//   console.log("Arrow Function")
//   // UI
//   return <div>Hola!</div>
// }
// export default App -> rcc
// 3. Class Component
// import React from "react"
// export default class App extends React.Component{
//   // Metodos
//   render(){
//     // Logica
//     console.log("Hola desde la clase")
//     // UI
//     return <div></div>
//   }
// }
export default function App() {
  const mensaje = "Hola soy un mensaje"
  const personajes = [
    "Homero",
    "Marge",
    "Lisa",
    "Bart",
    "Maggie"
  ]
  return (
    <div>
      <div>
        <div>
          <span> {mensaje} </span>
        </div>
      </div>
      <ul>
        {/* v-for="(personaje, indice) in personajes" */}
        {
          personajes.map( (personaje, indice) => <li key={indice} >{ personaje }</li> )
        }
      </ul>
    </div>
  )
}
