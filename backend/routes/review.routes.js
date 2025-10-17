import express from 'express'

import { createReview, getReviews } from "../controllers/review.controller.js";



import { protectRoute, adminRoute } from '../middleware/auth.middleware.js'
import { createProductReview, getProductReview } from '../controllers/products.controller.js';



const router = express.Router()

router.get('/', getReviews)

router.post('/', protectRoute, createReview)
router.post('/product/:id', protectRoute, createProductReview)




router.get('/product/:id', getProductReview)





export default router