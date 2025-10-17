import Review from "../models/review.model.js"
import User from "../models/user.model.js"

export const createReview = async(req, res) =>{

  try {

    const { comment, ratings } = req.body

    const user = await User.findById(req.user._id)
    
    if(!user){
      return res.status(404).json({ message: "User not found" })
    }
    const reviewExist = await Review.findOne({ user: user._id })
    if(reviewExist) {
      return res.status(400).json({ message: "User review exist " })
    }

    const review = await Review.create({
      user: user._id,
      name: user.name,
      comment,
      ratings
    })

    console.log("review created successfully")

    res.json(review)
    
  } catch (error) {
    console.error("Error in createreview contoller", error.message);
    res.status(500).json({ message: error.message })
  }

}

export const getReviews = async(req, res) =>{

  try {
    const reviews = await Review.find({}).sort({ timestamp: -1 })

    res.json(reviews)
  } catch (error) {
    console.error("Error in getallreviews contoller", error.message);
    res.status(500).json({ message: error.message })
  }


}