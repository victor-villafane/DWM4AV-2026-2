const http = require("http")
const alumnos = require("./data/alumnos.js")
const page = require("./page/utils.js")

const server = http.createServer((request, response) => {
    switch (request.url) {
        case "/":
            response.end(page.createPage("Home", "Victor"))
            break
        case "/materia":
            response.end(page.createPage("Materia", "La materia es Aplicaciones Hibridas"))
            break
        case "/profesor":
            response.end(page.createPage("Profesor", "Hola! Victor Villafañe"))
            break
        case "/alumnos":
            response.end(page.createPage("Alumnos", page.createList(alumnos)) )
            break
        default:
            response.end(page.createPage("404", "Pagina no encontrada"))
            break
    }
})

server.listen("2026")