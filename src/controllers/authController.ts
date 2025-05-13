import { Request, Response } from "express"
import { handleError } from "../common/handleError"
import { supabase } from "../common/supabaseClient"

/**
 * @openapi
 * /api/signup:
 *   post:
 *     summary: Register a new user
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *               - firstName
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 example: securepassword123
 *               firstName:
 *                 type: string
 *                 example: John
 *     responses:
 *       201:
 *         description: User successfully registered
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     email:
 *                       type: string
 *                     firstName:
 *                       type: string
 *       400:
 *         description: Missing required fields
 */
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

/**
 * @openapi
 * /api/signin:
 *   post:
 *     summary: Login a user
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: test6@test.com
 *               password:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       200:
 *         description: Successfully logged in
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 access_token:
 *                   type: string
 *                   example: your-jwt-token-here
 *                 user:
 *                   type: object
 *                   properties:
 *                     email:
 *                       type: string
 *                     firstName:
 *                       type: string
 *       400:
 *         description: Missing required fields
 */
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
    user: { email: data.user?.email, firstName: data.user?.user_metadata.first_name },
  })
}

/**
 * @openapi
 * /api/signout:
 *   post:
 *     summary: Log out current user
 *     tags:
 *       - Auth
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully logged out
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       401:
 *         description: Unauthorized
 */
export const signOutUser = async (req: Request, res: Response) => {
  const { error } = await supabase.auth.signOut()

  if (error) {
    return handleError(res, error)
  }

  res.status(200).json({ message: "Вы успешно вылогинились" })
}

/**
 * @openapi
 * /api/me:
 *   get:
 *     summary: Get the currently authenticated user
 *     tags:
 *       - Auth
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User data or null
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   oneOf:
 *                     - type: "null"
 *                     - type: object
 *                       properties:
 *                         email:
 *                           type: string
 *                         firstName:
 *                           type: string
 */
export const getCurrentUser = async (req: Request, res: Response) => {
  const authHeader = req.headers.authorization
  console.log(authHeader)

  if (!authHeader || !authHeader.startsWith("Bearer ") || authHeader.startsWith("Bearer null")) {
    return res.status(200).json({ user: null })
  }

  const token = authHeader.split(" ")[1]

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser(token)

  if (error) {
    return handleError(res, error)
  }

  if (!user) {
    return res.status(200).json({ user: null })
  }

  res.status(200).json({
    user: { email: user.email, firstName: user.user_metadata?.first_name },
  })
}
