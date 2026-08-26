import { createServer } from "http"
import alumnos from "./data/alumnos.js"                  // export default
import { createPage, createList, createListPersonajes } from "./page/utils.js" // export
import { readFile } from "fs/promises"

const server = createServer((request, response) => {
    console.log(request.url)
    switch (request.url) {
        case "/":
            response.end(createPage("Home", "Victor"))
            break
        case "/materia":
            response.end(createPage("Materia", "La materia es Aplicaciones Hibridas"))
            break
        case "/profesor":
            response.end(createPage("Profesor", "Hola! Victor Villafañe"))
            break
        case "/pagina":
            readFile("./public/index.html", "utf-8")
                .then(data => response.end(data))
                .catch(err => response.end(createPage("404", "Pagina no encontrada")))
            break
        case "/contact":
            readFile("./public/contact.html", "utf-8")
                .then(data => response.end(data))
                .catch(err => response.end(createPage("404", "Pagina no encontrada")))
            break
        case "/style.css":
            readFile("./public/style.css", "utf-8")
                .then(data => response.end(data))
                .catch(err => response.end(createPage("404", "Pagina no encontrada")))
            break
        case "/personajes":
            readFile("./data/characters.json", "utf-8")
                .then(data => {
                    const personajes = JSON.parse(data)
                    response.end(createPage("personajes", createListPersonajes(personajes)))
                })
                .catch(err => response.end(createPage("404", "Pagina no encontrada")))
            break
        case "/alumnos":
            response.end(createPage("Alumnos", createList(alumnos)))
            break
        case "/favicon.ico":
            readFile("./public/icono.png")
                .then(data => response.end(data))
                .catch(err => response.end(""))
            break
        case "/foca":
            readFile("./public/icono.png")
                .then(data => response.end(data))
                .catch(err => response.end(""))
            break
        default:
            response.end(createPage("404", "Pagina no encontrada"))
            break
    }
})

server.listen("2026")