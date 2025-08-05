import express from 'express'

import { signup, login, logout, refreshToken } from '../controllers/user.controller.js'



const router = express.Router()



router.post('/signup', signup)
router.post('/logout', logout)
router.post('/login', login)
router.get('/refresh-token', refreshToken)

export default router