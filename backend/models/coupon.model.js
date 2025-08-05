import mongoose from 'mongoose'

const couponSchema = new mongoose.Schema({
  
  code: {
    type: String,
    required: true,
    unique: true,
  },
  discountPercent: {
    type: Number,
    required: true,
    min: 0,
    max: 100,
  },
  expire: {
    type: Date,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  
  
}, { timestamps: true })

const Coupon = mongoose.model("Coupon", couponSchema)

export default Coupon