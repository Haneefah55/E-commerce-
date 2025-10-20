import express from 'express'

import { getAllProducts, getFeaturedProducts, createProduct, deleteProduct, getRecommendedProducts, getProductByCategory, toggleFeaturedProducts, updateProduct, getProduct, getOfferProducts, toggleOfferProducts, getRelatedProducts, categoryCount, searchProduct, getShopProducts } from '../controllers/products.controller.js'
import { protectRoute, adminRoute } from '../middleware/auth.middleware.js'




const router = express.Router()


router.get("/", getAllProducts)


router.get("/shop", getShopProducts)



router.get("/featured", getFeaturedProducts)
router.get("/offer", getOfferProducts)
router.get("/recommended", getRecommendedProducts)
router.get("/category/count", categoryCount )



router.get("/search", searchProduct )



router.get("/category/:category", getProductByCategory)


router.post("/", protectRoute, adminRoute, createProduct)



router.patch("/featured/:id", protectRoute, adminRoute, toggleFeaturedProducts )

router.patch("/offer/:id", protectRoute, adminRoute, toggleOfferProducts )

router.put("/:id", protectRoute, adminRoute, updateProduct)
router.delete("/:id", protectRoute, adminRoute, deleteProduct)



router.get("/:id", getProduct)


router.get("/related/:category", getRelatedProducts)







export default router