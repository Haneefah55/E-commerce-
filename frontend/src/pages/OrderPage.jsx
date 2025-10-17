import React, { useEffect, useState } from 'react'
import { useAuthStore } from '../store/userStore.js'
import { ShoppingCart } from 'lucide-react'
import { Link } from 'react-router'

const OrderPage = () => {

  const { user } = useAuthStore()

  const convertDate = (data) =>{

    const date = new Date(data).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    
    })

    return date
  
  }

  const checkStatus = (data) =>{
    const date = new Date(data)
    const today = new Date(Date.now)
    if(date >= today ){
      return true

    } else {

      return false
    }
  }

  const addressParts = [
    user?.shippingAddress?.name,
    user?.shippingAddress?.street,
    user?.shippingAddress?.city,
    user?.shippingAddress?.state
    
  ].filter(Boolean); // Removes empty/null/undefined

  const addressJoin =  addressParts.join(', ')
  const postalCode = user?.shippingAddress?.zipCode
  const phoneNo = user?.shippingAddress?.phoneNo


  const { fetchUserOrders, orders } = useAuthStore()

  useEffect(() => {


    fetchUserOrders()
  }, [fetchUserOrders])
  return (
    <div className='bg-pink-100 font-[Merienda] w-screen min-h-screen py-20'>
      <div className='flex flex-col items-center justify-center mx-auto px-4 md:px-8 '>
        <h3 className='text-5xl text-pink-800 font-bello mb-6'>My Orders</h3>

        { orders.length === 0 
          ? ( <EmptyOrderUI />) 
          : (

            orders?.map((order) => (
              <div key={order?._id} className='w-full max-w-md bg-white mb-3 p-2 sm:p-5 h-auto rounded-lg shadow-lg'>
                <div className='flex gap-4 text-sm md:text-md flex-col '>
                  <div className='flex gap-4 items-center justify-between'>
                    <p>Order id:</p>
                    <p className='text-sm font-semibold'>Tr_{order?._id}</p>
                  </div>
                  <div className='flex gap-4  items-center justify-between'>
                    <p>Payment Ref:</p>
                    <p className='text-sm font-semibold'>Tr_#{order?.paymentRef}</p>
                  </div>

                  <div className='flex gap-4  items-center justify-between'>
                    <p>Transaction Date:</p>
                    <p className='text-sm font-semibold'>{convertDate(order?.createdAt)}</p>
                  </div>

                  <div className='flex flex-col '>
                    <h2 className='mb-3 capitalize font-bold'>items</h2>

                    {order?.products?.map((item) =>(
                      <div key={item.name} className='flex mb-3 items-center  border border-pink-800 p-2 gap-4'>
                        <img src={item.image} alt={item.name} className='w-[100px] h-[90px]'
                        />

                        <div>
                          <p className='capitalize mb-2'>{item.name}</p>
                          <p className='text-gray-600 mb-2 text-xs capitalize'>Category: {item.category}</p>
                          <p className=' text-xs capitalize'>Price: &#8358;  {item.price.toLocaleString()}</p>
                          <p className=' text-xs capitalize'>Qty: {item.quantity}</p>
                        </div>

                        
                        

                      </div>
                    ))}


                  </div>
                

                  <div className='flex gap-4  items-center justify-between'>
                    <p>Amount Paid:</p>
                    <p className='text-sm font-semibold'>&#8358; {(order?.totalAmount / 100).toLocaleString()}</p>
                    
                  </div>

                  <div className='flex gap-4  items-center justify-between'>
                    <p>Delivery date</p>
                    <p className='text-sm font-semibold'>{convertDate(order?.deliveryDate)}</p>
                    
                  </div>

                  <div className='flex gap-4  items-center justify-between'>
                    <p>Delivery status</p>
                    <p className='text-sm font-semibold'>{checkStatus(order?.deliveryDate) ? "Delivered" : "Pending"}</p>
                    
                  </div>

                  <h3 className='mb-3 font-semibold text-xl'>Shipping Details</h3>

                  <div className='flex gap-4  items-center justify-between'>
                    <p>Shipping Address:</p>
                    <p className='text-sm font-semibold'>{addressJoin}</p>
                    
                  </div>

                  <div className='flex gap-4  items-center justify-between'>
                    <p>Phone Number:</p>
                    <p className='text-sm font-semibold'>0{phoneNo}</p>
                    
                  </div>

                  <div className='flex gap-4  items-center justify-between'>
                    <p>Postal code:</p>
                    <p className='text-sm font-semibold'>{postalCode}</p>
                    
                  </div>

                  
                </div>

              </div>
            ))
          )
        }
      </div>
      
    </div>
  )
}

export default OrderPage

const EmptyOrderUI = () => (

  <div className='flex flex-col font-[Merienda] items-center justify-center space-y-4 py-16 px-10'>

    <ShoppingCart className='w-24 h-24 text-pink-500' />
    <h3 className='text-2xl font-semibold text-pink-800'>Your have not placed any order yet!</h3>
    <p className='text-md text-pink-800'>All your orders will be saved here to access their state later </p>
    <Link to={'/shop'} className='mt-4 rounded-md bg-pink-600 text-white hover:bg-transparent hover:border-pink-600 border-2 p-3 hover:text-pink-600 transition hover:translate-x-3'>Continue Shopping</Link>

  </div>
)
