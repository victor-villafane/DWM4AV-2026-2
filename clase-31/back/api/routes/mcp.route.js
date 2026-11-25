import { Router } from "express"
import * as mcpController from "../controllers/mcp.controller.js"

const router = Router()

router.post("/mcp", mcpController.handleMcp)
router.get("/mcp", mcpController.metodoNoPermitido)
router.delete("/mcp", mcpController.metodoNoPermitido)

export default router
