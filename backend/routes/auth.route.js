import express from 'express'

import { protectRoute } from '../middleware/auth.middleware.js'

import { signup, login, logout, refreshToken, profile } from '../controllers/user.controller.js'



const router = express.Router()



router.get('/profile', protectRoute, profile)
router.post('/signup', signup)
router.post('/logout', logout)
router.post('/login', login)
router.get('/refresh-token', protectRoute, refreshToken)

export default router