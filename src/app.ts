import "./common/types"
import cors from "cors"
import dotenv from "dotenv"
import express from "express"
import { corsOptions } from "./common/corsOptions"
import { setupSwagger } from "./docs/swagger"
import authRoutes from "./routes/auth"
import smoothiesRoutes from "./routes/smoothies"

dotenv.config()

const app = express()
const port = process.env.PORT ? Number(process.env.PORT) : 3000

setupSwagger(app)

app.use(cors(corsOptions))
app.use(express.json())

// Routes
app.use("/api/smoothies", smoothiesRoutes)
app.use("/api", authRoutes)

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`)
})
