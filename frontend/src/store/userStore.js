import { toast } from 'react-hot-toast'
import { create } from 'zustand'
import axios from 'axios'

axios.defaults.withCredentials = true

const API_URL= import.meta.env.MODE === "development" ? "http://localhost:5500/api" : "/api"

export const useAuthStore = create((set, get) =>({
  user: null,
  isLoading: false,
  checkingAuth: true,
  
  signup: async(name, email, password) =>{
    set({ isLoading: true })
    
    try {
      const response = await axios.post(`${API_URL}/auth/signup`, { name, email, password })
    
      
      set({ user: response.data.user, isLoading: false })
  
      console.log("Account created successfully")
      toast.success("Account created successfully")
    } catch (error) {
      sete({ isLoading: false })
      alert(error)
      toast.error(error.response?.data?.message)
      throw error
    }
  }
}))