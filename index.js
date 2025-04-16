import express from "express"
import dotenv from "dotenv"
import { createClient } from "@supabase/supabase-js"

dotenv.config()

const app = express()
const port = process.env.PORT || 3000

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)

app.get(`/api/smoothies`, async (req, res) => {
  const { data, error } = await supabase.from("smoothies").select().order("id", { ascending: false })

  if (error) {
    console.error(error)
    return res.status(500).json({ error: error.message })
  }

  res.json(data)
})

app.get('/api/smoothies/:id', async (req, res) => {
  const { id } = req.params;

  const { data, error } = await supabase
    .from('smoothies')
    .select()
    .eq('id', id)
    .single();

  if (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }

  if (!data) {
    return res.status(404).json({ error: 'Smoothie not found' });
  }

  res.json(data);
});


app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`)
})
