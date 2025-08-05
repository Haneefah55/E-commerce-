import paystack from '../utils/paystack.js'
import Coupon from '../models/coupon.model.js'
import Order from '../models/order.model.js'

export const initializePayment = async(req, res) =>{
  
  try {
    const { email, amount, coupon, products } = req.body
    if(!Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ error: "Invalid or empty product array "})
    }
    const response = await paystack.transaction.initialize({ 
      email,
      amount: amount * 100,
      metadata: {
        userId: req.user._id.toString(),
        couponCode: coupon,
        products: JSON.stringify(
          products.map((p) => ({
            id: p._id,
            quantity: p.quantity,
            price: p.price,
          }))
        ),
        totalAmount: amount,
        
      },
      callback_url: process.env.CLIENT_URL_SUCCESS,
    })
    
    console.log(response.data)
    res.json(response.data)
  } catch (error) {
    console.error("Error in initializePayment contoller", error.message);
    res.status(500).json({ message: error.message })
  }e
}
  
export const verifyPayment = async(req, res) =>{
    
  try {
    
    const reference = req.params.reference
    
    console.log(reference)
    const response = await paystack.transaction.verify({ reference })
    if(response.data.status === "success") {
      const metadata = response.data.metadata
      
      console.log(metadata)
      //delete coupon code
      await Coupon.findOneAndUpdate({ code: metadata.couponCode, user: metadata.userId }, { isActive: false })
      
      // create a new order
      const products = JSON.parse(metadata.products);
      const newOrder = new Order({
        user: metadata.userId,
        products: products.map((product) =>({
          product: product.id,
          quantity: product.quantity,
          price: product.price,
        })),
        totalAmount: metadata.amount,
        
      })
      
      await newOrder.save()
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
  
