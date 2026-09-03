import express from "express"
import peliculasRoute from "./routes/movies.route.js"
import peliculasApiRoute from "./api/routes/movies.route.js"

const app = express()

app.use("/", express.static("public"))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(peliculasRoute)
app.use(peliculasApiRoute)

app.listen(2026, () => console.log("Funcionando... en http://localhost:2026"))