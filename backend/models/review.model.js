import mongoose from 'mongoose'


const reviewSchema = new mongoose.Schema({

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

}, { timestamps: true })

const Review = mongoose.model("Review", reviewSchema)

export default Review