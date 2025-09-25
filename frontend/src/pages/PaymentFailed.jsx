import React from 'react'
import { ArrowLeft, CircleX } from 'lucide-react'
import { Link } from 'react-router'

const PaymentFailed = () => {
  return (
    <div className='h-screen w-screen flex items-center font-[Merienda] justify-center px-4'>
      <div className='max-w-md w-full bg-pink-200 rounded-lg shadow-xl overflow-hidden relative'>
        <div className='p-5 sm:p-6'>

          <div className='flex justify-center'>
              <CircleX className='text-red-600 w-16 h-16 mb-4'/>

          </div>
          <h2 className='text-2xl sm:text-3xl font-bold text-center text-red-600 mb-2'>Purchase Cancelled</h2>
          <p className='text-center mb-2  text-purple-900'>Your purchase has been cancelled. No charges have been made.
          </p>
          <div className='bg-purple-300 rounded-lg p-4 mb-6 flex text-center'>
            If you encountered any issues during the checkout process, please feel free to contact our support team without any hesitation

          </div>
          <Link to='/shop' className='w-full bg-pink-800 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded-lg transitions duration-300 flex items-center  gap-2 justify-center '>
            <ArrowLeft />
              Return to Shop
          </Link>



        </div>
      </div>
      
    </div>
  )
}

export default PaymentFailed
