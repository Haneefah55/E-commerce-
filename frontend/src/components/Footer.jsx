import React, { useState } from 'react'
import { useAuthStore } from '../store/userStore.js'
import { FaFacebook, FaInstagram, FaRegPaperPlane, FaTwitter } from 'react-icons/fa'
import { Link } from 'react-router'
import { useReviewStore } from '../store/reviewStore.js'
import { Star } from 'lucide-react'
import toast from 'react-hot-toast'

const Footer = () => {
  const { user } = useAuthStore()
  const [comment, setComment] = useState("")
  const [ratings, setRatings] = useState(0)
  

  const { createCustomerReview, isLoading } = useReviewStore()

  const handleRate =(i) => {
  
      if(!user){
        toast.error("Please login to rate product", { id: "login" });
        return
      }
  
      console.log("index", i)
      const value = i + 1
      setRatings(value)
      
     
    }

  const submitReview = async() =>{

    if(!comment || !ratings){
        toast.error("comment or rating is missing")
        return
    }

    try {
      //console.log(comment, ratings)
      if(!user){
        toast.error("Please login to rate product", { id: "login" });
        return
        
      }
      await createCustomerReview(comment, ratings)
    } catch (error) {
      console.log(error)
    } finally {
      setComment('')
      setRatings(0)
    }
  }

  return ( 
    <div className=' relative w-screen font-[Merienda] bg-pink-600  flex items-center justify-center text-pink-200   ' 
    
    >
      <div className='flex bg-black/80 py-5 items-center justify-center w-full'>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 px-5 md:px-10'>
          <div className='flex flex-col gap-3 '>
            <h2 className='text-3xl font-bello '>Treats</h2>

            <p className='text-sm '>Life is sweet, and so are we at <strong>Treats</strong>. Thank you for visiting out little corner of confectionery joy. We bake our desserts with love and the finest ingredient, just for your satisfaction.</p>
            <div className='mt-3 flex flex-col items-start'>
              <h3 className='text-lg'>Follow us on our sweet adventures!</h3>
              <div className=' flex gap-5 mt-3'>
                <FaFacebook className='w-7 h-7' />
                <FaInstagram className='w-7 h-7 '  />
                <FaTwitter className='w-7 h-7 ' />
              </div>
              


            </div>

          </div>
          <div className=''>
            <h2 className='font-semibold text-xl'>Visit Us</h2>
            <p className='text-sm'>123, Sugar Street, Flavor Town</p>
            <p className='text-sm'>+234 9056 426 356</p>
            <p className='text-sm'>hello@treats.com</p>

            <h4 className='font-semibold mt-3'>Hours of Operation:</h4>
            <p className='text-sm'>Mon-Fri: 8am -9pm</p>
            <p className='text-sm'>Sat-Sun: 9am- 10pm</p>
          </div>

          <div className='flex flex-col'>
            <h2 className='font-semibold text-xl'>Quick Links</h2>
            <Link to={'/'}>Home</Link>
            <Link to={'/shop'}>Shop</Link>
            <Link to={'/contact'}>Contact</Link>
            <Link to={'/privacy-policy'}>Privacy Policy</Link>
            <Link to={'/faq'}>FAQ</Link>

          </div>

          <div className='flex flex-col pr-7'>
            <h2 className='font-semibold mb-3'>Love our Treats? <br/>Share your experience!</h2>

            <h3>Please rate us</h3>

            <div className='flex gap-2'>
              {[...Array(5)].map((_, index) =>{
                
                return (

                  <Star

                    key={index}
                    className={`${ ratings >= index + 1  ? "fill-amber-500 stroke-amber-500" : "fill-none stroke-gray-400" }`}
                    onClick={() => handleRate(index)}

                    
                  />
                )
              })}
            </div>  

            <textarea rows={2} 
              className='p-2 mt-3 bg-white/20 placeholder:text-white w-[200px]' 
              placeholder='Leave us a review'
              value={comment}
              onChange={(e) => (setComment(e.target.value))}
            />
            <button className='flex gap-2 p-3 rounded-md bg-pink-300 mt-3 text-gray-900 items-center justify-center w-[100px]' onClick={submitReview} disabled={isLoading}>
              {isLoading ? "Sending..." : "Send" }
              </button>
          </div>
        </div>
        


      </div>
    
      
        
      
    </div>
  )
}

export default Footer
