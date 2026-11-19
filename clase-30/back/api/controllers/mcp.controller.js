import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js"
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js"
import { z } from "zod"
import * as movieService from "../../services/movies.service.js"

const respuestaMcp = (datos, isError = false) => ({
    content: [{ type: "text", text: JSON.stringify(datos) }],
    isError
})

function crearServidorMcp() {
    const server = new McpServer({
        name: "mcp-peliculas",
        version: "1.0.0",
        description: "Servidor de ejemplo para el modelo de peliculas"
    })

    server.registerTool(
        "obtener_peliculas",
        {
            description: "Obtiene las peliculas de la base de datos, con filtros opcionales por idioma, año, titulo y paginacion",
            inputSchema: {
                language: z.string().optional(),
                min_year: z.number().int().optional(),
                max_year: z.number().int().optional(),
                title: z.string().optional(),
                page: z.number().int().min(1).optional(),
                limit: z.number().int().min(1).optional(),
            }
        },
        async (filtros) => {
            try {
                const peliculas = await movieService.getPeliculas({
                    ...filtros,
                    min_year: filtros.min_year?.toString(),   // year se guarda como string en la base
                    max_year: filtros.max_year?.toString(),
                })
                return respuestaMcp(peliculas)
            } catch (error) {
                return respuestaMcp({ error: error.message }, true)
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
                const pelicula = await movieService.getPeliculaByTitle(id)
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
                const pelicula = await movieService.guardarPelicula(datos)
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
                const pelicula = await movieService.eliminarPeliculaLogico(id)
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
                const pelicula = await movieService.eliminarPeliculaFisico(id)
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
                const pelicula = await movieService.savePeliculaReview(id, usuario)
                return respuestaMcp(pelicula)
            } catch (error) {
                return respuestaMcp({ error: error.message }, true)
            }
        }
    )

    return server
}

export async function handleMcp(req, res) {
    const server = crearServidorMcp()
    const transport = new StreamableHTTPServerTransport({
        sessionIdGenerator: undefined
    })

    try {
        await server.connect(transport)
        await transport.handleRequest(req, res, req.body)
        res.on("close", () => {
            transport.close()
            server.close()
        })
    } catch (error) {
        res.status(500).json({ error: "Error al conectar con el servidor MCP" })
    }
}

export function metodoNoPermitido(req, res) {
    res.status(400).json({ error: "Metodo no permitido" })
}
