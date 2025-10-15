import User from '../models/user.model.js'
import Order from '../models/order.model.js'
import Product from '../models/products.model.js'
import { generateToken, setCookies, getStoredToken } from '../utils/generateToken.js'



export const signup = async(req, res) =>{
  
  const { name, email, password } = req.body
  
  try {
    
    if(!name || !email || !password){
      return res.status(400).json({ 
        success: false,
        message: "All fields are required",
      })
    }
    
    if(password.length < 6){
      return res.status(400).json({ 
        success: false,
        message: "Password must be at least 6 characters",
      })
    }
    
    const userExist = await User.findOne({ email })
    
    if(userExist){
      return res.status(400).json({ 
        success: false,
        message: "User already exist",
      })
    }
    
    
    
    const user = await User.create({ name, email, password })
    
    //authenicate user
    const { accessToken, refreshToken } = generateToken(user._id)
    
   //await storeRefreshToken(user._id, refreshToken)
   
   setCookies(res, accessToken, refreshToken)
  
    
    
    console.log("User created successfully")
    
    res.status(200).json({ 
        success: true,
        message: "User created successfully",
       
    })
    
  } catch (error) {
    console.error("Error in signup contoller", error.message);
    res.status(400).json({ 
      success: false,
      message: error.message
    })
  }
  
  
}

export const login = async(req, res) =>{
  
  const { email, password } = req.body
  
  try {
    const user = await User.findOne({ email })
  
    if(user && (await user.comparePassword(password))) {
      
      
      const { accessToken, refreshToken } = generateToken(user._id)
      
      //await storeRefreshToken(user._id, refreshToken)
      
      setCookies(res, accessToken, refreshToken)
  
    
    
      console.log("User login successfully")
    
      res.status(200).json({ 
        
        id: user._id,
        name: user.name,
        email: user.email,
        cartItems: user.cartItems,
        role: user.role,
        wishlist: user.wishlist,
        createdAt: user.createdAt,
        shippingAddress: user.shippingAddress,
      })
    } else {
      return res.status(400).json({ message: "Incorrect email or password"})
    }
  } catch (error) {
    console.error("Error in login contoller", error.message);
    res.status(400).json({ 
      success: false,
      message: error.message
    })
  }
}

export const profile = async(req, res) =>{
  
  
  try {
   
  
    const user = await User.findById(req.user._id).select("-password")
    
    if(!user){
      return res.status(404).json({ message: "User not found" })
    }

    //console.log(user)
  
    res.status(200).json(user)
    
  } catch (error) {
    console.error("Error in get profile contoller", error.message);
    res.status(400).json({ 
      success: false,
      message: error.message
    })
  }
}

export const changePassword = async(req, res) =>{


  try {

    const { oldPassword, newPassword } = req.body

    const user = await User.findById(req.user._id)

    if(!user){
      return res.status(404).json({ message: "User not found" })
    }

    const isMatch = await user.comparePassword(oldPassword)

    if(!isMatch){
      return res.status(400).json({ message: "old password is incorrect" })
    }

    user.password = newPassword

    await user.save()
    console.log("password changed")

    res.status(200).json({ message: "User password changed successfully" })

  } catch (error) {
    console.error("Error in changepassword contoller", error.message);
    res.status(400).json({ 
      success: false,
      message: error.message
    })
  }
}

export const EditProfile = async(req, res) =>{
  try {
    
    const { name, email } = req.body

    const user = await User.findById(req.user._id).select("-password")

    if(!user){
      return res.status(404).json({ message: "User not found" })
    }

    user.name = name
    user.email = email

    await user.save()
    console.log("user profile edited successfully")
    res.json(user)


  } catch (error) {
    console.error("Error in editprofile contoller", error.message);
    res.status(400).json({ 
      success: false,
      message: error.message
    })
  }
}

export const deleteUser = async(req, res) =>{
  try {
    const user = await User.findById(req.user._id)

    if(!user){
      return res.status(404).json({ message: "User not found" })
    }

    await User.findByIdAndDelete(req.user._id)

    console.log("user deleted successfully")

    res.json({ message: "user deleted successsfully"})
  } catch (error) {
    console.error("Error in delete user  contoller", error.message);
    res.status(400).json({ 
      success: false,
      message: error.message
    })
  }
}

