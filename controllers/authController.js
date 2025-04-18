import { supabase } from "../supabaseClient.js"

export const signUpUser = async (req, res) => {
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

export const signInUser = async (req, res) => {
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

export const signOutUser = async (req, res) => {
  const { error } = await supabase.auth.signOut()

  if (error) {
    return handleError(res, error)
  }

  res.status(200).json({ message: "Вы успешно вылогинились" })
}
