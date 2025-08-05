import express from 'express'

import { addToCart, RemoveFromCart, updateQuantity, getCart } from '../controllers/cart.controller.js'

import { protectRoute, adminRoute } from '../middleware/auth.middleware.js'



const router = express.Router()

router.get("/", protectRoute, getCart)
router.post("/", protectRoute, addToCart)
router.delete("/", protectRoute, RemoveFromCart)
router.put("/:id", protectRoute, updateQuantity)





export default router