import type { User } from "@supabase/supabase-js"

export type Smoothie = {
  id: number
  title: string
  method: string
  rating: number
  user_id?: string // 👈 если хочешь использовать user_id в коде
}

// Расширяем тип Request у Express, чтобы использовать req.user
declare global {
  namespace Express {
    interface Request {
      user?: User
    }
  }
}
