
import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import cors from 'cors'

import path from 'path'

import { connectDb } from './db/connectDb.js'
import authRoutes from './routes/auth.route.js'
import productRoutes from './routes/products.route.js'
import cartRoutes from './routes/cart.route.js'
import paymentRoutes from './routes/payment.route.js'
import analyticsRoutes from './routes/analytics.route.js'
import couponRoutes from './routes/coupon.route.js'
import reviewRoutes from './routes/review.routes.js'
import { sanitizer } from './middleware/sanitizer.js'
import { test } from './test.js'


dotenv.config()

const app = express()

const Port = process.env.PORT || 5500

const __dirname = path.resolve()

app.use(express.json({ limit: '20mb' }))
app.use(cookieParser())
app.use(cors())
app.use(sanitizer)


app.use('/api/auth', authRoutes)
app.use('/api/product', productRoutes)
app.use('/api/cart', cartRoutes)
app.use('/api/payment', paymentRoutes)
app.use('/api/coupon', couponRoutes)
app.use('/api/analytics', analyticsRoutes)
app.use('/api/review', reviewRoutes)



app.post('/test', test)

if(process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")))

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"))
  })
}


app.listen(Port, () =>{
  connectDb()
  console.log(`server running on port ${Port}`)
})


