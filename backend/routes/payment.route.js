import express from 'express'

import { initializePayment, verifyPayment } from '../controllers/payment.controller.js'

import { protectRoute, adminRoute } from '../middleware/auth.middleware.js'



const router = express.Router()

router.post("/initialize", protectRoute, initializePayment)
router.get("/verify/:reference", protectRoute, verifyPayment)




export default router