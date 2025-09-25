import Coupon from '../models/coupon.model.js'

function generateRandomCode(length = 10) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters.charAt(randomIndex);
    }
    
    return result;
}


export const getCoupon = async(req, res) =>{
  
  try {
    const coupon = await Coupon.findOne({ user: req.user._id, isActive: true })
    //console.log(coupon.code)
    res.json({ coupon: coupon.code, discountPercent: coupon.discountPercent })
  } catch (error) {
    console.error("Error in getCoupon contoller", error.message);
    res.status(500).json({ message: error.message })
  }
}

export const validateCoupon = async(req, res) =>{
  
  try {
    const { code } = req.body
    const coupon = await Coupon.findOne({ code: code, user: req.user._id, isActive: true })
    if(!coupon){
      return res.status(404).json({ message: "coupon not found" })
    }
    
    if(coupon.expire < new Date()){
      coupon.isActive = false
      await coupon.save()
      return res.status(404).json({ message: "coupon expired" })
    }

    res.json({
      message: "coupon validated",
      code: coupon.code,
      discountPercent: coupon.discountPercent,
    })

  } catch (error) {
    console.error("Error in validateCoupon controller", error.message);
    res.status(500).json({ message: error.message })
  }
  
  
}

export const createCoupon = async(req, res)=>{
  try {
  
    
    const randomCode = generateRandomCode()

    const user = req.user

    const isUserCoupon = await Coupon.findOne({ user: user._id, isActive: true })

    if(isUserCoupon){
      return res.json(isUserCoupon)
    }

    
    const newCoupon = await Coupon.create({
      code: randomCode,
      discountPercent: 10,
      expire: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000),
      user: user._id
    })

   // console.log(newCoupon)
    res.json({
      coupon: newCoupon.code,
      discountPercent: newCoupon.discountPercent,
      expire: newCoupon.expire

    })
    
    
    
  
    
  
    
  } catch (error) {
    console.error("Error in createCoupon controller", error.message);
    res.status(500).json({ message: error.message })
  }
}



