import {Router} from "express"
import authenticate from "../middleware/authenticate.js"
import * as reviewControllers from "../controllers/review.js"

const router = Router()

// registered users
router.put("/books/:id/reviews", reviewControllers.addReview)
router.delete("/books/reviews", reviewControllers.deleteReview)
router.post("/books/modify", reviewControllers.modifyReview)

// general users
router.get("/books/:id/reviews", reviewControllers.getReview)

export default router
