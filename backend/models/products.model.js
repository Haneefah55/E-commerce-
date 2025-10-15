
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

  review: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
          
      },

      name: String,

      comment: {
        type: String,
        required: true,
      },

      ratings: Number,
      
      createdAt: {
        type: Date,
        default: Date.now(),
      },

    },

  ],

  
  
}, { timestamps: true })

const Product = mongoose.model("Product", productSchema)

export default Product