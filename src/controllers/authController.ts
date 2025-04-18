import { Request, Response } from "express"
import { handleError } from "../common/handleError"
import { supabase } from "../common/supabaseClient"

export const signUpUser = async (req: Request, res: Response) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ error: "Missing required fields" })
  }

  const { data, error } = await supabase.auth.signUp({ email, password })

  if (error) {
    return handleError(res, error)
  }

  res.status(201).json(data)
}

export const signInUser = async (req: Request, res: Response) => {
  const { email, password } = req.body

  if (!email || !password === undefined) {
    return res.status(400).json({ error: "Missing required fields" })
  }

  const { error } = await supabase.auth.signInWithPassword({ email, password })

  if (error) {
    return handleError(res, error)
  }

  res.status(200).json({ message: "Вы успешно залогинились" })
}

export const signOutUser = async (req: Request, res: Response) => {
  const { error } = await supabase.auth.signOut()

  if (error) {
    return handleError(res, error)
  }

  res.status(200).json({ message: "Вы успешно вылогинились" })
}
