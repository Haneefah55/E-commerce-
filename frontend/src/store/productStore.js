
import { toast } from 'react-hot-toast'
import { create } from 'zustand'
import he from 'he'
import axios from 'axios'

export const useProductStore = create((set) => ({

  products: [],
  isLoading: false,
  product: null,
  recommendedProducts: [],
  featuredProducts: [],
  offerProducts: [],
  relatedProduct: [],
  
  

  setProducts: (products) => set({ products }),

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


  fetchAllProducts: async() =>{

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
      const response = await axios.patch(`/api/product/featured/${id}`)

      
      set((prevProducts) => ({
        products: prevProducts.products.map((product) =>
          product._id === id ? {...product, isFeatured: response.data.isFeatured } : product,
          
        ),
      }))

      
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }


  },

  toggleOfferProducts: async(id) =>{
    

    try {
      const response = await axios.patch(`/api/product/offer/${id}`)

      
      set((prevProducts) => ({
        products: prevProducts.products.map((product) =>
          product._id === id ? {...product, isOffer: response.data.isOffer } : product,
          
        ),
      }))

      
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }


  },

  fetchFeaturedProducts: async() =>{

    try {
      const res = await axios.get('/api/product/featured')
      set({ featuredProducts: res.data})
    } catch (error) {
      console.log(error)
    }
  },

  fetchOfferProducts: async() =>{

    try {
      const res = await axios.get('/api/product/offer')
      set({ offerProducts: res.data})
    } catch (error) {
      console.log(error)
    }
  },

  deleteProduct: async(id) =>{

    try {

  
      const response = await axios.delete(`/api/product/${id}`)

      
      
      set((prevProducts) =>({
      products: prevProducts.products.filter((product) => product._id !== id),
      
      }))

      //window.location.reload()
        
    } catch (error) {
      console.log(error)
      toast.error(error.message)
      
    }
  },

  fetchProduct: async(id) =>{

    try {
      const response = await axios.get(`/api/product/${id}`)

      //console.log(response.data)
      
      set({ product: response.data })

      

    } catch (error) {
      console.log(error)
      
    }
    
  },

  fetchProductByCategory: async(category) =>{

    set({ isLoading: true })

    try {
      //const encodedCatgeory = he.encode(category)
      const response = await axios.get(`/api/product/category/${category}`)

      set({ products: response.data, isLoading: false })
    } catch (error) {
      console.log(error)
      toast.error(error.message || "Failed to fetch products")
    }

  },

  updateProduct: async(id, productData) =>{
    set({ isLoading: true })

    
    try {
      const response = await axios.put(`/api/product/${id}`, { ...productData })
      set({ isLoading: false })
      toast.success("product updated successfully")

    } catch (error) {
      console.log(error)
      set({ isLoading: false})
      toast.error(error.message )
    }
  },

  fetchRecommendedProducts: async() =>{

    try {

      const response = await axios.get('/api/product/recommended')

      set({ recommendedProducts: response.data })
    } catch (error) {
      console.log(error)
    }
    


  },

  fetchRelatedProduct: async(product) =>{

    const category = product.category
    console.log(category)
    try {
      const res = await axios.get(`/api/product/related/${category}`)
      //console.log("related res", res.data)


      const relatedProduct = res.data.filter((item) => item._id !== product._id)
      //console.log(relatedProduct)

      set({ relatedProduct })

    } catch (error) {
      console.log("related error", error)
    }
    


  }
  

 

}))