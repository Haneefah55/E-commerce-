
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    
  },
  cartItems: [
    {
      quantity: {
        type: Number,
        default: 1,
      },
      
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      }
      
    },
  
  ],

  wishlist: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
      }
    }

  ],

  shippingAddress: {
    street: { type: String },
    city:    { type: String },
    state:   { type: String },
    phoneNo: { type: Number },
    zipCode: { type: String },
  },

  role: {
    type: String,
    enum: ["customer", "admin"],
    default: "customer"
  },

  review: {
    
    type: mongoose.Schema.Types.ObjectId,
    ref: "Review",
    
  }

}, { timestamps: true })


userSchema.pre("save", async function (next) {
  if(!this.isModified("password"))
    return next()
  try {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    next()
    
  } catch (error) {
    console.error(error);
  }
})

userSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password)
  
}

const User = mongoose.model("User", userSchema)

export default User
  