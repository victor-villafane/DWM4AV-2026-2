import express from "express"
import peliculasRoute from "./routes/movies.route.js"
import peliculasApiRoute from "./api/routes/movies.route.js"
import usuariosApiRoute from "./api/routes/users.route.js"
import cors from "cors"
import dotenv from "dotenv"
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js"
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js"
import { getPeliculas } from "./services/movies.service.js"
import { z } from "zod"
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

app.post( "/mcp", async (req, res) => { // Este es el endpoint para que el modelo conozca nuestras herramientas y pueda utilizarlas
    // Voy a definir el servidor MCP y le paso la información de las herramientas que quiero que el modelo conozca
    const server = new McpServer({
        name: "mcp-peliculas",      //Sin name no se puede inicializar el servidor
        version: "1.0.0",            //Sin version no se puede inicializar el servidor
        description: "Servidor de ejemplo para el modelo de peliculas"
    })

    // Voy a registrar las herramientas que quiero que el modelo conozca
    server.registerTool(
        "obtener_peliculas", // Nombre de la herramienta
        {
            description: "Obtiene las peliculas de la base de datos, con filtros opcionales por idioma, año, titulo y paginacion", // Descripción de la herramienta
            inputSchema:{
                language: z.string().optional(),
                min_year: z.number().int().optional(),
                max_year: z.number().int().optional(),
                title: z.string().optional(),
                page: z.number().int().min(1).optional(),
                limit: z.number().int().min(1).optional(),
            }
        },
        async (filtros) => {
            // Esta es la función que se ejecutará cuando el modelo llame a la herramienta
            // Voy a obtener las peliculas de la base de datos aplicando los filtros recibidos
            try {
                const peliculas = await getPeliculas({
                    ...filtros,
                    min_year: filtros.min_year?.toString(),   // year se guarda como string en la base
                    max_year: filtros.max_year?.toString(),
                })
                return {        // Devuelvo las peliculas en formato JSON en el campo content para que el modelo pueda procesarlas
                    content: [{
                        type: "text",
                        text: JSON.stringify(peliculas)
                    }]
                }
            } catch (error) {
                res.status(500).json({error: "Error al obtener las peliculas"})
            }
        }
    )

    // Definir el adaptador para que el modelo pueda comunicarse con nuestro servidor MCP
    const trasport = new StreamableHTTPServerTransport({
        sessionIdGenerator: undefined
    })
    // para probar npx @modelcontextprotocol/inspector

    try {
        await server.connect(trasport)                      // Esto es para que el servidor MCP se conecte al adaptador y pueda recibir las peticiones del modelo
        await trasport.handleRequest(req, res, req.body)    // Esto es para que el adaptador maneje la petición del modelo y le devuelva la respuesta del servidor MCP
        res.on("close", () => {
            trasport.close() // Esto es para cerrar la conexión del adaptador cuando el modelo cierre la conexión
            server.close()    // Esto es para cerrar la conexión del servidor MCP cuando el modelo cierre la conexión
        })
    } catch (error) {
        res.status(500).json({error: "Error al conectar con el servidor MCP"})
    }
} )

app.get("/mcp", (req, res) => {
    res.status(400).json({error: "Metodo no permitido"})
} )

app.delete("/mcp", (req, res) => {
    res.status(400).json({error: "Metodo no permitido"})
} )


app.listen(2026, () => console.log("Funcionando... en http://localhost:2026"))