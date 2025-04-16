// import { VercelRequest, VercelResponse } from "@vercel/node"
// import { TABLES } from "../../constants/constants"
// import { withCors } from "../../lib/cors"
// import { supabase } from "../../lib/supabase"
//
// async function handler(req: VercelRequest, res: VercelResponse) {
//   const { id } = req.query
//
//   if (!id || typeof id !== "string") {
//     return res.status(400).json({ error: "Invalid ID" })
//   }
//
//   if (req.method === "GET") {
//     const { data, error } = await supabase.from(TABLES.smoothies).select().eq("id", id).single()
//     if (error) return res.status(500).json({ error: error.message })
//     return res.status(200).json(data)
//   }
//
//   if (req.method === "PUT") {
//     const { title, method, rating } = req.body
//     const { data, error } = await supabase
//       .from(TABLES.smoothies)
//       .update({ title, method, rating })
//       .eq("id", id)
//       .select()
//     if (error) return res.status(500).json({ error: error.message })
//     return res.status(200).json(data)
//   }
//
//   if (req.method === "DELETE") {
//     const { error } = await supabase.from(TABLES.smoothies).delete().eq("id", id)
//     if (error) return res.status(500).json({ error: error.message })
//     return res.status(204).end()
//   }
//
//   res.status(405).json({ error: "Method not allowed" })
// }
//
// export default withCors(handler)
