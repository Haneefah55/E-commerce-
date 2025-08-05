import Product from '../models/products.model.js'


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
  } catch (error) {
    console.error("Error in updateQuantity contoller", error.message);
    res.status(500).json({ message: error.message })
  }
}

export const getCart = async(req, res) =>{
  
  try{
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