import "./common/types"
import dotenv from "dotenv"
import express, { type Application } from "express"
import { corsOptions } from "./common/corsOptions"
import authRoutes from "./routes/auth"
import smoothiesRoutes from "./routes/smoothies"
import cors from "cors"

dotenv.config()

const app: Application = express()
const port = process.env.PORT ? Number(process.env.PORT) : 3000

app.use(cors(corsOptions))
app.use(express.json())

// Routes
app.use("/api/smoothies", smoothiesRoutes)
app.use("/api", authRoutes)

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`)
})
