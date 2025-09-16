import React, { useState } from 'react'
import { useCartStore } from '../store/cartStore.js'
import { MoveRight } from 'lucide-react'
import { Link } from 'react-router'
import { useEffect } from 'react'


const OrderSummary = () => {

  const { total, subtotal, coupon, isCouponApplied, createCoupon } = useCartStore()
  const [codeInput, setCodeInput] = useState()
  const isLoading = false
  const savings = subtotal - total 

  const handleApplyCode= async() =>{
    console.log("code applied")
  }

  const handleRemoveCoupon = async () =>{
    console.log("coupon removed")
  }

  useEffect(() => {

   createCoupon()

  }, [createCoupon])
  



  return (

    <div className='w-full  flex flex-col gap-6'>

      <div className='w-[320px] h-auto flex flex-col px-5 bg-white py-9 shadow-md rounded-md  gap-6'>

      

        <h2 className="font-bello text-xl text-center text-pink-600">Order Summary</h2>

        <div className='space-y-4 font-[Merienda]'>
          <div className='space-y-2 mb-7'>
            <dl className='flex items-center mb-2 justify-between gap-4'>
              <dt className='text-base  text-pink-600'>Original Price</dt>
              <dd className='text-base font-bold text-pink-800'>&#8358; {subtotal?.toFixed(2)}</dd>

            </dl> 

            {savings > 0 && (
              <dl className='flex items-center mb-2 justify-between gap-4'>
                <dt className='text-base text-pink-600 '>Savings</dt>
                <dd className='text-base font-bold text-pink-800'>&#8358; {savings?.toFixed(2)}</dd>
              </dl>
            )}

            {coupon && isCouponApplied && (

              <dl className='flex items-center mb-2 justify-between gap-4'>
                <dt className='text-base text-pink-600 '>Coupon ({coupon.code})</dt>
                <dd className='text-base font-bold text-pink-800'>-{coupon.discountPercenage}</dd>
              </dl>

            )}

            <dl className='flex items-center  mb-2 justify-between gap-4'>
                <dt className='text-base text-pink-600 '>Total</dt>
                <dd className='text-base font-bold text-pink-800'>&#8358; {total?.toFixed(2)}</dd>
            </dl>

          </div>

          <button className='flex w-full self-center items-center mt-4 py-2 px-4 justify-center rounded-md bg-pink-600 text-white font-semibold transition-all hover:bg-transparent hover:border-2 hover:border-pink-600 hover:text-pink-600 hover:translate-y-3'>Proceed to checkout</button>

          <div className='flex items-center justify-center gap-2 self-center w-full'>
            <span className='text-sm text-gray-700'>or</span>
            <Link  to={'/shop'} className='font-semibold text-md flex gap-2 hover:underline text-purple-800'>continue shopping
            <MoveRight className='font-semibold text-purple-800'/>
            </Link>
          </div>
        </div>

      </div>

      <div className='w-[320px] h-auto flex flex-col px-5 bg-white py-9 shadow-md rounded-md  gap-6'>

        <div className='space-y-4 font-[Merienda]'>
          <label htmlFor='voucher' className="mb-2 block text-sm font-semibold text-purple-800">
            Do you have a voucher or gift card?
          </label>

          <input
            type='text'
            id='voucher'
            placeholder='Enter code here'
            value={codeInput}
            required
            onChange={(e) => (setEmail(e.target.value))}
            className="w-full py-2 px-4 bg-white/30 bg-opacity-50 rounded-md border-2 border-pink-400 outline-none focus:border-pink-600 text-purple-800 placeholder:text-purple-800 transition duration-200 "

          />

          <button
            className="w-full py-2 px-5 mt-5 bg-pink-600 text-gray-100 font-semibold transform transition hover:scale-90 duration-200"
            onClick={handleApplyCode}
            diabled={isLoading}
        
          >            
            { isLoading ? <Loader className=" animate-spin mx-auto" size={24} /> : "Apply code"}
                                    
          </button>

          {isCouponApplied && coupon && (
            <div className='mt-4'>
              <p className='text-xl font-semibold text-purple-900'>Coupon applied</p>
              <p className='text-sm  mt-3 text-purple-900'>{coupon.code} - {coupon.discountPercent}%off</p>
              <button
                className="w-full py-2 px-5 mt-5 bg-pink-600 text-gray-100 font-semibold transform transition hover:scale-90 duration-200"
                onClick={handleRemoveCoupon}
                
            
              >            
                Remove coupon
                                        
              </button>
            </div>
          )}

          {coupon && (
            <div className='mt-4'>
              <h2 className='text-xl font-semibold text-purple-900'>Your Available Coupon:</h2>
              <p className='text-sm  mt-3 text-purple-900'>{coupon.code} - {coupon.discountPercent}%off</p>
            </div>
          )}
        </div>

      </div>



  
      
    </div>
  )
}

export default OrderSummary
