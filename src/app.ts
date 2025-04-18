import dotenv from "dotenv"
import express, { type Application } from "express"
import authRoutes from "./routes/auth"
import smoothiesRoutes from "./routes/smoothies"
import cors from "cors"

dotenv.config()

const app: Application = express()
const port = process.env.PORT ? Number(process.env.PORT) : 3000

const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:3001",
  "http://localhost:5173",
  "http://localhost:5174",
  "https://smoothies-express-supabase.onrender.com",
]

app.use(
  cors({
    origin: (origin, callback) => {
      // Разрешаем запросы без origin (например, Postman или curl)
      if (!origin) return callback(null, true)
      if (allowedOrigins.includes(origin)) {
        return callback(null, true)
      } else {
        return callback(new Error("Not allowed by CORS"))
      }
    },
    credentials: true,
  }),
)
app.use(express.json())

// Routes
app.use("/api/smoothies", smoothiesRoutes)
app.use("/api", authRoutes)

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`)
})
