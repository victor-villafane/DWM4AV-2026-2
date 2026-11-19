import express from "express"
import peliculasRoute from "./routes/movies.route.js"
import peliculasApiRoute from "./api/routes/movies.route.js"
import usuariosApiRoute from "./api/routes/users.route.js"
import cors from "cors"
import dotenv from "dotenv"
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js"
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js"
import { getPeliculas, getPeliculaByTitle, guardarPelicula, eliminarPeliculaLogico, eliminarPeliculaFisico, savePeliculaReview } from "./services/movies.service.js"
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

const respuestaMcp = (datos, isError = false) => ({
    content: [{ type: "text", text: JSON.stringify(datos) }],
    isError
})

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

    server.registerTool(
        "obtener_pelicula",
        {
            description: "Obtiene el detalle de una pelicula por su id",
            inputSchema: {
                id: z.string(),
            }
        },
        async ({ id }) => {
            try {
                const pelicula = await getPeliculaByTitle(id)
                if (!pelicula) return respuestaMcp({ error: "La pelicula no existe" }, true)
                return respuestaMcp(pelicula)
            } catch (error) {
                return respuestaMcp({ error: error.message }, true)
            }
        }
    )

    server.registerTool(
        "crear_pelicula",
        {
            description: "Crea una pelicula en la base de datos",
            inputSchema: {
                title: z.string().min(3),
                country: z.string().min(3),
                language: z.string().min(3),
                primary_genre: z.string().min(3),
                production_scale: z.enum(["Commercial", "Independent"]),
                year: z.string(),
            }
        },
        async (datos) => {
            try {
                const pelicula = await guardarPelicula(datos)
                return respuestaMcp(pelicula)
            } catch (error) {
                return respuestaMcp({ error: error.message }, true)
            }
        }
    )

    server.registerTool(
        "eliminar_pelicula_logico",
        {
            description: "Marca una pelicula como eliminada sin borrarla de la base de datos",
            inputSchema: {
                id: z.string(),
            }
        },
        async ({ id }) => {
            try {
                const pelicula = await eliminarPeliculaLogico(id)
                if (!pelicula) return respuestaMcp({ error: "La pelicula no existe" }, true)
                return respuestaMcp(pelicula)
            } catch (error) {
                return respuestaMcp({ error: error.message }, true)
            }
        }
    )

    server.registerTool(
        "eliminar_pelicula_fisico",
        {
            description: "Elimina una pelicula de la base de datos de forma definitiva. No se puede deshacer",
            inputSchema: {
                id: z.string(),
            }
        },
        async ({ id }) => {
            try {
                const pelicula = await eliminarPeliculaFisico(id)
                if (!pelicula) return respuestaMcp({ error: "La pelicula no existe" }, true)
                return respuestaMcp(pelicula)
            } catch (error) {
                return respuestaMcp({ error: error.message }, true)
            }
        }
    )

    server.registerTool(
        "agregar_review",
        {
            description: "Agrega una reseña de un usuario a una pelicula",
            inputSchema: {
                id: z.string(),
                usuario: z.object({
                    _id: z.string(),
                    nombre: z.string().optional(),
                    email: z.string().optional(),
                    comentario: z.string().optional(),
                }),
            }
        },
        async ({ id, usuario }) => {
            try {
                const pelicula = await savePeliculaReview(id, usuario)
                return respuestaMcp(pelicula)
            } catch (error) {
                return respuestaMcp({ error: error.message }, true)
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