import express from 'express'

import { protectRoute } from '../middleware/auth.middleware.js'

import { signup, login, logout, refreshToken, profile, changePassword, addShippingAddress, getShippingAddress, getOrder, getUserOders, getWishlist, toggleProductToWishlist, deleteUser, EditProfile } from '../controllers/user.controller.js'



const router = express.Router()




router.get('/address', protectRoute, getShippingAddress)
router.get('/order', protectRoute, getUserOders)
router.get('/wishlist', protectRoute, getWishlist)


router.post('/signup', signup)
router.post('/change-password', protectRoute, changePassword)
router.post('/logout', logout)
router.post('/login', login)
router.patch('/address', protectRoute, addShippingAddress)

router.put('/', protectRoute, EditProfile)



router.patch("/wishlist/:id", protectRoute, toggleProductToWishlist )


router.get('/refresh-token', refreshToken)



router.get('/order/:id', protectRoute, getOrder)


router.get('/', protectRoute, profile)

router.delete('/', protectRoute, deleteUser)


export default router