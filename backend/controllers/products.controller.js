import mongoose from 'mongoose'
import Product from '../models/products.model.js'
import User from '../models/user.model.js'
import cloudinary from '../utils/cloudinary.js'


export const getAllProducts = async(req, res) =>{
  
  try {
    const products = await Product.find({})
      //console.log(products)
    res.json(products)
  
  } catch (error) {
    console.error("Error in getAllProducts contoller", error.message);
    res.status(500).json({ message: error.message })
  }
  
  
}

export const getProduct = async (req, res) =>{

  try {
    const { id } = req.params

    const product = await Product.findById(id)
    res.status(200).json(product)
    

    
  } catch (error) {
    console.error("Error in getproduct contoller", error.message);
    res.status(500).json({ message: error.message })
  }
}
 
export const getFeaturedProducts = async(req, res) =>{
  try {
    const featuredProduct = await Product.find({ isFeatured: true })
    if(!featuredProduct){
      return res.status(404).json({ message: "No Featured Products found" })
    }
  
    res.json(featuredProduct)
  } catch (error) {
    console.error("Error in getFeaturedProducts contoller", error.message);
    res.status(500).json({ message: error.message })
  }
  
}

export const createProduct = async(req, res) =>{
  
  try {
    const { name, description, price, image, category, stock } = req.body
  
    let cloudinaryResponse = null
    if(image){
      cloudinaryResponse = await cloudinary.uploader.upload(image, { folder: "products" })
    
    }
    
    const product = await Product.create({ 
      name,
      description,
      price,
      image: cloudinaryResponse?.secure_url ? cloudinaryResponse.secure_url : "",
      category,
      stock
    })

    console.log("Product Created Succeefully")

    res.status(200).json({ product })

    
    
  } catch (error) {
    console.error("Error in createProduct contoller", error.message);
    res.status(500).json({ message: error.message })
  }
  
  
  
  
}

export const deleteProduct = async(req, res) =>{
  try {
    const { id } = req.params
    
    const product = await Product.findById(id)
    if(!product){
      return res.status(404).json({ message: "Products not found" })
    }
    
    if(product.image){
      const publicId = product.image.split("/").pop().split(".")[0]
      
      try {
        await cloudinary.uploader.destroy(`products/${publicId}`)
        console.log("product image deleted from cloudinary")
      } catch (error) {
        console.error("error deleting image from cloudinary", error);
      }
    }
    
    const response = await Product.findByIdAndDelete(id)

    res.status(200).json({ message: "product deleted succeessfully"  })


    console.log("product deleted succeessfully")
    
  } catch (error) {
    console.error("Error in deleteProduct contoller", error.message);
    res.status(500).json({ message: error.message })
  }
}

export const getRecommendedProducts = async(req, res) =>{
  
  try {
    const products = await Product.aggregate([
      
    {
      $sample: { size: 3 }
    },
    {
      $project: {
        _id: 1,
        name: 1,
        description: 1,
        image: 1,
        price: 1
      }
    }
      
    ])

    //console.log("recommenede products", products)
    res.json(products)
  } catch (error) {
    console.error("Error in getRecommendedProducts contoller", error.message);
    res.status(500).json({ message: error.message })
  }
}

export const getProductByCategory = async(req, res) =>{
  
  try {
    const { category } = req.params
    
    const products = await Product.find({ category })
    res.json(products)
    
  } catch (error) {
    console.error("Error in getProductByCategory contoller", error.message);
    res.status(500).json({ message: error.message })
  }
}

export const toggleFeaturedProducts = async(req, res) =>{
  
  try {
    const { id } = req.params
    
    const product = await Product.findById(id)
    if(!product){
      return res.status(404).json({ message: "Products not found" })
    }
    
    product.isFeatured = !product.isFeatured
    
    const updatedProduct = await product.save()
    res.json(updatedProduct)
    
  } catch (error) {
    console.error("Error in toggleFeaturedProducts contoller", error.message);
    res.status(500).json({ message: error.message })
  }
}

export const getWishlist = async (req, res) =>{

  try {

    //const id = req.user._id

    const user = await User.findById(req.user._id).populate("wishlist")

    if(!user){
      return res.status(404).json({ message: "user not found" })
    }

    return res.json(user.wishlist)
  } catch (error) {
    console.error("Error in getWishlist contoller", error.message);
    res.status(500).json({ message: error.message })
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


export const updateProduct = async(req, res) =>{

  try {

    const { id } = req.params
    const product = await Product.findById(id)

    const { name, description, price, image, category, stock } = req.body

  
          
    if(!product){

      return res.status(404).json({ message: "Products not found" })
    }
        
    let cloudinaryResponse = null

    if(image) {

      if(product.image){
        const publicId = product.image.split("/").pop().split(".")[0]
        
        try {
          await cloudinary.uploader.destroy(`products/${publicId}`)
          console.log("product previous image deleted from cloudinary")
        } catch (error) {
          console.error("error deleting image from cloudinary", error);
        }
      }

   

    
      cloudinaryResponse = await cloudinary.uploader.upload(image, { folder: "products" })


    }

    
    product.name = name ? name : product.name
    product.description = description ? description : product.description
    product.price = price ? price : product.price
    product.image = cloudinaryResponse?.secure_url ? cloudinaryResponse.secure_url : product.image
    product.category = category ? category : product.category
    product.stock = stock ? stock : product.stock

    await product.save()
    
    //console.log(product)
    console.log("Product updated Succeefully")

    res.status(200).json(product)
  } catch (error) {
    console.error("Error in updateProduct contoller", error.message);
    res.status(500).json({ message: error.message })
  }
}


