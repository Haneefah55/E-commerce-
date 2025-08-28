
import { toast } from 'react-hot-toast'
import { create } from 'zustand'
import axios from 'axios'

export const useProductStore = create((set) => ({

  products: [],
  isLoading: false,

  setProducts: (products) => set({products}),

  createProduct: async(productData) =>{

    set({ isLoading: true })
    try {
      const response = await axios.post('/api/product', { ...productData })
      set((prevState) => ({
        products: [...prevState.products, response.data],
        isLoading: false,
      }))
      toast.success("Product Created Successfully")
    } catch (error) {
      console.log(error)
      toast.error(error.message)
      set({ isLoading: false })
      throw error
    }
  },

  fecthAllProducts: async() =>{

    set({ isLoading: true })
    try {

      const response = await axios.get('/api/product')
      
      set({ products: response.data, isLoading: false })
      

    } catch (error) {
      console.log(error)
      set({ isLoading: false })
    }

 
  },

  toggleFeaturedProducts: async(id) =>{
    

    try {
      const response = await axios.patch(`/api/product/${id}`)

      set((prevProducts) => ({
        products: prevProducts.products.map((product) =>
          product._id === id ? {...product, isFeatured: response.data.isFeatured } : product
        ),
      }))
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }


  },

  deleteProduct: async(id) =>{

    try {
      await axios.delete(`/api/product/${id}`)

      
        
      set((prevState) =>({
        products: prevState.products.filter((product) => product._id !== id),
      }))
        
    
    } catch (error) {
      console.log(error)
      toast.error(error.message)
      
    }
  }



}))