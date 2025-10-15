import mongoose from 'mongoose'


const orderSchema = new mongoose.Schema({
  
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    
  },
  deliveryDate: {
    type: Date,
    required: true,
  },
  paymentRef: String,
  
  
  products: [
    
    {
      product: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Product",
      },
      name: String,
      category: String,
      image: String,
      quantity: {
        type: Number,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      
    },
    
  ],
  totalAmount: {
    type: Number,
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
  
  
  
}, { timestamps: true })

const Order = mongoose.model("Order", orderSchema)

export default Order