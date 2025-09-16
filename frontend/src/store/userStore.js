import { toast } from 'react-hot-toast'
import { create } from 'zustand'
import axios from 'axios'

axios.defaults.withCredentials = true

//const API_URL= import.meta.env.MODE === "development" ? "/api" : "/api"

export const useAuthStore = create((set, get) =>({
  user: null,
  isLoading: false,
  checkingAuth: true,
  wishlist: [],
  


  setUser: (user) => set({ user }),
  
  signup: async(name, email, password) =>{
    set({ isLoading: true })
    
    try {
      const response = await axios.post("/api/auth/signup", { name, email, password })
    
      
      set({ isLoading: false })
  
      console.log("Account created successfully")
      toast.success("Account created successfully")
    } catch (error) {
      set({ isLoading: false })
    
      console.log(error)
      toast.error(error.response?.data?.message || error.message || "Error sigining up")
      throw error
    }
  },
  
  login: async(email, password) =>{
    
    set({ isLoading: true })
    
    try {
      const response = await axios.post("/api/auth/login", { email, password })
    
      
      set({ user: response.data, isLoading: false })
  
      console.log("User login successfully")
      toast.success("User login successfully")

      
    } catch (error) {
      set({ isLoading: false })
    
      console.log(error)
      toast.error(error.response?.data?.message || error.message || "Error logining in user")
      throw error
    }
  },
  
  checkAuth: async() =>{
    set({ checkingAuth: true })
    
    try {
      const response = await axios.get('/api/auth/profile')
      //console.log(response.data)
      
      set({ user: response.data, checkingAuth: false })
    } catch (error) {
  
      set({ user: null, checkingAuth: false })
        
    }
  },

  getWishlist: async() =>{
    try {
      const res = await axios.get('/api/product/wishlist')
      //console.log("list from server", res.data)

      set({ wishlist: res.data })
    } catch (error) {
      console.log(error)
    }

  },

  toggleWishlist: async(id) =>{
  
    try {

      const { user } = get()
      if(!user) {
        throw new Error("please login to add to wishlist");
        
      }
      
      const response = await axios.patch(`/api/product/wishlist/${id}`)

      console.log("response", response.data)

      set({ wishlist: response.data })


      const { wishlist } = get()

      if(wishlist?.some((item) => item._id === id)){
        toast.success("product added to wishlist")
      } else {
        toast.success("product removed from wishlist")
      }


    } catch (error) {
      console.log(error)
      toast.error(error.message )
    }
  
  },


  logout: async() =>{
    try {
      const response = await axios.post("/api/auth/logout")
      set({ user: null })
      toast.success('user logout successfully')
    } catch (error) {
      console.log(error)
    }
  }



  

  
  
  
  
}))