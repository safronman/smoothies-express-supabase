import { Router } from "express"
import { getCurrentUser, signInUser, signOutUser, signUpUser } from "../controllers/authController"

const router = Router()

router.post("/signup", signUpUser)
router.post("/signin", signInUser)
router.post("/signout", signOutUser)
router.get("/me", getCurrentUser)
export default router
