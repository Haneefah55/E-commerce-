import Product from '../models/products.model.js'
import User from '../models/user.model.js'



export const addToCart = async(req, res) =>{
  
  try {
    const { productId } = req.body
    const user = req.user
    
    const existingItem = user.cartItems.find((item) => item.id === productId)
    
    if(existingItem){
      existingItem.quantity += 1
    } else{
      user.cartItems.push(productId)
    }
    
    await user.save()
    //console.log("produc added to cart", user.cartItems)
    res.json(user.cartItems)
    
  } catch (error) {
    console.error("Error in addToCart contoller", error.message);
    res.status(500).json({ message: error.message })
  }
}

export const RemoveFromCart = async(req, res) =>{
  
  try {
    const { productId } = req.body
    const user  = req.user
    if(!productId){
      user.cartItems = []
    } else{
      user.cartItems = user.cartItems.filter((item) => item.id !== productId)
    }
    await user.save()
    console.log("product removed from cart")
    res.json(user.cartItems)
  } catch (error) {
    console.error("Error in RemoveFromCart contoller", error.message);
    res.status(500).json({ message: error.message })
  }
}

export const updateQuantity = async(req, res) =>{
  try {
    const { id: productId } = req.params
    const user = req.user
    const { quantity } = req.body
    
    const existItem = user.cartItems.find((item) => item.id === productId)
    
    if(existItem){
      if(quantity === 0){
        user.cartItems = user.cartItems.filter((item) => item.id !== productId)
        await user.save()
      }
      
      existItem.quantity = quantity
      await user.save()
      res.json(user.cartItems)
    } else {
      res.json({ message: "Product not found" })
    }

    console.log("product updated")
  } catch (error) {
    console.error("Error in updateQuantity contoller", error.message);
    res.status(500).json({ message: error.message })
  }
}

export const getCart = async(req, res) =>{
  
  try{
    const user = await User.findById(req.user._id)

    if(!user){
      return res.status(404).json({ message: "User not found" })
    }
    
    const products = await Product.find({ _id: {$in: req.user.cartItems } })
    
    const cartItems = products.map((product) =>{
      const item = req.user.cartItems.find((cartItem) => cartItem.id === product.id)
      
      return { ...product.toJSON(), quantity: item.quantity }
    })
    res.json(cartItems)
    
  } catch (error) {
    console.error("Error in getCart contoller", error.message);
    res.status(500).json({ message: error.message })
  }

}

export const clearCart = async(req, res) =>{
  try {
    const user = await User.findById(req.user._id)

    const items = user.cartItems

    if(!items || items.length === 0){
      return res.status(400).json({ message: "Cart is empty" })
    }

    const bulkOperation = items.map((item) => ({
      updateOne: {
        filter: { _id: item._id },
        update: { $inc: { stock: -item.quantity } }
      },
    }))


    const result = await Product.bulkWrite(bulkOperation)
   // console.log(`${result.modifiedCount}, product quantity updated`)

    //user.cartItems = []

    //await user.save()
    console.log("cart items deleted successfully")
    res.json({ message: "stock updated, cart items deleted successfully" })


  } catch (error) {
    console.error("Error in clearCart contoller", error.message);
    res.status(500).json({ message: error.message })
  }
}