import express from "express"
import authRoutes from "../src/routes/auth"
import smoothiesRoutes from "../src/routes/smoothies"
import healthRoutes from "../src/routes/health"
import cors from "cors"
import { corsOptions } from "../src/common/corsOptions"
import { setupSwagger } from "../src/docs/swagger"

const app = express()

app.use(cors(corsOptions))
app.use(express.json())

setupSwagger(app)

app.use("/api/", authRoutes)
app.use("/api/smoothies", smoothiesRoutes)
app.use("/api", healthRoutes)

export default app
