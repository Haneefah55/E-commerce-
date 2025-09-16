import { Link, NavLink } from 'react-router'
import { Menu, ShoppingCart, X, LayoutDashboard, LogOut } from 'lucide-react'
import React, { useState } from 'react'
import { useAuthStore  } from '../store/userStore.js'
import { useNavigate } from 'react-router'
import { useCartStore } from '../store/cartStore.js'

const Navbar = () =>{
  
  const[menuOpen, setMenuOpen ] = useState(false)
  const[isOpen, setIsOpen ] = useState(false)
  
  const navigate = useNavigate()
  const { user, logout } = useAuthStore()
  const { cart } = useCartStore()
  
  const admin = user?.role === "admin"
  
  const handelLogout = async() =>{
    await logout()
    navigate("/")
  }
  
  return (
    <div className="fixed top-0 flex items-center justify-around bg-white font-[Merienda] shadow-md py-3 px-5 w-screen z-50 md:px-10 text-pink-500">
      
    
      <Link to="/" className='font-bello  text-2xl md:text-3xl '>
        Treat
      </Link>

      <div className='flex gap-20 items-center justify-center'>

                {/** Desktop nav*/}
        <nav className=" md:flex hidden  items-center justify-center gap-5 font-[Merienda] group text-xl  font-bold">
          <NavLink to="/" className={` ${({ isActive }) => isActive ? "active" : ""} hover:border-b-2 border-fuchsia-200`}>Home</NavLink>
          <div className='h-1.5 w-1.5 rounded-full bg-pink-200'/>
          <NavLink to="/shop" className={` ${({ isActive }) => isActive ? "active" : ""} hover:border-b-2 border-fuchsia-200`}>Shop</NavLink>
          <div className='h-1.5 w-1.5 rounded-full bg-pink-200'/>
          <NavLink to="/contact" className={` ${({ isActive }) => isActive ? "active" : ""} hover:border-b-2 border-fuchsia-200`}>Contact
          
          </NavLink>
          
    
          
        </nav>
    
        
        {/** Mobile nav*/}
        <nav className=" flex items-center justify-center gap-2 font-[Merienda] text-pink-500">
          <button className=" md:hidden mr-10"  >
            <Menu className="  w-8 h-8" onClick={() => setMenuOpen(!menuOpen)}/>
          </button>
          
          {user  && !admin ? (
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center justify-center relative">
              <ShoppingCart className="w-8 h-8 text-pink-500 " />
              { cart?.length > 0 && 

              <span className="absolute bg-pink-500 p-2 top-0 -right-1.5 flex items-center justify-center text-white text-xs w-3 h-3 text-center rounded-full">{cart?.length}</span>
              }
            </button>) : !user &&  (
            <Link to="/login" className=" p-2 font-bold  rounded-md bg-pink-600 text-white transition-colors hover:bg-transparent  hover:border-pink-600 hover:border-2 hover:text-pink-600 ">
              Login
            </Link>)}
          
        </nav>

          {/** Admin Dashboard**/}
        { admin && <Link to="/admin" className="flex font-bold gap-2 items-center justify-center  text-pink-500">
          <LayoutDashboard className="w-7 h-7"/>
          <span className=" text-xl hidden lg:block ">Dashboard</span>
        </Link>
        }
      

      </div>

      
      {/* Mobile dropdown nav**/}
      <nav className={`md:hidden absolute ${menuOpen ? "-translate-x-3/5" : "translate-x-full"} top-[100%]  bg-pink-600/50 backdrop-blur-lg w-[300px] h-[300px] flex font-[Merienda] font-bold text-gray-100 p-5 gap-5 items-center flex-col transition transform duration-300 right-0 `}>
        
        <button className="self-end" onClick={() => setMenuOpen(!menuOpen)} >
          <X className="w-8 h-8" />
        </button>
        <Link to="/" className="hover:border-b-2 border-pink-200">Home</Link>
        <Link to="/shop" className="hover:border-b-2 border-pink-200">Shop</Link>
        <Link to="/contact" className="hover:border-b-2 border-pink-200">Contact</Link>
        
      
      </nav>
      
      { /* User menu dropdown**/}
      <nav className={`  absolute ${isOpen ? "-translate-x-3/53" : "translate-x-full" } top-[100%]  bg-pink-600/50 backdrop-blur-lg w-[300px] h-[300px]  flex font-[Merienda] font-bold text-gray-100 p-5 gap-5 items-center flex-col transition transform duration-300 right-0`} >
        <button className="self-end" onClick={() => setIsOpen(!isOpen)} >
          <X className="w-8 h-8" />
        </button>
        
        <Link to="/user/cart" className="hover:border-b-2 border-pink-200"> Cart</Link>
        <Link to="/user/order" className="hover:border-b-2 border-pink-200">Order</Link>
        <Link to="/user/wishlist" className="hover:border-b-2 border-pink-200">My WishList</Link>
        <button onClick={handelLogout}>
          
          Logout
        </button>
      </nav>
        
        
      

      
    </div>
  
  
  )
}

export default Navbar