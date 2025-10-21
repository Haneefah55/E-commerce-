import React from 'react'
import payLogo from '/images/paystack.png'
import securePay from '/images/paystackimg.png'
import { useCartStore } from '../store/cartStore.js'
//import { useAuthStore } from '../store/userStore.js'
import { useState } from 'react'
import { Loader, X } from 'lucide-react'
import { useNavigate } from 'react-router'
//import { useEffect } from 'react'
import axios from 'axios'


axios.defaults.withCredentials = true

const PaymentPage = ({ email }) => {

  const { initializePayment, isLoading, total } = useCartStore()
  //const { user } = useAuthStore()

  console.log(total)
  
  const [errors, setErrors] = useState({
    cardNumber: "",
    cardName: "",
    expiry: "",
    cvv: ""
  })

  //const email = user?.email
  //console.log(user?.email)
  //console.log(errors)
  //const isLoading = false

  const [paymentData, setPaymentData] = useState({
    cardNumber: "",
    cardName: "",
    expiry: "",
    cvv: ""

  })

  //console.log(paymentData.cardNumber)

  const handleInPutChange = (e) =>{

    const { name, value } = e.target

    if(name === "cardNumber"){
      const formattedValue = value
        .replace(/\D/g, '')
        .slice(0, 16)
        .replace(/(\d{4})(?=\d)/g, '$1 ')
        
     
    
      setPaymentData({
        ...paymentData,
        [name]: formattedValue
      })


     // console.log(formattedValue)
      return
     


    }

    if(name === "cardName"){
     
    
      setPaymentData({
        ...paymentData,
        [name]: value
      })

      return


    }

    if(name === "expiry"){
      const formattedValue = value
        .replace(/\D/g, '')
        .substring(0, 4)
        .replace(/(\d{2})(\d)/, '$1/$2')
        .trim();
    
      setPaymentData({
        ...paymentData,
        [name]: formattedValue
      })

      return


    }

    if(name === "cvv"){
      const formattedValue = value.replace(/\D/g, '').substring(0, 3)
    
      setPaymentData({
        ...paymentData,
        [name]: formattedValue
      })

      return


    }

  }
  const navigate = useNavigate()
  const handleClose = () =>{
    navigate("/purchase-failed")
  }


  const validateForm = () =>{

    

    const cardDigits = paymentData.cardNumber.replace(/\s/g, '')

    if(cardDigits.length !== 16) {
      setErrors({
        ...errors,
        cardNumber: "Card number must be 16 digits"
      })
    }

    if(!paymentData.cardName.trim()){

      setErrors({
        ...errors,
        cardName: "Card holder name is required"
      })
      
    }

    if(!/^(0[1-9]|1[0-2])\/([0-9]{2})$/.test(paymentData.expiry)){

      setErrors({
        ...errors,
        expiry: "please enter a valid expiry date (MM/YY)"
      })
      
    }

    if(!/^\d{3}$/.test(paymentData.cvv)){

      setErrors({
        ...errors,
        cvv: "CVV must be 3 digits"
      })
      
    }

   
    return 


  }


  const handleSubmit = async(e) =>{
    e.preventDefault()


    validateForm()
      

    console.log("paymentda", paymentData)

    try {
      const reference  = await initializePayment()

      const response = await axios.get(`/api/payment/verify/${reference}`)
      
      console.log("verify response", response)

      const id = response.data.orderId
      
      
      if(response.status === 200){

        navigate(`/purchase-success/${id}`)
        //console.log(response.status, response.statusText)
      }  else{
        navigate("/purchase-failed")

      }

      
    } catch (error) {
      console.log(error)
    }
      
    
    

    
  }



  return (
    <div className=' flex items-center mt-14 justify-center z-40 mx-auto relative '>
      

      <div className=' bg-white w-[300px]  font-[Lato] md:w-[500px] h-auto  shadow-md px-1 md:px-6 py-6 flex flex-col items-center justify-center relative gap-3'>
        <X className='absolute top-2 right-4 w-7 h-7' onClick={handleClose}/>
        <div className='flex w-full px-4 mt-5 items-center justify-between'>
          <div className='flex '>
            <img src={payLogo} alt='paystack-logo' className='w-[120px] '/>

          </div>
          
          <div className='flex flex-col text-right ml-14'>
            <h3 className='mt-3'>
            {email}
            </h3>
            <p className=' font-bold'>Pay <span className='text-green-600 font-bold'>NGN {total.toLocaleString()}</span></p>
          </div>
          
        </div>

        <div className='w-full h-0.5 bg-amber-900' />
        <p className='bg-amber-400 -mt-3 text-amber-950 font-bold uppercase text-xs px-4 py-1'>Test</p>

        <p className='font-bold mt-5'>Enter your card details to pay</p>

        <form className='w-full p-4 flex flex-col' onSubmit={handleSubmit}>
          <div className='flex mb-4 border-2  border-gray-400 flex-col rounded-md gap-1 p-2'>
            <label htmlFor='cardNumber' className='text-gray-400 capitalize'>card number</label>
            <input

              type="text"
              id='cardNumber'
              name='cardNumber'
              value={paymentData.cardNumber}
              onChange={handleInPutChange}
              placeholder='0000 0000 0000 0000'
              maxLength={19}
          
              className='bg-transparent outline-none'




            />
            
          </div>

          {errors.cardNumber && <p className='text-xs text-red-600 mb-3'>{errors.cardNumber}</p>}

          <div className='flex border-2  border-gray-400 mb-4  flex-col rounded-md gap-1 p-2'>
            <label htmlFor='cardName' className='text-gray-400 capitalize'>card holder's name</label>
            <input

              type="text"
              id='cardName'
              name='cardName'
              value={paymentData.cardName}
              onChange={handleInPutChange}
              placeholder='Enter Name'
              className='bg-transparent outline-none'
            


            />
            
          </div>

          {errors.cardName && <p className='text-xs text-red-600 mb-3'>{errors.cardName}</p>}

          <div className='grid grid-cols-2 gap-2'>

              <div className='flex border-2  border-gray-400 mb-4  flex-col rounded-md gap-1 p-2'>
              <label htmlFor='expiry' className='text-gray-400 capitalize'>Expiry Date</label>
              <input

                type="text"
                id='expiry'
                name='expiry'
                value={paymentData.expiry}
                onChange={handleInPutChange}
                placeholder='MM/YY'
                className='bg-transparent outline-none'
              


              />

              
              
            </div>
            

            <div className='flex flex-wrap border-2  border-gray-400 mb-4 flex-shrink flex-col rounded-md gap-1 p-2'>
              <label htmlFor='cvv' className='text-gray-400 uppercase'>CVV</label>
              <input

                type="text"
                id='cvv'
                name='cvv'
                value={paymentData.cvv}
                onChange={handleInPutChange}
                placeholder='123'
                className='bg-transparent outline-none'
              


              />
              
            </div>
            {errors.expiry && <p className='text-xs text-red-600 mb-3'>{errors.expiry}</p>}

            {errors.cvv && <p className='text-xs text-red-600 mb-3'>{errors.cvv}</p>}

            

          </div>

          <button
            className="w-full py-2 px-5 mt-5 bg-green-600 text-gray-100 font-semibold transform transition hover:scale-90 duration-200"
            type='submit'
            diabled={isLoading}
        
          >            
            { isLoading ? <Loader className=" animate-spin mx-auto" size={24} /> : `Pay NGN ${total.toLocaleString()}`}
                                    
          </button>


          

          


          
        </form>

        <img src={securePay} className='w-[250px] md:w-[300px]' alt='sucure pay' />


      </div>
      
    </div>
  )
}

export default PaymentPage
