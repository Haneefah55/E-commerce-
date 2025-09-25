import express from 'express'

import { protectRoute } from '../middleware/auth.middleware.js'

import { signup, login, logout, refreshToken, profile, changePassword, addShippingAddress, getShippingAddress, getOrder, getUserOders } from '../controllers/user.controller.js'



const router = express.Router()



router.get('/profile', protectRoute, profile)
router.get('/address', protectRoute, getShippingAddress)
router.get('/order', protectRoute, getUserOders)


router.post('/signup', signup)
router.post('/change-password', protectRoute, changePassword)
router.post('/logout', logout)
router.post('/login', login)
router.patch('/address', protectRoute, addShippingAddress)


router.get('/refresh-token', protectRoute, refreshToken)

router.get('/order/:id', protectRoute, getOrder)


export default router