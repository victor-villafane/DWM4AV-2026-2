const http = require("http")

const alumnos = [
    {
        id: 1,
        nombre: "Juan Perez",
        nota: 9
    },
    {
        id: 2,
        nombre: "Pedro Perez",
        nota: 8
    },
    {
        id: 3,
        nombre: "Homero Simpson",
        nota: 7
    }
]

const server = http.createServer((request, response) => {
    response.write("<!DOCTYPE html><html lang='en'><head><meta charset='UTF-8'><title>Document</title></head><body>")
    response.write("<h1>Mi espectacular pagina web</h1>")
    switch (request.url) {
        case "/":
            response.write("Mi nombre y apellido")
            break
        case "/materia":
            response.write("La materia es Aplicaciones Hibridas")
            break
        case "/profesor":
            response.write("Hola! Victor Villafañe")
            break
        case "/alumnos":
            response.write("<ul>")
            alumnos.forEach(alumno => response.write("<li>Nombre: " + alumno.nombre + " Nota: " + alumno.nota + "</li>"))
            response.write("</ul>")
            break
        default:
            response.write("No se que responder")
            break
    }
    response.end("</body></html>")
})

server.listen("2026")