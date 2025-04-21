import { Router } from "express"
import { requireAuth } from "../common/requireAuth"
import {
  createSmoothie,
  deleteSmoothie,
  getAllSmoothies,
  getSmoothieById,
  updateSmoothie,
} from "../controllers/smoothiesController"

const router = Router()

router.use(requireAuth) // защита всех маршрутов

router.get("/", getAllSmoothies)
router.get("/:id", getSmoothieById)
router.post("/", createSmoothie)
router.put("/:id", updateSmoothie)
router.delete("/:id", deleteSmoothie)

export default router
