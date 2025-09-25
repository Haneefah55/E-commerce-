import React, { useState } from 'react'
import { useAuthStore } from '../store/userStore'
import { Eye, EyeOff, Loader, Lock } from 'lucide-react'

const SettingsTab = () => {

  const [oldPassword, setOldPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [isVisibleA, setIsVisibleA] = useState(false)
  const [isVisibleB, setIsVisibleB] = useState(false)
  const [isClick, setIsClick] = useState(false)
  const { logout, changePassword, isLoading } = useAuthStore()


 

  const handleToggleA = () =>{
    setIsVisibleA(!isVisibleA)
  }

  const handleToggleB = () =>{
    setIsVisibleB(!isVisibleB)
  }
  

  const handleLogout = async() =>{
    await logout()
  }

  const handleSubmit = async(e) =>{
    e.preventDefault()

    try {
      await changePassword(oldPassword, newPassword)
      
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="w-[300px] md:w-[400px] h-screen self-center items-center justify-center font-[Merienda] relative">
      <div className=' '>
        <button className='p-2 bg-pink-700 text-white block mb-4 ' onClick={handleLogout}>Logout</button>
        <button className='p-2 bg-pink-700 text-white  mb-4 block' 
          onClick={(e) => (setIsClick(!isClick))}
        >Change Password</button>
      </div>
    
     

      <div className={` absolute top-0 inset-0 ${isClick ? "flex" : " hidden"} w-[280px] h-auto flex-col font-[Merienda] bg-pink-100 items-center `}>
        <h3 className="bg-pink-600 text-transparent bg-clip-text font-bold ">Change Password</h3>

        <form className="w-full mt-6 h-auto flex flex-col space-y-6 " onSubmit={handleSubmit}>

          <div className="relative mb-3">
            <div className=" absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none ">
              <Lock className="size-6 text-fuchsia-400" />
            </div>
            
            <input
              type={!isVisibleA ? "password" : "text" }
              placeholder="Enter old Password"
              value={oldPassword}
              onChange={(e) => (setOldPassword(e.target.value))}
              className="w-full pr-3 py-2 pl-10 bg-gray-200 bg-opacity-50 rounded-lg border-2 border-fuchsia-400 outline-none focus:border-fuchsia-600 text-gray-900 placeholder:text-gray-900 transition duration-200"
            />
              
            <div 
              className=" absolute inset-y-0 right-0 flex items-center outline-none border-none pr-3 "
              onClick={handleToggleA}
            >
              {!isVisibleA ? <EyeOff className="size-5 text-fuchsia-400" /> : <Eye className="size-5 text-fuchsia-400" /> }
            
            </div>
            
          </div>

          <div className="relative mb-5">
            <div className=" absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none ">
              <Lock className="size-6 text-fuchsia-400" />
            </div>
            
            <input
              type={!isVisibleB ? "password" : "text" }
              placeholder="Enter new Password"
              value={newPassword}
              onChange={(e) => (setNewPassword(e.target.value))}
              className="w-full pr-3 py-2 pl-10 bg-gray-200 bg-opacity-50 rounded-lg border-2 border-fuchsia-400 outline-none focus:border-fuchsia-600 text-gray-900 placeholder:text-gray-900 transition duration-200"
            />
              
            <div 
              className=" absolute inset-y-0 right-0 flex items-center outline-none border-none pr-3 "
              onClick={handleToggleB}
            >
              {!isVisibleB ? <EyeOff className="size-5 text-fuchsia-400" /> : <Eye className="size-5 text-fuchsia-400" /> }
            
            </div>
            
          </div>

          <div className='flex gap-3 text-sm'>

            <button
              className=" py-2 px-5 mt-5 bg-pink-600 text-gray-100 font-semibold transform transition hover:scale-90 duration-200"
              type= "submit"
              diabled={isLoading}
          
            >            
              { isLoading ? <Loader className=" animate-spin mx-auto" size={24} /> : "Change Password"}
                                      
            </button>

            <button className=" py-2 px-5 mt-5 bg-pink-600 text-gray-100 font-semibold transform transition hover:scale-90 duration-200"
              onClick={(e) => (setIsClick(!isClick))}
            
            >Cancel</button>

          </div>
          
                



        </form>
        
      </div>


      

    </div>
  )
}

export default SettingsTab