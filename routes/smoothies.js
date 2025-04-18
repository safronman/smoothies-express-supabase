import express from "express"
import {
  getAllSmoothies,
  getSmoothieById,
  createSmoothie,
  updateSmoothie,
  deleteSmoothie,
} from "../controllers/smoothiesController.js"

const router = express.Router()

router.get("/", getAllSmoothies)
router.get("/:id", getSmoothieById)
router.post("/", createSmoothie)
router.put("/:id", updateSmoothie)
router.delete("/:id", deleteSmoothie)

export default router
