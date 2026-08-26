import express from "express"
import { readFile } from "fs/promises"
import { createPage, createList } from "./page/utils.js"
const app = express()

app.use("/", express.static("public"))
app.use(express.urlencoded({ extended: true }))

app.get("/peliculas", async (req, res) => {
    try {
        const peliculas = JSON.parse(await readFile("./data/peliculas.json", "utf-8"))
        // console.log(peliculas.length)
        res.send(createPage("Peliculas", createList(peliculas)))
    } catch (error) {
        res.send(createPage("404", "Pagina no encontrada"))
    }
})

app.get("/peliculas/:title", async(req, res) => {
    try {
        const title = req.params.title
        const peliculas = JSON.parse(await readFile("./data/peliculas.json", "utf-8"))
        const pelicula = peliculas.find( (pelicula) => pelicula.title == title )
        let html = `<p>Año de estreno: ${pelicula.year}</p>`
        html += `<p>Genero: ${pelicula.primary_genre}</p>`
        html += `<p>Pais: ${pelicula.country}</p>`
        html += `<p>Idioma: ${pelicula.language}</p>`
        html += `<p>Produccion: ${pelicula.production_scale}</p>`
        html += "<a href='/peliculas' >Volver</a>"
        res.send(createPage( pelicula.title, html ))
    } catch (error) {
        res.send(createPage("404", "Pagina no encontrada"))
    }
})

app.get("/procesar", (req, res) => {
    console.log(req.query.nombre)
    res.send("ok")
})

app.post("/procesar", (req, res) => {
    console.log(req.body.nombre)
    res.send("ok")
})

app.get("/producto/:idProducto", (req, res) => {
    console.log(req.params.idProducto)
    res.send("ok")
})

app.listen(2026, () => console.log("Funcionando..."))