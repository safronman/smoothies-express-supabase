import { Request, Response } from "express"

/**
 * @openapi
 * /api/health:
 *   get:
 *     summary: Check if the server is running
 *     tags:
 *       - Health
 *     security: []
 *     responses:
 *       200:
 *         description: Server is up and running
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: ok
 */
export const healthCheck = (_req: Request, res: Response) => {
  res.status(200).json({ status: "ok" })
}
