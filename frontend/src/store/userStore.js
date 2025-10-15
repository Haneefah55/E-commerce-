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
  shippingAddress: {},
  orders: [],


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
      toast.error(error.message || "Error sigining up")
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

  changePassword: async(oldPassword, newPassword) =>{

    set({ isLoading: true})

    try {
      const response = await axios.post("/api/auth/change-password", { oldPassword, newPassword })

      set({ isLoading: false })
      //console.log(response)

      const msg = response.data.message
      toast.success(msg)
    } catch (error) {

      set({ isLoading: false })
    
      console.log(error)
      toast.error(error.response?.data?.message || error.message || "Error changing user password")
      throw error
      
      
    }

  },
  
  editProfile: async(name, email) => {
    set({ isLoading: true })

    try {
      const response = await axios.put("/api/auth", { name, email })

      console.log("editprofile", response)

      set({ isLoading: false, user: response.data })

      
      
    } catch (error) {
      set({ isLoading: false })
    
      console.log(error)
      toast.error(error.message || "Error updating user")
      throw error
    }

  },

  deleteUser: async() =>{

    set({ isLoading: true })

    try {
      const response = await axios.delete("/api/auth")

      console.log("delteuser", response)

      set({ isLoading: false, user: null })

      window.location.href = '/'

      console.log("user account delete")

    } catch (error) {

      set({ isLoading: false })
    
      console.log(error)
      toast.error(error.message || "Error deleting user")
      throw error
    }

  },

  checkAuth: async() =>{
    set({ checkingAuth: true })
  
    try {

      
      const response = await axios.get(`/api/auth`)
      console.log("check auth res ", response.data)
      
      set({ user: response.data, checkingAuth: false })
    } catch (error) {
      console.log("check auth", error)
  
      set({ user: null, checkingAuth: false })
        
    }
  },

  getWishlist: async() =>{
    try {
      const res = await axios.get('/api/auth/wishlist')
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
      
      const response = await axios.patch(`/api/auth/wishlist/${id}`)

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

  addShippingAddress: async(address) =>{

    const { user } = get()

    try {
      const response = await axios.patch('/api/auth/address', { address })
      console.log(response.data)

      set({ user: {...user, shippingAddress: response.data.shippingAddress }
          
      })

      toast.success("shipping address added successfully")
    } catch (error) {
      
      console.log(error)
      toast.error(error.message || "error adding shipping address")
    }

  },

  fetchShippingAddress: async() =>{

    try {
      const response = await axios.get('/api/auth/address')
      console.log(response.data)
      set({ shippingAddress: response.data.shippingAddress })
    } catch (error) {
      
    }

  },
  fetchUserOrders: async() =>{
    try {
      const response = await axios.get('/api/auth/order')
      console.log("order response", response)

      set({ orders: response.data })
    } catch (error) {
      console.log(error)
      toast.error(error.message || "error fetching order")
    }

  },
  



  logout: async() =>{
    try {
      const response = await axios.post("/api/auth/logout")
      set({ user: null, checkingAuth: false })
      toast.success('user logout successfully', { id:'login' })
    } catch (error) {
      console.log(error)
      set({ checkingAuth: false })
    }
  },

  refreshToken: async()=>{
    // prevent multiple simultaneous refresh attempts
    /*** 
    const { checkingAuth } = get()
    if(checkingAuth) return
**/
    try {
      const response = await axios.get('/api/auth/refresh-token')
      console.log("refresh-response", response)

      set({ checkingAuth: false })
      return response.data
    } catch (error) {
      set({ user: null, checkingAuth: false })
      throw error
    }


  }


}))


// Axios interceptors for token refresh

let refreshPromise = null

axios.interceptors.response.use(
  (response) => response, 
  async(error) => {
    console.log("inter error", error)
    console.log('status', error.response.status)

    const originalRequest = error.config
    
    //console.log("originalRequest._retry", originalRequest)
    if(error.response?.status === 401 ) {

      if(originalRequest.url.includes('/api/auth/refresh-token')) {
        return Promise.reject(error)
      }

      if(!originalRequest._retry){

        originalRequest._retry = true

        console.log("here done")

        console.log("originalRequest._retry", originalRequest)

        try {
        //if a refresh token is already in progress, wait for it to complete

        if(refreshPromise){
          await refreshPromise
          console.log("refreshPromise")
          return axios(originalRequest)
        }

        refreshPromise = useAuthStore.getState().refreshToken()

        await refreshPromise

          //clear the promise after successful refresh
        
        refreshPromise = null

        console.log("refresh success")
        // retry original request with new token

        return axios(originalRequest)
        } catch (refreshError) {

          //clear the promise on failure
          console.log("refresh error", refreshError)

          refreshPromise = null

          //if refresh failed logout user

          useAuthStore.getState().logout()

          return Promise.reject(refreshError)
          
        }
      }

      
    }

    return Promise.reject(error)

  }

  
  
)