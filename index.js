import express from "express"
import dotenv from "dotenv"
import { createClient } from "@supabase/supabase-js"

dotenv.config()

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)

// Получить все смузи
app.get(`/api/smoothies`, async (req, res) => {
  const { data, error } = await supabase.from("smoothies").select().order("id", { ascending: false })

  if (error) {
    console.error(error)
    return res.status(500).json({ error: error.message })
  }

  res.json(data)
})

// Получить один смузи по id
app.get("/api/smoothies/:id", async (req, res) => {
  const { id } = req.params

  const { data, error } = await supabase.from("smoothies").select().eq("id", id).limit(1)

  if (error) {
    console.error(error)
    return res.status(500).json({ error: error.message })
  }

  if (!data) {
    return res.status(404).json({ error: "Smoothie not found" })
  }

  res.json(data)
})

// Создать смузи
app.post("/api/smoothies", async (req, res) => {
  const { title, method, rating } = req.body

  if (!title || !method || rating === undefined) {
    return res.status(400).json({ error: "Missing required fields" })
  }

  const { data, error } = await supabase.from("smoothies").insert([{ title, method, rating }]).select().single()

  if (error) {
    console.error(error)
    return res.status(500).json({ error: error.message })
  }

  res.status(201).json(data)
})

// Обновить смузи
app.put("/api/smoothies/:id", async (req, res) => {
  const { id } = req.params
  const { title, method, rating } = req.body

  const { data, error } = await supabase
    .from("smoothies")
    .update({ title, method, rating })
    .eq("id", id)
    .select()
    .single()

  if (error) {
    console.error(error)
    return res.status(500).json({ error: error.message })
  }

  if (!data) {
    return res.status(404).json({ error: "Smoothie not found or not updated" })
  }

  res.json(data)
})

// Удалить смузи
app.delete("/api/smoothies/:id", async (req, res) => {
  const { id } = req.params

  const { error } = await supabase.from("smoothies").delete().eq("id", id)

  if (error) {
    console.error(error)
    return res.status(500).json({ error: error.message })
  }

  res.status(200).send({ message: "Smoothie deleted successfully" })
})

// Регистрация нового пользователя
app.post("/api/signup", async (req, res) => {
  const { email, password } = req.body

  if (!email || !password === undefined) {
    return res.status(400).json({ error: "Missing required fields" })
  }

  const { data, error } = await supabase.auth.signUp({ email, password })

  if (error) {
    console.error(error)
    return res.status(500).json({ error: error.message })
  }

  res.status(201).json(data)
})

// Логинизация
app.post("/api/signin", async (req, res) => {
  const { email, password } = req.body

  if (!email || !password === undefined) {
    return res.status(400).json({ error: "Missing required fields" })
  }

  const { error } = await supabase.auth.signInWithPassword({ email, password })

  if (error) {
    console.error(error)
    return res.status(500).json({ error: error.message })
  }

  res.status(200).json("Вы успешно залогинились")
})

// Логаут
app.post("/api/signout", async (req, res) => {
  const { error } = await supabase.auth.signOut()

  if (error) {
    console.error(error)
    return res.status(500).json({ error: error.message })
  }

  res.status(200).json("Вы успешно вылогинились")
})

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`)
})
