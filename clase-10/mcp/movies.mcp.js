import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js"
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js"
import * as z from "zod/v4"
import * as movieService from "../services/movies.service.js"

function result(data) {
    return {
        content: [{ type: "text", text: JSON.stringify(data) }]
    }
}

function errorResult(error) {
    return {
        isError: true,
        content: [{
            type: "text",
            text: error instanceof Error ? error.message : String(error)
        }]
    }
}

function createMoviesMcpServer() {
    const server = new McpServer({
        name: "clase-10-peliculas",
        version: "1.0.0"
    })

    server.registerTool(
        "listar_peliculas",
        {
            description: "Lista películas activas con filtros opcionales por título, idioma y año",
            inputSchema: {
                title: z.string().optional().describe("Texto a buscar en el título"),
                language: z.string().optional().describe("Idioma exacto"),
                min_year: z.number().int().optional().describe("Año mínimo"),
                max_year: z.number().int().optional().describe("Año máximo"),
                page: z.number().int().min(1).optional().describe("Número de página"),
                limit: z.number().int().min(1).max(100).optional().describe("Cantidad por página")
            }
        },
        async filtros => {
            try {
                return result(await movieService.getPeliculas(filtros))
            } catch (error) {
                return errorResult(error)
            }
        }
    )

    server.registerTool(
        "obtener_pelicula",
        {
            description: "Obtiene una película por su ID de MongoDB",
            inputSchema: {
                id: z.string().min(1).describe("ID de MongoDB de la película")
            }
        },
        async ({ id }) => {
            try {
                const pelicula = await movieService.getPeliculaByTitle(id)
                return pelicula ? result(pelicula) : errorResult("Película no encontrada")
            } catch (error) {
                return errorResult(error)
            }
        }
    )

    return server
}

export async function handleMcpRequest(req, res) {
    const server = createMoviesMcpServer()
    const transport = new StreamableHTTPServerTransport({
        sessionIdGenerator: undefined
    })

    try {
        await server.connect(transport)
        await transport.handleRequest(req, res, req.body)
        res.on("close", () => {
            void transport.close()
            void server.close()
        })
    } catch (error) {
        console.error("Error handling MCP request:", error)
        if (!res.headersSent) {
            res.status(500).json({
                jsonrpc: "2.0",
                error: { code: -32603, message: "Internal server error" },
                id: null
            })
        }
    }
}

export function mcpMethodNotAllowed(req, res) {
    res.status(405).json({
        jsonrpc: "2.0",
        error: { code: -32000, message: "Method not allowed" },
        id: null
    })
}
