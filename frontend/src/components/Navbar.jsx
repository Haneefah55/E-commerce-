import { Link, NavLink } from 'react-router'
import { Menu, ShoppingCart, X, LayoutDashboard, LogOut } from 'lucide-react'
import React, { useState } from 'react'
import { useAuthStore  } from '../store/userStore.js'
import logo from '/images/logo3.png'

const Navbar = () =>{
  
  const[menuOpen, setMenuOpen ] = useState(false)
  const[isOpen, setIsOpen ] = useState(false)
  
  const { user } = useAuthStore()
  
  const admin = user?.role === "admin"
  
  const handelLogout = async() =>{
    console.log("User Logout Succeefully")
  }
  
  return (
    <div className="fixed top-0 flex items-center justify-around bg-pink-600 font-[Merienda] shadow-md py-3 px-5 w-screen z-50 md:px-10 ">
      
    
      <Link to="/">
        <img src={logo} alt="logo" className="w-[80px] md:w-[100px]" />
      </Link>
      
      {/** Admin Dashboard**/}
      
      { admin && <Link to="/admin" className="flex font-bold gap-2 items-center justify-center rounded-sm bg-gray-100 p-2 text-pink-600">
        <LayoutDashboard className="w-5 h-5"/>
        <span className=" text-md ">Dashboard</span>
      </Link>
      }
      
      <div className="flex flex-wrap items-center justify-center">
        
      
        {/** Desktop nav*/}
        <nav className=" md:flex hidden  items-center justify-center gap-5 mr-3 font-[Merienda] group text-2xl text-gray-100 font-bold">
          <NavLink to="/" className={` ${({ isActive }) => isActive ? "active" : ""} hover:border-b-2 border-fuchsia-200`}>Home</NavLink>
          <NavLink to="/shop" className={` ${({ isActive }) => isActive ? "active" : ""} hover:border-b-2 border-fuchsia-200`}>Shop</NavLink>
          <NavLink to="/contact" className={` ${({ isActive }) => isActive ? "active" : ""} hover:border-b-2 border-fuchsia-200`}>Contact
          
          </NavLink>
          
    
          
        </nav>
        
        
        {/** Mobile nav*/}
        <nav className=" flex items-center justify-center gap-2 font-[Merienda] text-gray-100">
          <button className=" md:hidden"  >
            <Menu className=" md:hidden w-8 h-8" onClick={() => setMenuOpen(!menuOpen)}/>
          </button>
          
          {user  && !admin ? (
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center justify-center ml-4 relative">
              <ShoppingCart className="w-8 h-8 text-gray-100 " />
              <span className="absolute bg-gray-100 p-2 top-1 -right-1.5 flex items-center justify-center text-pink-600 text-xs w-3 h-3 text-center rounded-full">3</span>
              
            </button>) : !user &&  (
            <Link to="/signup" className=" p-2 font-bold bg-gray-100 ml-6 rounded-md text-pink-600">
              Sign Up
            </Link>)}
          
        </nav>
        
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
          
          <Link to="/cart" className="hover:border-b-2 border-pink-200">Cart</Link>
          <Link to="/user/order" className="hover:border-b-2 border-pink-200">Order</Link>
          <button onClick={handelLogout}>
            
            Logout
          </button>
        </nav>
        
        
      </div>
      
      
    </div>
  
  
  )
}

export default Navbar