export const logout = async(req, res) =>{
  try {
    //await delCookies(req)
    
    res.clearCookie("access_token")
    res.clearCookie("refresh_token")
    
    console.log("user logout successfully")
    res.status(200).json({ message: "user logout successfully" })
  } catch (error) {
    console.error("Error in logout contoller", error.message);
    res.status(500).json({ message: error.message })
  }
}

export const refreshToken = async(req, res) =>{
  
  try {
    
    const accessToken = await getStoredToken(req, res)

      res.cookie("access_token", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 15 * 60 * 1000,
    })
    
    
    res.json({ message: "Token refreshed successfully"})
    
    console.log("Token refreshed successfully")
    
  } catch (error) {
    
    console.error("Error in refresh token contoller", error.message);
    res.status(500).json({ message: error.message })
  }
}

export const addShippingAddress = async(req, res) =>{

  try {
    const { address } = req.body

    const user = await User.findById(req.user._id)

    if(!user){
      return res.status(404).json({ message: "User not found" })
    }

    user.shippingAddress = address

    await user.save()
    console.log("address saved")

    res.json({ shippingAddress: user.shippingAddress })



  } catch (error) {
    console.error("Error in addShippingAdress contoller", error.message);
    res.status(400).json({ 
      success: false,
      message: error.message
    })
  }
}

export const getShippingAddress = async(req, res)=> {

  try {
    const user = await User.findById(req.user._id)

    if(!user){
      return res.status(404).json({ message: "User not found" })


    }

    res.json({ shippingAddress: user.shippingAddress })
  } catch (error) {

    console.error("Error in getshippingaddress contoller", error.message);
    res.status(400).json({ 
      success: false,
      message: error.message
    })
    
  }

}

export const getUserOders = async(req, res) =>{

  try {
    const user = await User.findById(req.user._id)

    if(!user){
      return res.status(404).json({ message: "User not found" })

    }

    const userOrders = await Order.find({ user: user._id }).sort({ timestamp: -1 }).limit(5)

    res.json(userOrders)

  } catch (error) {
    console.error("Error in getUsersOrder contoller", error.message);
    res.status(400).json({ 
      success: false,
      message: error.message
    })
  }


}

export const getOrder = async(req, res) =>{
  try {

    const { id } = req.params
    const user = await User.findById(req.user._id)

    if(!user){
      return res.status(404).json({ message: "User not found" })

    }

    const order = await Order.findById(id)
    res.json(order)
  } catch (error) {
    
  }
}

export const toggleProductToWishlist = async (req, res) =>{

  try {

    const productId = req.params.id
    const id = req.user._id

    const user = await User.findById(id).select("-password")

    if(!user){
      return res.status(404).json({ message: "user not found" })
    }

    const product = await Product.findById(productId)
    if(!product){
      return res.status(404).json({ message: "Products not found" })
    }
   

    const index = user.wishlist.find((item) => item.id === productId)

    //console.log("index", index)

    if(index){

      user.wishlist = user.wishlist.filter((item) => item._id.toString() !== productId)
      
     
    } else {
      user.wishlist.push(productId)
     
      
    }

    await user.save()
    await user.populate("wishlist")

  

    res.json(user.wishlist)
  
    

  } catch (error) {
    console.error("Error in toggleProductToWishlist contoller", error.message);
    res.status(500).json({ message: error.message })
  }
 
}

export const getWishlist = async(req, res) =>{
  try {
    const user = await User.findById(req.user._id)

    if(!user){
      return res.status(404).json({ message: "User not found" })

    }

    const products = await Product.find({ _id: {$in: req.user.wishlist } })
    
    const wishlistItems = products.map((product) =>{
      const item = req.user.wishlist.find((item) => item.id === product.id)
      
      return { ...product.toJSON() }
    })

    res.json(wishlistItems)
  } catch (error) {
    console.error("Error in get wishlist contoller", error.message);
    res.status(400).json({ 
      success: false,
      message: error.message
    })
  }
}
