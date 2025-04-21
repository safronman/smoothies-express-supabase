import { Request, Response, NextFunction } from "express"
import { supabase } from "./supabaseClient"

export const requireAuth = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.replace("Bearer ", "")

  if (!token) {
    res.status(401).json({ error: "No token provided" })
    return
  }

  const { data, error } = await supabase.auth.getUser(token)

  if (error || !data?.user) {
    res.status(401).json({ error: "Invalid or expired token" })
    return
  }

  req.user = data.user
  next()
}
