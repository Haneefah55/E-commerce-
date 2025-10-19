import paystack from '../utils/paystack.js'
import Coupon from '../models/coupon.model.js'
import Order from '../models/order.model.js'
import Product from '../models/products.model.js'
import axios from 'axios'
import { configDotenv } from 'dotenv'

configDotenv()


axios.defaults.withCredentials = true

function generateRandomCode(length = 10) {
    const characters = '0123456789';
    let result = '';
    
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters.charAt(randomIndex);
    }
    
    return result;
}

export const initializePayment = async(req, res) =>{
  
  try {
    const { amount, coupon } = req.body

    const user = req.user

    const total = amount * 100

    const randomCode = generateRandomCode()
    


  
    
    if(coupon){
      await Coupon.findOneAndUpdate({ code: coupon, user: user._id }, { isActive: false })
      console.log("coupon deleted")
    }

    

    

    const response = await paystack.transaction.initialize({ 
      email: user.email,
      amount: total,
      metadata: {
        totalAmount: total,
        orderId: randomCode,
    
        
      },
    })



    console.log(response.data)
    res.json(response.data)
  } catch (error) {
    console.error("Error in initializePayment contoller", error.message);
    res.status(500).json({ message: error.message })
  }
}
  
export const verifyPayment = async(req, res) =>{

    
  try {

    const user = req.user
    const cart = user.cartItems
    
    const { reference } = req.params

    if(!reference) {
      console.log("no reference")
      res.json({ message: "no reference"})
    }
    
    //console.log("ref", reference)
    //console.log("secret ket", process.env.PAYSTACK_SECRET_KEY)

    const response = await axios.get(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          'Authorization': `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        },
        timeout: 15000, // 15 second timeout
      }
    );

    console.log("verify response", response.data)
    console.log("status text", response.statusText)


    const products = await Product.find({ _id: {$in: req.user.cartItems } })
    
    const cartItems = products.map((product) =>{
      const item = user.cartItems.find((cartItem) => cartItem.id === product.id)
      
      return { ...product.toJSON(), quantity: item.quantity }
    })

    if(response.statusText === 'OK') {
      const metadata = response.data.data.metadata
      
      console.log("metadata", metadata)
      //delete coupon code
     
      
      // create a new order
      console.log("cart items", cartItems)


      const newOrder = new Order({
        user: user._id,
        products: cartItems.map((product) =>({
          product: product._id,
          name: product.name,
          category: product.category,
          image: product.image,
          quantity: product.quantity,
          price: product.price,
        })),
        paymentRef: response.data.data.reference,
        totalAmount: metadata.totalAmount,
        deliveryDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)
        
        
      })
      
      await newOrder.save()
      console.log("new order", newOrder)
      res.status(200).json({
        success: true,
        message: "Payment successful, order created",
        orderId: newOrder._id,
        
        
      })
    } else {
      res.status(200).json({
        success: false,
        message: "Payment cancelled, order not created",
      })
    }
  } catch (error) {
    console.error("Error in verifyPayment controller", error.message);
    res.status(500).json({ message: error.message })
  }
}
  
