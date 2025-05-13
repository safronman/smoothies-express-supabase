import { fetchSmoothies } from "../common/fetchSmoothies"
import { supabase } from "../common/supabaseClient"
import { handleError } from "../common/handleError"
import { Request, Response } from "express"

/**
 * @openapi
 * /smoothies:
 *   get:
 *     summary: Get all smoothies
 *     tags:
 *       - Smoothies
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: string
 *       - in: query
 *         name: limit
 *         schema:
 *           type: string
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of smoothies
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalCount:
 *                   type: integer
 *                   example: 25
 *                 page:
 *                   type: integer
 *                   example: 1
 *                 limit:
 *                   type: integer
 *                   example: 10
 *                 smoothies:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Smoothie'
 */
export const getAllSmoothies = async (req: Request, res: Response) => {
  const { page, limit, search } = req.query

  const { data, count, error } = await fetchSmoothies({
    page: page as string,
    limit: limit as string,
    search: search as string,
  })

  if (error) return handleError(res, error)

  res.json({
    totalCount: count ?? 0,
    page: parseInt((page as string) || "1", 10),
    limit: parseInt((limit as string) || "10", 10),
    smoothies: data,
  })
}

/**
 * @openapi
 * /smoothies/my:
 *   get:
 *     summary: Get smoothies created by the logged-in user
 *     tags:
 *       - Smoothies
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: string
 *       - in: query
 *         name: limit
 *         schema:
 *           type: string
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of user smoothies
 *       401:
 *         description: Unauthorized
 */
export const getMySmoothies = async (req: Request, res: Response) => {
  const user = req.user
  if (!user) return res.status(401).json({ error: "Unauthorized" })

  const { page, limit, search } = req.query

  const { data, count, error } = await fetchSmoothies({
    userId: user.id,
    page: page as string,
    limit: limit as string,
    search: search as string,
  })

  if (error) return handleError(res, error)

  res.json({
    totalCount: count ?? 0,
    page: parseInt((page as string) || "1", 10),
    limit: parseInt((limit as string) || "10", 10),
    smoothies: data,
  })
}

/**
 * @openapi
 * /smoothies/{id}:
 *   get:
 *     summary: Get a smoothie by ID
 *     tags:
 *       - Smoothies
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Smoothie found
 *       404:
 *         description: Smoothie not found
 */
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

/**
 * @openapi
 * /smoothies:
 *   post:
 *     summary: Create a new smoothie
 *     tags:
 *       - Smoothies
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SmoothieInput'
 *     responses:
 *       201:
 *         description: Smoothie created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Smoothie'
 */
export const createSmoothie = async (req: Request, res: Response) => {
  const MAX_SMOOTHIES_COUNT = 50

  const { title, method, rating } = req.body
  const user = req.user

  if (!title || !method || !rating) {
    return res.status(400).json({ error: "Missing required fields" })
  }

  // Проверяем количество смузи, созданных пользователем
  const { count, error: countError } = await supabase
    .from("smoothies")
    .select("*", { count: "exact", head: true }) // head: true означает "не возвращать сами данные"
    .eq("user_id", user?.id)

  if (countError) {
    return handleError(res, countError)
  }

  if ((count ?? 0) >= MAX_SMOOTHIES_COUNT) {
    return res.status(403).json({ error: "You can only create up to 10 smoothies" })
  }

  // Создаём новый смузи
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

/**
 * @openapi
 * /smoothies/{id}:
 *   put:
 *     summary: Update a smoothie
 *     tags:
 *       - Smoothies
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - method
 *               - rating
 *             properties:
 *               title:
 *                 type: string
 *               method:
 *                 type: string
 *               rating:
 *                 type: number
 *     responses:
 *       200:
 *         description: Smoothie updated
 *       400:
 *         description: Missing required fields
 *       404:
 *         description: Smoothie not found or not updated
 */
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

/**
 * @openapi
 * /smoothies/{id}:
 *   delete:
 *     summary: Delete a smoothie
 *     tags:
 *       - Smoothies
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Smoothie deleted successfully
 *       404:
 *         description: Smoothie not found
 */
export const deleteSmoothie = async (req: Request, res: Response) => {
  const { id } = req.params

  const { error } = await supabase.from("smoothies").delete().eq("id", id)

  if (error) {
    return handleError(res, error)
  }

  res.status(200).send({ message: "Smoothie deleted successfully" })
}
