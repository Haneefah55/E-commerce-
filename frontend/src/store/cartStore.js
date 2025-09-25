import { toast } from 'react-hot-toast'
import { create } from 'zustand'
import axios from 'axios'




axios.defaults.withCredentials = true

export const useCartStore = create((set, get) => ({

  cart: [],
  coupon: null,
  total: 0,
  subtotal: 0,
  discountPercent: 0,
  isCouponApplied: false,
  isLoading: false,

  getCartItems: async() =>{

    try {
      const response = await axios.get('/api/cart')

      set({ cart: response.data })
    } catch (error) {
      console.log(error)
      //toast.error(error.message)
    }
  },

  addToCart: async(product) =>{

    try {
      const response = await axios.post('/api/cart', { productId: product._id })

      toast.success("product added to  cart")

      set((prevState) => {
        const existingItem = prevState.cart.find((item) => item._id === product._id)

        const newCart = existingItem ? prevState.cart.map((item) => item._id === product._id ) 
          ? { ...item, quantity: item.quantity + 1 } : item
          : [...prevState.cart, { ...product, quantity: 1 }]

        return { cart: newCart }
      })

      get().calculateTotals()

    } catch (error) {
        console.log(error.message)
    }
  },

  removeFromCart: async(productId) =>{
    try {
      const res = await axios.delete('/api/cart', { data: { productId } })

      set((prevState) => ({ cart: prevState.cart.filter((item) => item._id !== productId) }))
      get().calculateTotals()
    } catch (error) {
      console.log(error.message)
      toast.error(error.message )
    }
  },

  clearCart: async() =>{
    try {
      const res = await axios.patch('/api/cart')
      console.log(res.data)

      set({ cart: [] })
    } catch (error) {
      console.log(error.message)
    }

  },

  updateQuantity: async(productId, quantity) =>{

    try {

      if(quantity === 0){
        get().removeFromCart(productId)
        return
      }

      const res = await axios.put(`/api/cart/${productId}`, { quantity })

      set((prevState) => ({
        cart: prevState.cart.map((item) => (item._id === productId ? { ...item, quantity } : item))
      }))

      get().calculateTotals()
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  },

  calculateTotals: () =>{

    try {

      get().getCoupon()
      const { cart, coupon, discountPercent, isCouponApplied } = get()

      const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

      let total = subtotal

      if(subtotal > 50000 && !coupon){
        get().createCoupon()
      } 

      if(coupon && isCouponApplied) {
      const discount = subtotal * (discountPercent / 100)
      total = subtotal - discount
      }
      console.log(total, coupon, subtotal)

      set({ subtotal, total })

      console.log("totals calcuclated")
    } catch (error) {
      console.log(error.message)
    }
     
  },

  createCoupon: async() =>{

    try {

      const response = await axios.get('/api/coupon')
      set({ coupon: response.data.code, discountPercent: response.data.discountPercent })

    } catch (error) {
      console.log(error)
    }
  },

  getCoupon: async() =>{

    try {
      const response = await axios.get('/api/coupon')
      //console.log("get coupon response", response.data)

      set({ coupon: response.data.coupon, discountPercent: response.data.discountPercent })
    } catch (error) {
      console.log(error)
    }
  },

  applyCoupon: async(code) =>{

    set({ isLoading: true })
    try {
      
      const res = await axios.post('/api/coupon/validate', { code })
      console.log("apply coupon response", res)

      set({ coupon: res.data.code, isCouponApplied: true, isLoading: false, discountPercent: res.data.discountPercent })

      get().calculateTotals()


      
    } catch (error) {
      set({isLoading: false })
      console.log(error)
      toast.error(error.message || "error applying coupon")
      
    }
  },
/** 
  loadPaystackScript: () => {

    return new Promise((resolve, reject) => {
      if (window.Paystack) {
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://js.paystack.co/v2/inline.js';
      script.onload = () => resolve();
      script.onerror = () => reject(new Error('Failed to load Paystack script'));
      document.head.appendChild(script);
    });
  },

  **/

  initializePayment: async() =>{

    
    
    set({ isLoading: true })
    

    try {
      

      const { total, coupon } = get()

      if(total <= 0) throw new Error("amount is 0");
  
      if(coupon === null) throw new Error("no coupon found")

      const amount = total
      
      console.log(amount, coupon)

      //1. load paystack script
     // get().loadPaystackScript()


      //2. initailize payment from backend
      
      const response = await axios.post('/api/payment/initialize', { amount, coupon })

      console.log("initialize response", response)

      const data = response.data
      if(!data.reference) throw new Error("no reference returned");
      console.log(data.reference)

    
      await get().verifyTransaction(data.reference)
      set({ isLoading: false })
      

      







      //2. launch paystack pop up

      //const popup = new PaystackPop()
/*** 
      const paystackOption = {

        key: "pk_test_c12db4a5f22fbb4665fdcf3c53003bc9ba8c9f99",
        email: email,
        amount: total * 1000,
        ref: data.reference,
        currency: 'NGN',
        onSuccess: async(transaction) =>{

          console.log("payment success", transaction)

          const res = await axios.get(`/api/payment/verify/${transaction.reference}`)
          console.log(res)
          set({ isLoading: false })

          if(res.data.success) {
            
            window.location.href = "/payment-success"
          } else {

            window.location.href = "/payment-failed"

          }



        },

        onCancel: () =>{
          set({ isLoading: false })
          console.log("payment cancelled")
          window.location.href = "/payment-failed"
        }

      }

      // use window.paystackpop
      if(window.PaystackPop) {
        window.PaystackPop.setup(paystackOption).openIframe()
      } else {
        throw new Error("Paystack not loaded properly");
        
      }

**/
      
    } catch (error) {
      set({isLoading: false })
      console.log("payment error", error)
    }
  },

  verifyTransaction: async(reference) =>{

    try {
      const response = await axios.get(`/api/payment/verify/${reference}`)

      console.log("verify response", response.statusText)

      const id = response.data.orderId
      
 
      if(response.statusText === "OK"){

        window.location.href = `/purchase-success/${id}`
        console.log(response.status, response.statusText)
      }  else{
        window.location.href = `/purchase-failed`
      }
      
      
      

      
    } catch (error) {
      console.log("verify error", error)
    }
  }

}))