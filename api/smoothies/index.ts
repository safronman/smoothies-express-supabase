// import { VercelRequest, VercelResponse } from "@vercel/node"
// import { TABLES } from "../../constants/constants"
// import { withCors } from "../../lib/cors"
// import { supabase } from "../../lib/supabase"
//
// async function handler(req: VercelRequest, res: VercelResponse) {
//   if (req.method === "GET") {
//     const { data, error } = await supabase.from(TABLES.smoothies).select().order("id", { ascending: false })
//     if (error) return res.status(500).json({ error: error.message })
//     return res.status(200).json(data)
//   }
//
//   if (req.method === "POST") {
//     const { title, method, rating } = req.body
//     const { data, error } = await supabase.from(TABLES.smoothies).insert({ title, method, rating }).select().single()
//     if (error) return res.status(500).json({ error: error.message })
//     return res.status(201).json(data)
//   }
//
//   res.status(405).json({ error: "Method not allowed" })
// }
//
// export default withCors(handler)
