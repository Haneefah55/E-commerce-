import React, { useEffect } from 'react'
import { PaystackPop } from 'paystack-sdk'
import { useCartStore } from '../store/cartStore.js'
import { useAuthStore } from '../store/userStore.js'
import { Loader } from 'lucide-react'
import { Link } from 'react-router'
import PaymentPage from './PaymentPage.jsx'

import { useState } from 'react'

const CheckoutPage = () => {

  const [paymentPop, setPaymentPop] = useState(false)

  const { cart, total, subtotal, } = useCartStore()

  const { user } = useAuthStore()
  const email = user?.email

  console.log(total, subtotal, email)
/*** 
  const [address, setAddress] = useState({
    name: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    phoneNo: ''
  });

  const handleAddressChange = (e) => {
    const { name, value } = e.target
    setAddress({
      ...address,
      [name]: value,
    });
  };

  

  const addressParts = [
    shippingAddress?.name,
    shippingAddress?.street,
    shippingAddress?.city,
    shippingAddress?.state,
    shippingAddress?.zipCode
    
  ].filter(Boolean); // Removes empty/null/undefined

  const addressJoin =  addressParts.join(', ')




  const handleSubmitAddress = async(e) =>{

    e.preventDefault()

    setIsLoadingAddress(true)

    try {
      await addShippingAddress(address)

      setIsLoadingAddress(false)
    } catch (error) {
      setIsLoadingAddress(false)
      console.log(error)
    }

    setAddress({
      name: '',
      street: '',
      city: '',
      state: '',
      zipCode: '',
      phoneNo: ''
    })

    

  }

  **/

  //const email = user?.email

  const handlePopUp = () =>{
    setPaymentPop(!paymentPop)
  }

  /** 
  const handlePayment = async() => {

    

    try {
      await initializePayment(email)

    } catch (error) {
      console.log(error)
    }
  }
**/
  
  

  return (
    <div className='w-screen min-h-screen relative bg-blue-50 pt-14 pb-14 font-[Merienda]'>
      <div className='w-full h-full flex items-center justify-center '>
        
        <div className='p-4 md:p-8 gap-14 flex flex-col md:flex-row items-center justify-center'>
          <div className='my-5 flex flex-col'>
            <div className='flex flex-col gap-3'>
              <div className='flex gap-2'>
                <h3>{user?.name},</h3>
                <h2>{user?.email}</h2>
              </div>
              <div className='flex gap-2'>
                <h2 >Total:</h2>
                <h2 className='font-semibold text-xl '>&#8358; {subtotal?.toFixed(2)}</h2>
              </div>

             

              <div className='flex gap-2'>
                <h2>Total Balance:</h2>
                <h2 className='font-semibold text-xl '>&#8358; {total?.toFixed(2)}</h2>
              </div>
 {/** 
              {shippingAddress &&
             
                <div className='mt-3 font-semibold'>
                  <p>Shipping Address: {addressJoin}</p>
                  <p>Phone Number: 0{shippingAddress?.phoneNo}</p>
                </div>
              
              }

              **/}
            </div>
            

            <div className='p-3 rounded-sm mt-3 flex flex-col w-[250px] border-2 gap-3 border-pink-800'>
              <p className='text-center font-semibold'>Cart Items</p>
              {cart?.map((item) =>(
                <div key={item.name} className=' flex mt-2  gap-3 w-[200px] items-center justify-between'>
                  <img src={item?.image}
                    alt={item?.name}
                    className="w-[90px] h-[80px]"
                    loading="lazy"
                  />

                  <div className='flex flex-col gap-3'>
                    <p>Qty: {item.quantity}</p>
                    <p>Price: {item.price}</p>


                  </div>

                  


                </div>
              ))}
            </div>

            
              <button
                onClick={handlePopUp}
                className="my-5 p-3 text-center bg-pink-800 w-[200px] text-white rounded-md"
              >
                Proceed to payment</button>
            

          </div>
        
{/**** 
            <div className=' my-5 hidden flex-col w-[300px]'>
              <h3 className='font-semibold mb-3 text-center'>Add Shipping Address</h3>
              <form className='flex flex-col gap-3' onSubmit={handleSubmitAddress}>
                <input
                  type='name'
                  name="name"
                  placeholder='Name'
                  value={address.name}
                  required
                  onChange={handleAddressChange}
                  className="w-full py-2 px-4 bg-white/30 bg-opacity-50 rounded-md border-2 border-pink-400 outline-none focus:border-pink-600 text-purple-800 placeholder:text-purple-800 transition duration-200 "

                />

                <input
                  type='text'
                  name="street"
                  placeholder='Street'
                  value={address.street}
                  required
                  onChange={handleAddressChange}
                  className="w-full py-2 px-4 bg-white/30 bg-opacity-50 rounded-md border-2 border-pink-400 outline-none focus:border-pink-600 text-purple-800 placeholder:text-purple-800 transition duration-200 "

                />

                <input
                  type='text'
                  name="city"
                  placeholder='City'
                  value={address.city}
                  required
                  onChange={handleAddressChange}
                  className="w-full py-2 px-4 bg-white/30 bg-opacity-50 rounded-md border-2 border-pink-400 outline-none focus:border-pink-600 text-purple-800 placeholder:text-purple-800 transition duration-200 "

                />

                <input
                  type='text'
                  placeholder='Zipcode'
                  name="zipCode"
                  value={address.zipCode}
                  
                  onChange={handleAddressChange}
                  className="w-full py-2 px-4 bg-white/30 bg-opacity-50 rounded-md border-2 border-pink-400 outline-none focus:border-pink-600 text-purple-800 placeholder:text-purple-800 transition duration-200 "

                />

                <input
                  type='text'
                  name="state"
                  placeholder='State'
                  value={address.state}
                  required
                  onChange={handleAddressChange}o
                  className="w-full py-2 px-4 bg-white/30 bg-opacity-50 rounded-md border-2 border-pink-400 outline-none focus:border-pink-600 text-purple-800 placeholder:text-purple-800 transition duration-200 "

                />

                <input
                  type='tel'
                  placeholder='Phone Number'
                  name="phoneNo"
                  value={address.phoneNo}
                  required
                  onChange={handleAddressChange}
                  className="w-full py-2 px-4 bg-white/30 bg-opacity-50 rounded-md border-2 border-pink-400 outline-none focus:border-pink-600 text-purple-800 placeholder:text-purple-800 transition duration-200 "

                />

                <button
                    className="w-full py-2 px-5 mt-5 bg-pink-800 text-gray-100 font-semibold transform transition hover:scale-90 duration-200"
                    type= "submit"
                    diabled={isLoadingAddress}
                
                >            
                    { isLoadingAddress ? "Submitting" : "Submit"}
                                          
                </button>
              </form>
            </div>

            **/}

          


        
          
          

        </div>

        

      </div>

      <div className={` ${paymentPop ? "absolute" : "hidden"} inset-0 mt-12`}>
        <PaymentPage email={email} />
      </div>
      
    </div>
  )
}

export default CheckoutPage
