
import react, { useState } from 'react'
import { Lock, User, Mail, EyeOff, Eye, Loader } from 'lucide-react'
import { Link } from 'react-router'
import { useNavigate } from 'react-router'
import logo from '/images/logo1.png'
import { useAuthStore } from '../store/userStore.js'

const SignUpPage = () =>{
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
 // const [isLoading, setIsLoading] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  
  const navigate = useNavigate()
  
  const { signup, isLoading } = useAuthStore()
  
  
  const handleToggle = () =>{
    setIsVisible(!isVisible)
  }
  
  
  const handleSignup = async(e) =>{
    e.preventDefault()
    

    try {
      await signup(name, email, password)
      
      navigate("/account-created")
    } catch (error) {
      console.error(error);
    }
    
    
    
  }
  
  return(
  
    <div className="h-screen w-screen flex items-center justify-center bg-no-repeat bg-center relative"
      style={{ backgroundImage: "url('/images/signup.jpg')", backgroundSize: 'cover' }}
    >
      
      <div className="flex items-center justify-center bg-gray-950/40 absolute p-2 inset-0">
        <div className="">
          <div className="flex flex-col items-center justify-center ">
            <h2 className="font-bello text-4xl text-center bg-white/60 text-transparent bg-clip-text font-bold">Welcome to</h2>
            <img src={logo} alt="logo" className="w-[120px]" />
            
          </div>
          <div className="mt-10 flex flex-col items-center justify-center font-[Merienda] mt-5">
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
    
  
      
      
    </div>
  )
}

export default SignUpPage
  