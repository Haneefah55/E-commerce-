import React, { useEffect} from 'react'
import { useCartStore } from '../store/cartStore'
import { ShoppingCart } from 'lucide-react'
import { Link } from 'react-router'
import CartItem from '../components/CartItem.jsx'
import OrderSummary from '../components/OrderSummary.jsx'
import RecommendedProducts from '../components/RecommendedProducts.jsx'
import { useProductStore } from '../store/productStore.js'

const CartPage = () => {

  const { cart, calculateTotals } = useCartStore()
  const { fetchRecommendedProducts, recommendedProducts } = useProductStore()

  //console.log("recommend", recommendedProducts)


  useEffect(() => {
    
    calculateTotals()

  }, [calculateTotals])



  useEffect(() => {
    
    fetchRecommendedProducts()
  }, [fetchRecommendedProducts])
  
  


  return (
    <div className='bg-pink-100 w-full min-h-screen pt-14 px-3 md:px-6 '>
      <h2 className='font-semibold font-bello text-2xl text-pink-600 mb-10 mt-10 text-center'>My Cart</h2>

      { cart.length === 0 
        ? ( <EmptyCartUI />) 
        : (
          <div className='w-full flex mt-20 flex-col '>
            <div className='w-full grid grid-cols-1 md:grid-cols-3 justify-items-center justify-center gap-5'>

              <div className='col-span-3 md:col-span-2 mx-1 ' >
                {cart.map((item) => (
                <CartItem key={item._id} item={item} />
                ))}
              </div>

              <div className='col-span-3 md:col-span-1  '>
                <OrderSummary />
              </div>
            </div>

            <div className='mt-8 px-20 w-full justify-items-center'>
              <RecommendedProducts recommendedProducts={recommendedProducts} />
            </div>

            

          </div>
         )
      
    
      }
      
    

      
    </div>
  )
}

export default CartPage


const EmptyCartUI = () => (

  <div className='flex flex-col font-[Merienda] items-center justify-center space-y-4 py-16'>

    <ShoppingCart className='w-24 h-24 text-pink-500' />
    <h3 className='text-2xl font-semibold text-pink-800'>Your Cart is Empty!</h3>
    <p className='text-md text-pink-800'>Looks like you haven't added anything to your cart yet</p>
    <Link to={'/shop'} className='mt-4 rounded-md bg-pink-600 text-white transition-colors hover:bg-transparent hover:border-pink-600 border-2 p-3 hover:text-pink-600 transition-transform hover:translate-x-3'>Start Shopping</Link>

  </div>
)
