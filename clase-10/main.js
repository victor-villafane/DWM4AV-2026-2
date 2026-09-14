import express from "express"
import peliculasRoute from "./routes/movies.route.js"
import peliculasApiRoute from "./api/routes/movies.route.js"
import { handleMcpRequest, mcpMethodNotAllowed } from "./mcp/movies.mcp.js"

const app = express()

app.use("/", express.static("public"))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(peliculasRoute)
app.use(peliculasApiRoute)

app.post("/mcp", handleMcpRequest)
app.get("/mcp", mcpMethodNotAllowed)
app.delete("/mcp", mcpMethodNotAllowed)

const PORT = process.env.PORT || 2026
app.listen(PORT, "0.0.0.0", () => {
    console.log(`Funcionando... en http://localhost:${PORT}`)
})