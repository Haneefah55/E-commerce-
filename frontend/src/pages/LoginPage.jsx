import { useAuthStore } from '../store/userStore.js'

import { useNavigate } from 'react-router'
import react, { useState } from 'react'
import { Lock, Mail, EyeOff, Eye, Loader } from 'lucide-react'
import { Link } from 'react-router'

const LoginPage = () =>{
  
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  //const [isLoading, setIsLoading] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const navigate = useNavigate()
  
  const { login, isLoading } = useAuthStore()
  
  const handleToggle = () =>{
    setIsVisible(!isVisible)
  }
  
  
  const handleLogin = async(e) =>{
    e.preventDefault()
    

    try {
      await login(email, password)
      
      navigate("/")
    } catch (error) {
      console.error(error);
    }
    
    
    
  }
  
  return(
  
    <div className="h-screen w-screen flex items-center justify-center bg-no-repeat bg-center relative"
      style={{ backgroundImage: "url('/images/signup.jpg')", backgroundSize: 'cover' }}
    >
      
      <div className="flex items-center justify-center bg-gray-950/40 absolute inset-0">
        <div className="">
          <div className="flex flex-col gap-4 ">
            <h2 className="font-bello text-5xl text-center bg-white text-transparent bg-clip-text font-semibold">Welcome to<br />Treats</h2>
            
          </div>
          <div className="mt-10 flex flex-col items-center justify-center font-[Merienda]">
            <h3 className="text-2xl font-bold text-transparent bg-fuchsia-300 bg-clip-text text-center">Welcome Back</h3>
            <div className="w-[330px] md:w-[400px]  h-auto mt-5 p-3 flex flex-col items-center justify-center">
              <form onSubmit={handleLogin}>
                
                
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
                  <p className="text-gray-400">Don't have an account</p>
                  <Link to="/signup" className="text-blue-500 hover:underline">Sign Up</Link>
                </div>
                <button
                  className="w-full py-2 px-5 mt-5 bg-gradient-to-r from-purple-500 to-fuchsia-400 text-gray-200 font-semibold transform transition hover:scale-90 duration-200"
                  type= "submit"
                  diabled={isLoading ? "true" : "false"}
              
                >            
                  { isLoading ? <Loader className=" animate-spin mx-auto" size={24} /> : "Login"}
                                         
                </button>

              </form>
            </div>
          </div>
          
      
        </div>
        
        
      </div>
    
  
      
      
    </div>
  )
}

export default LoginPage
  

