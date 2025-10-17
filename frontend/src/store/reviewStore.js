import { toast } from 'react-hot-toast'
import { create } from 'zustand'
import axios from 'axios'

export const useReviewStore = create((set) => ({

  productReview: [],
  review: [],
  isLoading: false,
  averageRating: 0,
  totalProductReview: 0,
  customerReviews: [],


  createProductReview: async(comment, ratings, id) =>{
    set({ isLoading: true })

    try {
      const res = await axios.post(`/api/review/product/${id}`, { comment, ratings })
      console.log("create product reviews response", res.data)

      set({ productReview: res.data })
      set({ isLoading: false })
      toast.success("Product rated successfully")
    } catch (error) {
      console.log(error)
      set({ isLoading: false })
    }

  }, 

  createCustomerReview: async(comment, ratings) =>{
    set({ isLoading: true })

    try {

      
      const res = await axios.post(`/api/review`, { comment, ratings })
      console.log("create customer reviews response", res.data)

      set((prevState) => ({ customerReviews: [...prevState.customerReviews, res.data ]}))

      set({ isLoading: false })
      toast.success("Customer's review was successfull")
    } catch (error) {
      console.log(error)
      toast.error(error.response?.data?.message)
      set({ isLoading: false })
    }
  },

  getProductReview: async(id) =>{

    try {
      const res = await axios.get(`/api/review/product/${id}`)
      console.log("fetch review response", res.data)

      set({ productReview: res.data.productReviews.review, 
            averageRating: res.data.averageRating,
            totalProductReview: res.data.review
         })


    } catch (error) {
      console.log(error)
    }
  },

  getCustomersReview: async() =>{
    try {
      const response = await axios.get('/api/review')
      //console.log("cus rev", response.data)

      set({ customerReviews: response.data })
    } catch (error) {
      console.log(error)
    }
  }

  

}))