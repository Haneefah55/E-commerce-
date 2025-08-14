import User from '../models/user.model.js'
import { generateToken, storeRefreshToken, setCookies, delCookies, getStoredToken } from '../utils/generateToken.js'
import bcrypt from 'bcryptjs'


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
    const { accessToken, refreshToken } = await generateToken(user._id)
    
   await storeRefreshToken(user._id, refreshToken)
   
   setCookies(res, accessToken, refreshToken)
  
    
    
    console.log("User created successfully")
    
    res.status(200).json({ 
        success: true,
        message: "User created successfully",
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          cartItems: user.cartItems,
          role: user.role,
        }
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
      
      const { accessToken, refreshToken } = await generateToken(user._id)
      
      await storeRefreshToken(user._id, refreshToken)
      
      setCookies(res, accessToken, refreshToken)
  
    
    
      console.log("User login successfully")
    
      res.status(200).json({ 
        
        id: user._id,
        name: user.name,
        email: user.email,
        cartItems: user.cartItems,
        role: user.role,
        })
    } else {
      return res.status(401).json({ message: "Incorrect email or password"})
    }
  } catch (error) {
    console.error("Error in login contoller", error.message);
    res.status(400).json({ 
      success: false,
      message: error.message
    })
  }
}

export const logout = async(req, res) =>{
  try {
    await delCookies(req)
    
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
    
    await getStoredToken(req, res)
    
    res.json({ message: "Token refreshed successfully"})
    
    console.log("Token refreshed successfully")
    
  } catch (error) {
    
    console.error("Error in refresh token contoller", error.message);
    res.status(500).json({ message: error.message })
  }
}