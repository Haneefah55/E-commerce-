
import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'


import { connectDb } from './db/connectDb.js'
import authRoutes from './routes/auth.route.js'
import productRoutes from './routes/products.route.js'
import cartRoutes from './routes/cart.route.js'
import paymentRoutes from './routes/payment.route.js'
import analyticsRoutes from './routes/analytics.route.js'
import couponRoutes from './routes/coupon.route.js'


dotenv.config()

const app = express()

const Port = process.env.PORT || 5500

app.use(express.json())
app.use(cookieParser())

app.use('/api/auth', authRoutes)
app.use('/api/product', productRoutes)
app.use('/api/cart', cartRoutes)
app.use('/api/payment', paymentRoutes)
app.use('/api/coupon', couponRoutes)
app.use('/api/analytics', analyticsRoutes)




app.listen(Port, () =>{
  connectDb()
  console.log(`server running on port ${Port}`)
})


