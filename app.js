import express from "express"
import smoothiesRoutes from "./routes/smoothies.js"
import authRoutes from "./routes/auth.js"
import dotenv from "dotenv"

dotenv.config()

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

// Routes
app.use("/api/smoothies", smoothiesRoutes)
app.use("/api", authRoutes)

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`)
})
