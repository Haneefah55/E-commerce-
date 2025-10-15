import React, { useEffect, useState } from 'react'
import { Truck, Trash2, UserPen, UserLock, Lock, EyeOff, Eye, Loader } from 'lucide-react'
import { useAuthStore } from '../store/userStore.js'

const UserSettingsPage = () => {
  //const [show, setShow] = useState(false)

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")

  const { user } = useAuthStore()
  
  console.log("user", user)
  const [oldPassword, setOldPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [isVisibleA, setIsVisibleA] = useState(false)
  const [isVisibleB, setIsVisibleB] = useState(false)

  const { changePassword, isLoading, addShippingAddress, editProfile, deleteUser } = useAuthStore()


  

  const handleToggleA = () =>{
    setIsVisibleA(!isVisibleA)
  }

  const handleToggleB = () =>{
    setIsVisibleB(!isVisibleB)
  }

  const [activeTab, setActiveTab ] = useState("")

  const tabs = [
    {
      id: "edit-profile",
      label: "Edit Profile",
      icon: UserPen,
    
    },
    {
      id: "edit-address",
      label: "Edit Shipping Address",
      icon: Truck,
      
    },
    {
      id: "change-password",
      label: "Change Password",
      icon: UserLock,
      
    },
    {
      id: "delete",
      label: "Delete Account",
      icon: Trash2,
      
    },
    
  ]

  const handleCancel = () =>{
    setActiveTab("")
  }

  const handlePasswordChange =async(e) =>{
    e.preventDefault
    await changePassword(oldPassword, newPassword)
    console.log('sumbitted')
  }

  const date = new Date(user?.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  
  })

  
  
  
   
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

  const handleSubmitAddress = async(e) =>{

    e.preventDefault()

  
    try {
      await addShippingAddress(address)

   
    } catch (error) {
      
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

  const handleUpdateProfile = async(e) =>{
    e.preventDefault()
    console.log("submitted", name, email)

    try {
      await editProfile(name, email)

    
    } catch (error) {
      console.log(error)
    }

    setName("")
    setEmail("")
    
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

  

  useEffect(() => {

    if(user){
      setName(user.name || "")
      setEmail(user.email || "")
    }


  }, [user])


  
  return (
    <div className='bg-pink-100 font-[Merienda] w-screen min-h-screen py-10 relative'>
      <div className='flex flex-col items-center justify-center mx-auto my-10 px-4 md:px-8 '>

        <div className="bg-pink-700 bg-clip-text text-transparent font-bold mt-16 text-3xl font-bello">
          User Settings
        </div>

        {/** tabs */}

        <div className="flex mt-4 justify-center mb-3">
          {tabs.map((tab) => (
            <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={` flex items-center mb-3 justify-center px-4 gap-3 font-[Merienda] py-2 mr-2 transition-colors duration-200 ${activeTab === tab.id ? "bg-pink-800 text-gray-100 " : "bg-pink-600 rounded-sm text-white hover:text-pink-800 hover:bg-pink-200"}`} >
              <tab.icon className="font-bold h-5 w-5" />
              
              <span className=" hidden md:flex text-xs sm:text-md ">{tab.label} </span>
            </button>
          ))}
        </div>

        {/** user info */}

        <div className={`w-full max-w-md p-2 ${activeTab === "" ? "flex" : "hidden" }`}>
          <div className='bg-white w-full rounded-lg shadow-lg flex flex-col px-5 py-8 justify-center'>
            <h3 className='text-pink-700 text-center font-bold'> User Profile</h3>

            <div className='flex gap-4 mt-3 items-center justify-between'>
              <p>Name:</p>
              <p className='text-sm font-semibold'>{user?.name}</p>
            </div>

            <div className='flex gap-4 mt-3 items-center justify-between'>
              <p>Email:</p>
              <p className='text-sm font-semibold'>{user?.email}</p>
            </div>

            <div className='flex flex-col gap-1 mt-3 '>
              <p>Shipping Details:</p>
              <p className='text-sm mt-2 font-semibold'>{addressJoin ? addressJoin : "No shipping details added"}</p>
              <p>{phoneNo ? phoneNo : ""}</p>
              <p>{postalCode ? postalCode : ""}</p>
            </div>

            <div className='flex gap-4 mt-3 items-center justify-between'>
              <p>Joined:</p>
              <p className='text-sm font-semibold'>{date}</p>
            </div>
          </div>
        </div>

        {/*** delete acount tab */}

        <div className={`w-full max-w-md p-2 ${activeTab === "delete" ? "flex" : "hidden" }`}>
          <div className='bg-white rounded-lg shadow-lg flex flex-col px-5 py-8 items-center justify-center'>
            <h3 className='text-sm mb-4 sm:text-lg text-center text-pink-800 '>Are you sure you want to delete your account?</h3>

            <div className=' flex items-center gap-3 justify-center'>
              <button className='p-2 bg-pink-700 rounded-md text-white hover:bg-transparent hover:border-2 border-pink-700 hover:text-pink-700 hover:-translate-x-3 transition duration-300'
                onClick={deleteUser}
              
              >Delete</button>
              <button className='p-2 bg-pink-700 rounded-md text-white hover:bg-transparent hover:border-2 border-pink-700 hover:text-pink-700 hover:translate-x-3 transition duration-300'
                
              onClick={handleCancel}
              >Cancel</button>
            </div>
          </div>

        </div>
        {/** change password tab */}

        <div className={`w-full max-w-md p-2 ${activeTab === "change-password" ? "flex" : "hidden" }`}>
          <div className='bg-white w-full rounded-lg shadow-lg flex flex-col px-5 py-8 items-center justify-center'>
            <h3>Change Password</h3>


            <form className="w-full mt-6 h-auto flex flex-col space-y-6 " onSubmit={handlePasswordChange}>

              <div className="relative mb-3">
                <div className=" absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none ">
                  <Lock className="size-6 text-pink-400" />
                </div>
                
                <input
                  type={!isVisibleA ? "password" : "text" }
                  placeholder="Enter old Password"
                  value={oldPassword}
                  onChange={(e) => (setOldPassword(e.target.value))}
                  className="w-full pr-3 py-2 pl-10 bg-gray-200 bg-opacity-50 rounded-lg border-2 border-pink-400 outline-none focus:border-pink-600 text-gray-900 placeholder:text-gray-900 transition duration-200"
                />
                  
                <div 
                  className=" absolute inset-y-0 right-0 flex items-center outline-none border-none pr-3 "
                  onClick={handleToggleA}
                >
                  {!isVisibleA ? <EyeOff className="size-5 text-pink-400" /> : <Eye className="size-5 text-pink-400" /> }
                
                </div>
                
              </div>

              <div className="relative mb-5">
                <div className=" absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none ">
                  <Lock className="size-6 text-pink-400" />
                </div>
                
                <input
                  type={!isVisibleB ? "password" : "text" }
                  placeholder="Enter new Password"
                  value={newPassword}
                  onChange={(e) => (setNewPassword(e.target.value))}
                  className="w-full pr-3 py-2 pl-10 bg-gray-200 bg-opacity-50 rounded-lg border-2 border-pink-400 outline-none focus:border-pink-600 text-gray-900 placeholder:text-gray-900 transition duration-200"
                />
                  
                <div 
                  className=" absolute inset-y-0 right-0 flex items-center outline-none border-none pr-3 "
                  onClick={handleToggleB}
                >
                  {!isVisibleB ? <EyeOff className="size-5 text-pink-400" /> : <Eye className="size-5 text-pink-400" /> }
                
                </div>
                
              </div>

              <div className='flex gap-3 items-center justify-center text-sm'>

                <button
                  className=" py-2 px-2 md:px-5 mt-5 bg-pink-600 text-gray-100 font-semibold transform transition hover:scale-90 duration-200"
                  type= "submit"
                  diabled={isLoading}
              
                >            
                  { isLoading ? <Loader className=" animate-spin mx-auto" size={24} /> : "Change Password"}
                                          
                </button>

                <button className=" py-2 px-2 md:px-5 mt-5 bg-pink-600 text-gray-100 font-semibold transform transition hover:scale-90 duration-200"
                  onClick={handleCancel}
                
                >Cancel</button>

              </div>
              
                    



            </form>
          </div>

        </div>

        {/*** change shippinh adrress */}

        <div className={`w-full max-w-md items-center p-2 ${activeTab === "edit-address" ? "flex" : "hidden"}`}>
          <div className='bg-white w-full rounded-lg shadow-lg flex flex-col px-5 py-8 items-center justify-center'>
            <h3>Edit Shipping address</h3>

            <form className='w-full mt-4 flex flex-col space-y-6' onSubmit={handleSubmitAddress}>
              <input
                type='text'
                name="name"
                placeholder='Name'
                value={address.name}
                required
                onChange={handleAddressChange}
                className="w-full py-2 px-4 bg-white/30 bg-opacity-50 rounded-md border-2 border-pink-400 outline-none focus:border-pink-600 text-purple-800 transition duration-200 "

              />

              <input
                type='text'
                name="street"
                placeholder='Street'
                value={address.street}
                required
                onChange={handleAddressChange}
                className="w-full py-2 px-4 bg-white/30 bg-opacity-50 rounded-md border-2 border-pink-400 outline-none focus:border-pink-600 text-purple-800  transition duration-200 "

              />

              <input
                type='text'
                name="city"
                placeholder='City'
                value={address.city}
                required
                onChange={handleAddressChange}
                className="w-full py-2 px-4 bg-white/30 bg-opacity-50 rounded-md border-2 border-pink-400 outline-none focus:border-pink-600 text-purple-800  transition duration-200 "

              />

              <input
                type='text'
                placeholder='Zipcode'
                name="zipCode"
                value={address.zipCode}
                
                onChange={handleAddressChange}
                className="w-full py-2 px-4 bg-white/30 bg-opacity-50 rounded-md border-2 border-pink-400 outline-none focus:border-pink-600  transition duration-200 "

              />

              <input
                type='text'
                name="state"
                placeholder='State'
                value={address.state}
                required
                onChange={handleAddressChange}o
                className="w-full py-2 px-4 bg-white/30 bg-opacity-50 rounded-md border-2 border-pink-400 outline-none focus:border-pink-600  transition duration-200 "

              />

              <input
                type='number'
                placeholder='Phone Number'
                name="phoneNo"
                value={address.phoneNo}
                required
                onChange={handleAddressChange}
                className="w-full py-2 px-4 bg-white/30 bg-opacity-50 rounded-md border-2 border-pink-400 outline-none focus:border-pink-600  transition duration-200 "

              />
              <div className='flex items-center gap-3 justify-center mt-3'>

                <button
                  className="w-full py-2 px-5 mt-5 bg-pink-800 text-gray-100 font-semibold transform transition hover:scale-90 duration-200"
                  type= "submit"
                  diabled={isLoading}
              
                >            
                  { isLoading ? "Submitting" : "Submit"}
                                        
                </button>
                <button type='cancel' className="w-full py-2 px-5 mt-5 bg-pink-800 text-gray-100 font-semibold transform transition hover:scale-90 duration-200" onClick={handleCancel}>Cancel</button>
              </div>

              
            </form>

            
          </div>
        </div>


        {/*** EDIT PROFILE */}

        <div className={`w-full max-w-md items-center p-2 ${activeTab === "edit-profile" ? "flex" : "hidden"}`}>
          <div className='bg-white w-full rounded-lg shadow-lg flex flex-col px-5 py-8 items-center justify-center'>
            <h3>Edit Profile</h3>

            <form className='w-full mt-4 flex flex-col space-y-6' onSubmit={handleUpdateProfile}>
              <input
                type='text'
                name="name"
                placeholder='Name'
                value={name}
                required
                onChange={(e) => (setName(e.target.value))}
                className="w-full py-2 px-4 bg-white/30 bg-opacity-50 rounded-md border-2 border-pink-400 outline-none focus:border-pink-600  transition duration-200 "

              />

              <input
                type='text'
                name="email"
                placeholder='Email'
                value={email}
                required
                onChange={(e) => (setEmail(e.target.value))}
                className="w-full py-2 px-4 bg-white/30 bg-opacity-50 rounded-md border-2 border-pink-400 outline-none focus:border-pink-600 transition duration-200 "

              />

              <div className='flex items-center gap-3 justify-center mt-3'>

                <button
                  className="w-full py-2 px-5  bg-pink-800 text-gray-100 font-semibold transform transition hover:scale-90 duration-200"
                  type= "submit"
                  diabled={isLoading}
              
                >            
                  { isLoading ? "Submitting" : "Submit"}
                                        
                </button>
                <button type='cancel' className="w-full py-2 px-5 bg-pink-800 text-gray-100 font-semibold transform transition hover:scale-90 duration-200" onClick={handleCancel}>Cancel</button>
              </div>


            </form>

          </div>
        </div>
          

      </div>

    </div>

  )
}

export default UserSettingsPage




const EditProfile = () => (
  <div>eidt profile</div>
)