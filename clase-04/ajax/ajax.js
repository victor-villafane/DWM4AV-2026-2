
function promesaPizza() {
    const promesaPizza = new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("Preparando Pizza 🍕")
            const ok = true // Resultado de la preparacion

            if (ok) {
                resolve("🍕 Pizza Lista!")
            } else {
                reject("🍕 Pizza quemada")
            }
        }, 2000)
    })

    return promesaPizza
}
function promesaIngredientes() {
    const promesaIngredientes = new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("Comprando ingredientes")
            const ok = false // Resultado de la preparacion

            if (ok) {
                resolve("🍕 Comprado!")
            } else {
                reject("Me faltan cosas")
            }
        }, 1000)
    })
    return promesaIngredientes
}

// console.log("1.")
// promesaIngredientes
//     .then( mensaje => {
//         console.log(mensaje)
//         promesaPizza
//             .then((resultadoOK) => {
//                 console.log(resultadoOK)
//             })
//             .catch(err => console.log(err))
//     } )
//     .catch( err => console.log(err) )
// promesaIngredientes
//     .then( mensaje => {
//         console.log(mensaje)
//         return promesaPizza
//     } )
//     .then( resultadoOK => console.log(resultadoOK) )
//     .catch( err => console.log(err) )

// async function prepararPizza() {
//     try {        
//         const mensaje = await promesaIngredientes()
//         console.log(mensaje)
//         const resultadoOK = await promesaPizza()
//         console.log(resultadoOK)
//     } catch (error) {
//         console.log(error)
//     }
// }
// prepararPizza()
// console.log("3.")
// console.log("4.")

// function promesaMuyPesada(){
//     return new Promise( (resolve, reject) => {
//         for( let i = 0; i < 100000000000 ; i++ ){}
//         resolve("OK")
//     } )
// }
// Worker Threads
import { Worker } from "worker_threads"
// https://developer.mozilla.org/es/docs/Web/API/Worker -> navegador
// https://nodejs.org/api/worker_threads.html -> Node
function promesaMuyPesada(){
    return new Promise( (resolve, reject) => {
        const worker = new Worker("./ajax/workers.js")
        worker.on("message", (mensaje) => resolve("TODO BIEN")) //equivalente al then
        worker.on("error", error => reject("No salio bien"))
    } )
}


async function traerPersonajes(){
    try {
        console.log("1")
        const res = await fetch( "https://hp-api.onrender.com/api/characters" )
        console.log("2")
        promesaMuyPesada()
            .then( res => console.log(res) )
            .catch( err => console.log(err) )
        console.log("3")
        const personajes = await res.json()
        console.log("personajes")
    } catch (error) {
        console.log(error)
    }
}
traerPersonajes()