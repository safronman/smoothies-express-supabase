import { Request, Response } from "express"
import { handleError } from "../common/handleError"
import { supabase } from "../common/supabaseClient"

export const signUpUser = async (req: Request, res: Response) => {
  const { email, password, firstName } = req.body

  if (!email || !password) {
    return res.status(400).json({ error: "Missing required fields" })
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        first_name: firstName,
      },
    },
  })

  if (error) {
    return handleError(res, error)
  }

  res.status(201).json({
    message: "Регистрация прошла успешно",
    user: {
      id: data.user?.id,
      email: data.user?.email,
      firstName: data.user?.user_metadata.first_name,
    },
  })
}

export const signInUser = async (req: Request, res: Response) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ error: "Missing required fields" })
  }

  const { data, error } = await supabase.auth.signInWithPassword({ email, password })

  if (error) {
    return handleError(res, error)
  }

  res.status(200).json({
    message: "Вы успешно залогинились",
    access_token: data.session?.access_token,
    user: {
      email: data.user?.email,
      lastSignInAt: data.user?.last_sign_in_at,
      firstName: data.user?.user_metadata.first_name,
    },
  })
}

export const signOutUser = async (req: Request, res: Response) => {
  const { error } = await supabase.auth.signOut()

  if (error) {
    return handleError(res, error)
  }

  res.status(200).json({ message: "Вы успешно вылогинились" })
}
