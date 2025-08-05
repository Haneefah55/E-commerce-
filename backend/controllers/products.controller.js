import Product from '../models/products.model.js'
import cloudinary from '../utils/cloudinary.js'


export const getAllProducts = async(req, res) =>{
  
  try {
    const products = await Product.find({})
    
    res.json({ products })
  } catch (error) {
    console.error("Error in getAllProducts contoller", error.message);
    res.status(500).json({ message: error.message })
  }
  
  
}

export const getFeaturedProducts = async(req, res) =>{
  try {
    const featuredProduct = await Product.find({ isFeatured: true })
    if(!featuredProduct){
      return res.status(404).json({ message: "No Featured Products found" })
    }
  
    res.json({ featuredProduct })
  } catch (error) {
    console.error("Error in getFeaturedProducts contoller", error.message);
    res.status(500).json({ message: error.message })
  }
  
}

export const createProduct = async(req, res) =>{
  
  try {
    const { name, description, price, image, category } = req.body
  
    let cloudinaryResponse = null
    if(image){
      cloudinaryResponse = await cloudinary.uploader.upload(image, { folder: "products" })
    
    }
    
    const product = await Product.create({ 
      name,
      description,
      price,
      image: cloudinaryResponse?.secure_url ? cloudinaryResponse.secure_url : "",
      category
    })
    
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
    
    await Product.findByIdAndDelete(id)
    
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
        namee: 1,
        description: 1,
        image: 1,
        price: 1
      }
    }
      
    ])
  res.json({ products })
  } catch (error) {
    console.error("Error in getRecommendedProducts contoller", error.message);
    res.status(500).json({ message: error.message })
  }
}

export const getProductByCategory = async(req, res) =>{
  
  try {
    const { category } = req.params
    
    const products = await Product.find({ category })
    res.json({ products })
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
    res.json({ updatedProduct })
    
  } catch (error) {
    console.error("Error in toggleFeaturedProducts contoller", error.message);
    res.status(500).json({ message: error.message })
  }
}