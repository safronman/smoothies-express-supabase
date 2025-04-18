import { Router } from "express"
import {
  createSmoothie,
  deleteSmoothie,
  getAllSmoothies,
  getSmoothieById,
  updateSmoothie,
} from "../controllers/smoothiesController"

const router = Router()

router.get("/", getAllSmoothies)
router.get("/:id", getSmoothieById)
router.post("/", createSmoothie)
router.put("/:id", updateSmoothie)
router.delete("/:id", deleteSmoothie)

export default router
