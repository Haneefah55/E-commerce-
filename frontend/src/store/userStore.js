import { toast } from 'react-hot-toast'
import { create } from 'zustand'
import axios from 'axios'

axios.defaults.withCredentials = true

//const API_URL= import.meta.env.MODE === "development" ? "/api" : "/api"

export const useAuthStore = create((set, get) =>({
  user: null,
  isLoading: false,
  checkingAuth: true,
  
  signup: async(name, email, password) =>{
    set({ isLoading: true })
    
    try {
      const response = await axios.post("/api/auth/signup", { name, email, password })
    
      
      set({ user: response.data.user, isLoading: false })
  
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
      
      set({ user: response.data, checkingAuth: false })
    } catch (error) {
  
      set({ user: null, checkingAuth: false })
        
    }
  }
  
  
  
  
}))