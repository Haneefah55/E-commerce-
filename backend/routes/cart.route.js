import express from 'express'

import { addToCart, RemoveFromCart, updateQuantity, getCart, clearCart } from '../controllers/cart.controller.js'

import { protectRoute, adminRoute } from '../middleware/auth.middleware.js'



const router = express.Router()

router.get("/", protectRoute, getCart)

router.post("/", protectRoute, addToCart)

router.patch("/", protectRoute, clearCart)



router.put("/:id", protectRoute, updateQuantity)

router.delete("/", protectRoute, RemoveFromCart)





export default router