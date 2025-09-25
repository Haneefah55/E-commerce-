import React from 'react'
import { ArrowRight, CheckCircle, HandHeart } from 'lucide-react'
import { Link, useParams } from 'react-router'
import Confetti from 'react-confetti'
import { useCartStore } from '../store/cartStore.js'
import { useEffect } from 'react'

const PaymentSuccess = () => {

  const { clearCart } = useCartStore()

  const { id } = useParams()

  useEffect(() => {

    clearCart()
  }, [clearCart])

  return (
    <div className='h-screen w-screen flex items-center font-[Merienda] justify-center px-4'>

      <Confetti

        width={window.innerWidth}
        height={window.innerHeight}
        gravity={0.1}
        style={{ zIndex: 99 }}
        numberOfPieces={800}
        recycle={false}




      />
      <div className='max-w-md w-full bg-pink-200 rounded-lg shadow-xl overflow-hidden relative'>
        <div className='p-5 sm:p-6'>
          <div className='flex justify-center'>
            <CheckCircle className='text-purple-800 w-16 h-16 mb-4'/>

          </div>
          <h2 className='text-2xl sm:text-3xl font-bold text-center text-purple-800 mb-2'>Purchase Successful!</h2>
          <p className='text-center mb-2  text-purple-900'>Thanks for the purchase, {"We're"} processing it now</p>
          <p className='text-center mb-2 text-sm  text-pink-900'>Check your email for order details and updates</p>
          <div className='bg-purple-300 rounded-lg p-4 mb-6'>
            <div className='flex items-center justify-between mb-2'>
              <span className='text-sm text-pink-900'>Order number:</span>
              <span className='text-sm font-bold text-purple-900'>#Tr_{id}</span>
            </div>
            <div className='flex items-center justify-between mb-2'>
              <span className='text-sm text-pink-900'>Estimated delivery:</span>
              <span className='text-sm font-bold text-purple-900'>3-5 business days</span>
            </div>
          </div>
          <div className='space-y-4'>
            <button className='w-full bg-purple-950 hover:bg-purple-800 text-white font-bold py-2 px-4 rounded-lg transitions duration-300 flex items-center justify-center gap-2'>
              <HandHeart />
              Thanks for trusting us!
            </button>
            <Link to='/shop' className='w-full bg-pink-800 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded-lg transitions duration-300 flex items-center gap-2 justify-center '>
              Continue Shopping
              <ArrowRight />
            </Link>
          </div>
        </div>
      </div>
      
    </div>
  )
}

export default PaymentSuccess
