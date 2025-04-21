import { Router } from "express"
import { requireAuth } from "../common/requireAuth"
import {
  createSmoothie,
  deleteSmoothie,
  getAllSmoothies,
  getMySmoothies,
  getSmoothieById,
  updateSmoothie,
} from "../controllers/smoothiesController"

const router = Router()

// 🔓 Публичный эндпоинт
router.get("/public", getAllSmoothies)

// 🔐 Только для авторизованных
router.use(requireAuth)

router.get("/my", requireAuth, getMySmoothies)
router.get("/:id", requireAuth, getSmoothieById)
router.post("/", requireAuth, createSmoothie)
router.put("/:id", requireAuth, updateSmoothie)
router.delete("/:id", requireAuth, deleteSmoothie)

export default router
