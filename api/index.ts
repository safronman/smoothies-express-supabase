import express from "express"
import authRoutes from "../src/routes/auth"
import smoothiesRoutes from "../src/routes/smoothies"
import healthRoutes from "../src/routes/health"
import cors from "cors"
import { corsOptions } from "../src/common/corsOptions"

const app = express()

app.use(cors(corsOptions))
app.use(express.json())

app.use("/api/", authRoutes)
app.use("/api/smoothies", smoothiesRoutes)
app.use("/api", healthRoutes)

export default app
