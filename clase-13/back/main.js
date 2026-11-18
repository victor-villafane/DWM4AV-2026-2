import express from "express"
import peliculasRoute from "./routes/movies.route.js"
import peliculasApiRoute from "./api/routes/movies.route.js"
import usuariosApiRoute from "./api/routes/users.route.js"

import dotenv from "dotenv"

// Variables de entorno
dotenv.config()

const app = express()

app.use("/", express.static("public"))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(peliculasRoute)
app.use(peliculasApiRoute)
app.use(usuariosApiRoute)

app.listen(2026, () => console.log("Funcionando... en http://localhost:2026"))