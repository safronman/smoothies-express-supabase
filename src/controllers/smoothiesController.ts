import { supabase } from "../common/supabaseClient"
import { handleError } from "../common/handleError"
import { Request, Response } from "express"

export const getAllSmoothies = async (req: Request, res: Response) => {
  const { data, error } = await supabase.from("smoothies").select().order("id", { ascending: false })

  if (error) {
    return handleError(res, error)
  }

  res.json(data)
}

export const getMySmoothies = async (req: Request, res: Response) => {
  const user = req.user

  if (!user) {
    return res.status(401).json({ error: "Unauthorized" })
  }

  const { data, error } = await supabase
    .from("smoothies")
    .select()
    .eq("user_id", user?.id)
    .order("id", { ascending: false })

  if (error) {
    return handleError(res, error)
  }

  res.json(data)
}

export const getSmoothieById = async (req: Request, res: Response) => {
  const { id } = req.params
  const { data, error } = await supabase.from("smoothies").select().eq("id", id).limit(1)

  if (error) {
    return handleError(res, error)
  }

  if (!data || data.length === 0) {
    return res.status(404).json({ error: "Smoothie not found" })
  }

  res.json(data[0])
}

export const createSmoothie = async (req: Request, res: Response) => {
  const { title, method, rating } = req.body
  const user = req.user

  if (!title || !method || !rating) {
    return res.status(400).json({ error: "Missing required fields" })
  }

  const { data, error } = await supabase
    .from("smoothies")
    .insert([{ title, method, rating, user_id: user?.id }])
    .select()
    .single()

  if (error) {
    return handleError(res, error)
  }

  res.status(201).json(data)
}

export const updateSmoothie = async (req: Request, res: Response) => {
  const { id } = req.params
  const { title, method, rating } = req.body

  if (!title || !method || !rating) {
    return res.status(400).json({ error: "Missing required fields" })
  }

  const { data, error } = await supabase
    .from("smoothies")
    .update({ title, method, rating })
    .eq("id", id)
    .select()
    .single()

  if (error) {
    return handleError(res, error)
  }

  if (!data) {
    return res.status(404).json({ error: "Smoothie not found or not updated" })
  }

  res.json(data)
}

export const deleteSmoothie = async (req: Request, res: Response) => {
  const { id } = req.params

  const { error } = await supabase.from("smoothies").delete().eq("id", id)

  if (error) {
    return handleError(res, error)
  }

  res.status(200).send({ message: "Smoothie deleted successfully" })
}
