
import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    
  },
  category: {
    type: String,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
    default: 1,

  },
  isFeatured: {
    type: Boolean,
    default: false,
  },
  isOffer: {
    type: Boolean,
    default: false,
  },
  discountedPrice: Number,

  
  
}, { timestamps: true })

const Product = mongoose.model("Product", productSchema)

export default Product