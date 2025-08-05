import jwt from 'jsonwebtoken'
import { redis } from '../utils/redis.js'

export const generateToken = (userId) =>{
  
  const accessToken = jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15m" })
  
  const refreshToken = jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "7d" })
  
  
  return { accessToken, refreshToken }
}

export const storeRefreshToken = async(userId, token) =>{
  await redis.set(`refreshToken: ${userId}`, token, "EX", 7 * 24 * 60 * 60)
}

export const setCookies = (res, accessToken, refreshToken) =>{
  
  res.cookie("access_token", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 15 * 60 * 1000,
  })
  
  res.cookie("refresh_token", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  })
  

}

export const delCookies = async(req) =>{
  
  const refreshToken = req.cookies.refresh_token
    if(refreshToken){
      const decode = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET)
      await redis.del(`refreshToken: ${decode.userId}`)
    }
} 

export const getStoredToken = async(req, res) =>{
  const refreshToken = req.cookies.refresh_token
  
    if(!refreshToken){
      return res.status(400).json({ message: "No refresh token" })
    }
    
  const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET)
  
  const storedToken = await redis.get(`refreshToken: ${decoded.userId}`)
  
  if(storedToken !== refreshToken){
    return res.status(400).json({ message: "Invalid refresh token" })
  }
  
  const accessToken = jwt.sign({ userId: decoded.userId }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15m" })
  
  res.cookie("access_token", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 15 * 60 * 1000,
  })
  
  
}