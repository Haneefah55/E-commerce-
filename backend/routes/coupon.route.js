import express from 'express'

import { getCoupon, createCoupon, validateCoupon } from '../controllers/coupon.controller.js'
import { protectRoute, adminRoute } from '../middleware/auth.middleware.js'


const router = express.Router()

router.get("/", protectRoute, getCoupon)
router.get("/", protectRoute, createCoupon)
router.post("/validate", protectRoute,  validateCoupon)




export default router