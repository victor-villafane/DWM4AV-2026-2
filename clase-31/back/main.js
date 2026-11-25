import express from "express"
import peliculasRoute from "./routes/movies.route.js"
import peliculasApiRoute from "./api/routes/movies.route.js"
import usuariosApiRoute from "./api/routes/users.route.js"
import mcpApiRoute from "./api/routes/mcp.route.js"
import cors from "cors"
import dotenv from "dotenv"
import { Server } from "socket.io"
import { createServer } from "http"

// Variables de entorno
dotenv.config()

const app = express()

app.use(cors())
app.use("/", express.static("public"))
app.use("/uploads", express.static("uploads"))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(peliculasRoute)
app.use(peliculasApiRoute)
app.use(usuariosApiRoute)
app.use(mcpApiRoute)

const httpServer = createServer(app)

const io = new Server(httpServer, {
    cors:{
        origin: "*",
        methods: ["GET", "POST"]
    }
})
const usuariosConectados = []
io.on("connection", (socket) => {
    console.log("Nuevo cliente conectado")
    
    socket.on("unirme", (email) => {
        usuariosConectados[email] = socket.id
        io.emit("usuarios", Object.keys(usuariosConectados)) // Cuando yo envio el evento con socket.emit, solo lo recibe el socket que lo emitió. Para que lo reciban todos los sockets conectados, se usa io.emit
        console.log("Usuarios conectados: ", Object.keys(usuariosConectados))
    })
    
    socket.on("disconnect", () => {
        console.log("Cliente desconectado")
        console.log(socket.id)
        const email = Object.keys(usuariosConectados).find(email => usuariosConectados[email] === socket.id)
        if( email ) delete usuariosConectados[email]
    })

    socket.on( "nuevo", (mensaje) => {
        io.emit("mensaje", mensaje)
    } )
})

httpServer.listen(2026, () => console.log("Funcionando... en http://localhost:2026"))
