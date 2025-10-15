import { Link, NavLink } from 'react-router'
import { Menu, ShoppingCart, X, LayoutDashboard, LogOut } from 'lucide-react'
import React, { useEffect, useState } from 'react'
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

  const menu = document.getElementById('menu')
  const navMenu = document.getElementById('nav-menu')


  const handleShowMenu = (e) => {
      
      if(
      menu && 
      !menu.contains(e.target) &&
      navMenu && 
      !navMenu.contains(e.target) 
  
    
    ) {
      if(isOpen) setIsOpen(!isOpen)
      if(menuOpen) setMenuOpen(!menuOpen)
    }
    
    
  }

  useEffect(() => {


    

    window.addEventListener("mousedown", handleShowMenu)

    
    return () => window.removeEventListener("mousedown", handleShowMenu)

  }, [menu, handleShowMenu])
  
  return (
    <div className="fixed top-0 bg-white font-[Merienda] shadow-md py-3 px-2 sm:px-5 w-screen z-50 md:px-16 text-pink-500">
      <div className="flex items-center justify-around mx-10 md:gap-8">
        <Link to="/" className='font-bello md:mr-10  text-2xl md:text-3xl '>
        Treat
        </Link>

        <button className=" md:hidden flex"  >
          <Menu className="  w-8 h-8" onClick={() => setMenuOpen(!menuOpen)}/>
        </button>

        
                {/** nav*/}
        <nav className=" md:flex hidden ml-16 items-center justify-center gap-5 font-[Merienda] group text-xl  font-bold">
          <NavLink to="/" className={` ${({ isActive }) => isActive ? "active" : ""} hover:border-b-2 border-fuchsia-200`}>Home</NavLink>
          <div className='h-1.5 w-1.5 rounded-full bg-pink-200'/>
          <NavLink to="/shop" className={` ${({ isActive }) => isActive ? "active" : ""} hover:border-b-2 border-fuchsia-200`}>Shop</NavLink>
          <div className='h-1.5 w-1.5 rounded-full bg-pink-200'/>
          <NavLink to="/contact" className={` ${({ isActive }) => isActive ? "active" : ""} hover:border-b-2 border-fuchsia-200`}>Contact
          
          </NavLink>
          
    
          
        </nav>

        {user && !admin &&
          <nav className=" flex items-center justify-center ml-5 font-[Merienda] text-pink-500">
          
              
            <Link to={'/user/cart'} className=' flex mr-2 relative'
              >
              <ShoppingCart className="w-8 h-8 text-pink-500 " />
              { cart?.length > 0 && 

              <span className="absolute bg-pink-500 p-2 top-0 -right-1.5 flex items-center justify-center text-white text-xs w-3 h-3 text-center rounded-full">{cart?.length}</span>
              }
            </Link>

            <button
              onClick={() => setIsOpen(!isOpen)}
              id='useropen'
              className=" -ml-3 flex items-center justify-center "
            
            >
              
              <div className='w-7 h-7 ml-5 md:ml-9 bg-pink-600 text-white p-3 flex items-center justify-center rounded-full'>{user?.name?.charAt(0).toUpperCase()}</div>
              
              <p className='hidden md:block md:ml-3 text-xl font-semibold text-pink-600 capitalize'>{user?.name}</p>


            </button>

            
          </nav>  
        }

        {!user && 
          <Link to="/login" className=" p-2 font-bold  rounded-md bg-pink-600 text-white transition-colors hover:bg-transparent  hover:border-pink-600 hover:border-2 hover:text-pink-600 ">
                Login
          </Link>
        
        }
          
      

          {/** Admin Dashboard**/}
        { admin && <Link to="/admin" className="flex font-bold gap-2 items-center justify-center  text-pink-500">
          <LayoutDashboard className="w-7 h-7"/>
          <span className=" text-xl hidden lg:block ">Dashboard</span>
        </Link>
        }

        {/* Mobile dropdown nav**/}
        <nav className={`md:hidden absolute ${menuOpen ? "-translate-x-3/5" : "translate-x-full"} top-[100%]  bg-pink-600/50 backdrop-blur-lg w-[300px] h-[300px] flex font-[Merienda] font-bold text-gray-100 p-5 gap-5 items-center flex-col transition transform duration-300 right-0 `} id='nav-menu'>
          
          <button className="self-end" onClick={() => setMenuOpen(!menuOpen)} >
            <X className="w-8 h-8" />
          </button>
          <Link to="/" className="hover:border-b-2 border-pink-200">Home</Link>
          <Link to="/shop" className="hover:border-b-2 border-pink-200">Shop</Link>
          <Link to="/contact" className="hover:border-b-2 border-pink-200">Contact</Link>
          
        
        </nav>

        { /* User menu dropdown**/}
        <nav className={`  absolute ${isOpen ? "-translate-x-3/53" : "translate-x-full" } top-[100%]  bg-pink-600/50 backdrop-blur-lg w-[300px] h-screen  flex font-[Merienda] font-bold text-gray-100 p-5 gap-5 items-center flex-col transition transform duration-300 right-0`} id='menu' >
          <button className="self-end" onClick={() => setIsOpen(!isOpen)} >
            <X className="w-8 h-8" />
          </button>
          
          <Link to="/cart" className="hover:border-b-2 border-pink-200">Cart</Link>
          <Link to="/user/order" className="hover:border-b-2 border-pink-200">Orders</Link>
          <Link to="/user/wishlist" className="hover:border-b-2 border-pink-200">Wishlist</Link>
          <Link to="/user/settings" className="hover:border-b-2 border-pink-200">Settings</Link>
          <button onClick={handelLogout}>
            
            Logout
          </button>
        </nav>

      

      </div>
      
  
      

      
    </div>
  
  
  )
}

export default Navbar