import express from "express"
import { signUpUser, signInUser, signOutUser } from "../controllers/authController.js"

const router = express.Router()

router.post("/signup", signUpUser)
router.post("/signin", signInUser)
router.post("/signout", signOutUser)

export default router
