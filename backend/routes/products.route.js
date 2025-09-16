import express from 'express'

import { getAllProducts, getFeaturedProducts, createProduct, deleteProduct, getRecommendedProducts, getProductByCategory, toggleFeaturedProducts, updateProduct, getProduct, toggleProductToWishlist, getWishlist } from '../controllers/products.controller.js'
import { protectRoute, adminRoute } from '../middleware/auth.middleware.js'




const router = express.Router()


router.get("/", getAllProducts)
router.get("/featured", getFeaturedProducts)
router.get("/recommended", getRecommendedProducts)
router.get("/wishlist", protectRoute, getWishlist)


router.get("/category/:category", getProductByCategory)


router.post("/", protectRoute, adminRoute, createProduct)

router.patch("/wishlist/:id", protectRoute, toggleProductToWishlist )

router.patch("/:id", protectRoute, adminRoute, toggleFeaturedProducts )

router.put("/:id", protectRoute, adminRoute, updateProduct)
router.delete("/:id", protectRoute, adminRoute, deleteProduct)



router.get("/:id", getProduct)







export default router