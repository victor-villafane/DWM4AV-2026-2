const http = require("http")

const alumnos = [
    "Juan Perez",
    "Pedro Perez",
    "Homero Simpson"
]

const server = http.createServer( (request, response) => {
    console.log(request.url)
    // if( request.url == "/materia" ){
    //     response.write("La materia es Aplicaciones Hibridas")
    // }else if( request.url == "/hola" ){
    //     response.write("Hola!")
    // } else{
    //     response.write("No se que responder")
    // }
    response.write("<!DOCTYPE html><html lang='en'><head><meta charset='UTF-8'><title>Document</title></head><body>")
    switch( request.url ){
        case "/materia":
            response.write("La materia es Aplicaciones Hibridas")
            break
        case "/hola":
            response.write("Hola! Victor Villafañe")
            break
        case "/alumnos":
            response.write("<ul>")
            alumnos.forEach( alumno => response.write("<li>" + alumno +"</li>") )
            response.write("</ul>")
            break
        default:
            response.write("No se que responder")
            break
    }
    response.end("</body></html>")
} )

server.listen("2026")