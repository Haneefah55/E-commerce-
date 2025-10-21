import mongoose from 'mongoose'
import Product from '../models/products.model.js'
import User from '../models/user.model.js'
import cloudinary from '../utils/cloudinary.js'
import Review from '../models/review.model.js'
import he from 'he'



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

export const getShopProducts = async(req, res) =>{
  try {
    const page = parseInt(req.query.page) || 1
    const limit = 9
    const skip = (page - 1) * limit

    const total = await Product.countDocuments()

    const product = await Product.find({}).skip(skip).limit(limit)

    res.json({
      product,
      currentPage: page,
      totalPage: Math.ceil(total / limit),
      totalProducts: total
    })
  } catch (error) {
    console.error("Error in getShopProducts contoller", error.message);
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
    const featuredProduct = await Product.find({})
    if(!featuredProduct){
      return res.status(404).json({ message: "No Featured Products found" })
    }
  
    res.json(featuredProduct)
  } catch (error) {
    console.error("Error in getFeaturedProducts contoller", error.message);
    res.status(500).json({ message: error.message })
  }
  
}

export const searchProduct = async(req, res) => {
  try {
    const { filter } = req.query

    if(!filter){
      return res.status(400).json({ message: "Search filter is required"})
    }

    const search = await Product.find({
      $or: [
        { name: { $regex: filter, $options: "i" } },
        { category: { $regex: filter, $options: "i" } }
      ]
    })


    res.json(search)
  } catch (error) {
    console.error("Error in search product contoller", error.message);
    res.status(500).json({ message: error.message })
  }
}

export const getOfferProducts = async(req, res) =>{
  try {
    const offerProduct = await Product.find({ isOffer: true })
    if(!offerProduct){
      return res.status(404).json({ message: "No offer Products found" })
    }

    const discount = 20

    const discountedProducts = offerProduct.map((product) => {
      const discountedPrice = Math.floor(product.price * (1 - discount / 100))

      return {
        ...product._doc,
        discountedPrice: discountedPrice,

      }
    })
  
    res.json(discountedProducts)
  } catch (error) {
    console.error("Error in getOfferProducts contoller", error.message);
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

    //console.log("Product Created Succeefully")

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
    
    const encodedCatgeory = category.replace(/&/g, "&amp;")

    const products = await Product.find({ category: encodedCatgeory })
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

export const toggleOfferProducts = async(req, res) =>{
  
  try {
    const { id } = req.params
    
    const product = await Product.findById(id)
    if(!product){
      return res.status(404).json({ message: "Products not found" })
    }
    
    
    product.isOffer = !product.isOffer
    
    const updatedProduct = await product.save()
    res.json(updatedProduct)
    
  } catch (error) {
    console.error("Error in toggleOfferProducts contoller", error.message);
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


export const createProductReview = async(req, res) =>{

  try {
    const { comment, ratings } = req.body
 
    const { id } = req.params

    const user = await User.findById(req.user._id)
    
    if(!user){
      return res.status(404).json({ message: "User not found" })
    }
 

  
    const product = await Product.findById(id)

    if(!product){
      return res.status(404).json({ message: "Product not found" })
    }

    const newReview ={
      user: user._id,
      name: user.name,
      comment,
      ratings,
    }

    product.review.push(newReview)

    await product.save()

    console.log("product review created successfully")

    res.json(product.review)
  } catch (error) {
    
    console.error("Error in createProductReview contoller", error.message);
    res.status(500).json({ message: error.message })
  }
  


  

  
}

export const getProductReview = async(req, res) =>{
  try {
    const { id } = req.params
    console.log(id)

    const productReviews = await Product.findOne(
      { _id: id },
      { review: 1, _id: 0 }
    )

    const totalReviews = await Product.aggregate([
      {
        $match: {
          _id: mongoose.Types.ObjectId.createFromHexString(id)
        }
      }, 
      
      {
        $project: {
          name: 1,
          review: { $size: "$review" }, 
          _id: 0
        }

      }
    ])

    const { review } = totalReviews[0] ||  0 


    const productRatings = await Product.aggregate([
      {
        $match: {
          _id: mongoose.Types.ObjectId.createFromHexString(id)
        }
      }, 
      
      {
        $project: {
          _id: 0,
          totalRatings: { $size: "$review" }, 
          averageRating: { $avg: "$review.ratings" }
        }

      }
    ])

    const { totalRatings, averageRating } = productRatings[0] || { totalRatings: 0, averageRating: 0 }

    res.json({ totalRatings, averageRating, review, productReviews  })
  } catch (error) {
    console.error("Error in getProductReview contoller", error.message);
    res.status(500).json({ message: error.message })
  }
}

export const getRelatedProducts = async(req, res) =>{

  try {
    const { category } = req.params

    const product = await Product.find({ category: category }).limit(3)

    //console.log("category", product)

    res.json(product)
  } catch (error) {
    console.error("Error in getRelatedProducts contoller", error.message);
    res.status(500).json({ message: error.message })
  }
}

export const categoryCount = async(req, res) =>{
  try {

    const product = await Product.aggregate([
      {
        $unwind: "$category"
      },
      {
        $group: {
          "_id": "$category",
          "count": { "$sum": 1}
        }
      }
    ])

    //console.log(product)
    res.json(product)
  } catch (error) {
    console.error("Error in categorycount contoller", error.message);
    res.status(500).json({ message: error.message })
  }
}





