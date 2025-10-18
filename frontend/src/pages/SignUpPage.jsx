
import react, { useState } from 'react'
import { Lock, User, Mail, EyeOff, Eye, Loader, CheckCircle, HandHeart  } from 'lucide-react'
import { Link } from 'react-router'
import { useNavigate } from 'react-router'
import logo from '/images/logo1.png'
import { useAuthStore } from '../store/userStore.js'

import Confetti from 'react-confetti'

const SignUpPage = () =>{
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
 // const [isLoading, setIsLoading] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  
  const navigate = useNavigate()
  const [isCreated, setIsCreated] = useState(false)
  
  const { signup, isLoading } = useAuthStore()
  
  
  const handleToggle = () =>{
    setIsVisible(!isVisible)
  }
  
  
  const handleSignup = async(e) =>{
    e.preventDefault()
    

    try {
      await signup(name, email, password)

      setIsCreated(true)
      
      
    } catch (error) {
      console.error(error);
      setIsCreated(false)
    }
    
    
    
  }
  
  return(
  
    <div className="h-screen w-screen flex items-center justify-center bg-no-repeat bg-center relative"
      style={{ backgroundImage: `url(${isCreated ? "" : "https://res.cloudinary.com/dnhttlxgv/image/upload/v1760784538/signup_bueyyc.jpg"})`, backgroundSize: 'cover' }}
    >
      
      <div className={` ${isCreated ? "hidden" : "flex"} items-center justify-center bg-gray-950/40 absolute p-2 inset-0`}>
        <div className="">
          <div className="flex flex-col items-center justify-center ">
            <h2 className="font-bello text-5xl text-center bg-white text-transparent bg-clip-text font-semibold">Welcome to<br />Treats</h2>
            
          </div>
          <div className="mt-10 flex flex-col items-center justify-center font-[Merienda] ">
            <h3 className="text-2xl font-bold text-transparent bg-fuchsia-300 bg-clip-text text-center">Create Account</h3>
            <div className="w-[330px] md:w-[400px]  h-auto mt-5 p-3 flex flex-col items-center justify-center">
              <form onSubmit={handleSignup}>
                <div className="relative mb-5">
                  <div className=" absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none ">
                    <User className="size-6 text-fuchsia-400" />
                  </div>
                  
                  <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => (setName(e.target.value))}
                    className="w-full pr-3 py-2 pl-10 bg-white/30 bg-opacity-50 rounded-md border-2 border-fuchsia-400 outline-none focus:border-fuchsia-600 text-gray-900 placeholder:text-gray-900 transition duration-200"
                    
                    />
                    
                  
                  
                </div>
                
                <div className="relative mb-5">
                  <div className=" absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none ">
                    <Mail className="size-6 text-fuchsia-400" />
                  </div>
                  
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => (setEmail(e.target.value))}
                    className="w-full pr-3 py-2 pl-10 bg-white/30 bg-opacity-50 rounded-md border-2 border-fuchsia-400 outline-none focus:border-fuchsia-600 text-gray-900 placeholder:text-gray-900 transition duration-200"
                    
                    />
                    
                  
                  
                </div>
                
                <div className="relative mb-5">
                  <div className=" absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none ">
                    <Lock className="size-6 text-fuchsia-400" />
                  </div>
                  
                  <input
                    type={!isVisible ? "password" : "text" }
                    placeholder="Password"
                    value={password}
                    onChange={(e) => (setPassword(e.target.value))}
                    className="w-full pr-3 py-2 pl-10 bg-gray-200 bg-opacity-50 rounded-lg border-2 border-fuchsia-400 outline-none focus:border-fuchsia-600 text-gray-900 placeholder:text-gray-900 transition duration-200"
                  />
                    
                  <div 
                    className=" absolute inset-y-0 right-0 flex items-center outline-none border-none pr-3 "
                    onClick={handleToggle}
                  >
                    {!isVisible ? <EyeOff className="size-5 text-fuchsia-400" /> : <Eye className="size-5 text-fuchsia-400" /> }
                  
                  </div>
                  
                </div>
                
                
                <div className="flex mb-3 text-xs gap-2 items-center justify-center">
                  <p className="text-gray-400">Already have an account</p>
                  <Link to="/login" className="text-blue-500 hover:underline">Login</Link>
                </div>
                <button
                  className="w-full font-semibold py-2 px-5 mt-5 bg-gradient-to-r from-purple-500 to-fuchsia-400 text-gray-200 transform transition hover:scale-90 duration-200"
                  type= "submit"
                  diabled={isLoading}
              
                >            
                  { isLoading ? <Loader className=" animate-spin mx-auto" size={24} /> : "Sign Up"}
                                         
                </button>

              </form>
            </div>
          </div>
          
      
        </div>
        
        
      </div>

      {isCreated && <AccountCreated />}
    
  
      
      
    </div>
  )
}

export default SignUpPage


const AccountCreated = () =>(
  <div className='absolut inset-0 h-screen w-screen flex items-center font-[Merienda] justify-center px-4'
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
          <Link to='/login' className='w-full bg-pink-800 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded-lg transitions duration-300 flex items-center gap-2 justify-center '>
            Login
          
          </Link>
        </div>
      </div>
      
    </div>
      
  </div>
)