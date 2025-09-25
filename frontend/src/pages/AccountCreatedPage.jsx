
import { Link } from 'react-router'
import { CheckCircle, HandHeart } from 'lucide-react'
import Confetti from 'react-confetti'

const AccountCreatedPage = () =>{
  
  
  
  return(
    <div className='h-screen w-screen flex items-center font-[Merienda] justify-center px-4'
    >

      <Confetti

        width={window.innerWidth}
        height={window.innerHeight}
        gravity={0.1}
        style={{ zIndex: 99 }}
        numberOfPieces={800}
        recycle={false}




      />
      <div className='max-w-md w-full bg-pink-200 rounded-lg shadow-xl overflow-hidden relative' >
        <div className='p-5 sm:p-6'>
          <div className='flex justify-center'>
            <CheckCircle className='text-purple-800 w-16 h-16 mb-4'/>

          </div>

          <h2 className='text-2xl font-bold text-center text-purple-800 mb-3'>Account Created Successful!</h2>
          <p className='text-center mb-3 text-sm text-pink-800'>Your account has been created successfully<br />Please Login to continue</p>

          <div className='space-y-4'>
            <button className='w-full bg-purple-950 hover:bg-purple-800 text-white font-bold py-2 px-4 rounded-lg transitions duration-300 flex items-center justify-center gap-2'>
              <HandHeart />
              Thanks for joining us!
            </button>
            <Link to='/shop' className='w-full bg-pink-800 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded-lg transitions duration-300 flex items-center gap-2 justify-center '>
             Login
            
            </Link>
          </div>
        </div>
       
      </div>
      
    </div>
  
  
  )
}

export default AccountCreatedPage
  