import express from 'express'

import { getAllProducts, getFeaturedProducts, createProduct, deleteProduct, getRecommendedProducts, getProductByCategory, toggleFeaturedProducts } from '../controllers/products.controller.js'
import { protectRoute, adminRoute } from '../middleware/auth.middleware.js'




const router = express.Router()


router.get("/", getAllProducts)
router.get("/featured", getFeaturedProducts)
router.get("/recommended", getRecommendedProducts)
router.get("/category/:category", getProductByCategory)
router.post("/", protectRoute, adminRoute, createProduct)
router.patch("/id", protectRoute, adminRoute, toggleFeaturedProducts )
router.delete("/", protectRoute, adminRoute, deleteProduct)





export default router