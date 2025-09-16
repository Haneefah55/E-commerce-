import { Routes, Route, useLocation, Navigate } from 'react-router'
import { Toaster } from 'react-hot-toast'
import React, { useEffect } from 'react'

import { useAuthStore } from './store/userStore.js'

import HomePage from './pages/HomePage.jsx'
import SignUpPage from './pages/SignUpPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'
import Navbar from './components/Navbar.jsx'
import AccountCreatedPage from './pages/AccountCreatedPage.jsx'
import AdminPage from './pages/AdminPage.jsx'
import Loader from './components/Loader.jsx'
import EditProduct from './components/EditProduct.jsx'
import ShopPage from './pages/ShopPage.jsx'
import CategoryPage from './pages/CategoryPage.jsx'
import { useCartStore } from './store/cartStore.js'
import CartPage from './pages/CartPage.jsx'
import Footer from './components/Footer.jsx'


const RedirectAuthenticatedUser = ({ children }) =>{
  const { user } = useAuthStore()
  
  if(user){
    return <Navigate to="/" replace />
  }
  return children
}



const App = () => {
  
  const { user, checkAuth, checkingAuth, getWishlist } = useAuthStore()

  const { getCartItems } = useCartStore()
  
  
  const pathname= useLocation().pathname
  const matchPaths = ['/signup', '/login', '/account-created' ];

  const isMatch = matchPaths.some(path => pathname.includes(path));
  //console.log(wishlist)

  
  
  useEffect(() =>{
    
    
    checkAuth()
  }, [checkAuth])

  useEffect(() => {
    getCartItems()

  }, [getCartItems])

  useEffect(() => {
    getWishlist()

    
  }, [getWishlist])
  
  
  if(checkingAuth) return <Loader />
  
  return(
    <div className="relative  w-screen h-screen overflow-auto [&::-webkit-scrollbar]:w-3 [&::-webkit-scrollbar-track]:bg-pink-200 [&::-webkit-scrollbar-thumb]:bg-pink-700 ">
      {!isMatch && <Navbar />} 
      
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={
          <RedirectAuthenticatedUser>
          <SignUpPage />
          </RedirectAuthenticatedUser>
      
          
        } />
        <Route path="/login" element={
          <RedirectAuthenticatedUser>
          <LoginPage />
          </RedirectAuthenticatedUser>
      
          
        } />
        
        
        <Route path="/account-created" element={<AccountCreatedPage />} />
        
        <Route path="*" element={<NotFoundPage />} />

        <Route path="/admin" element={ user?.role === "admin" ? <AdminPage /> : <Navigate to={'/login'} replace />} />

        <Route path="/shop" element={<ShopPage />} />

        <Route path="/user/cart" element={ user ? <CartPage /> : <Navigate to={'/login'} replace />} />

        <Route path="/edit-product/:id" element={ user?.role === "admin" ? <EditProduct /> : <Navigate to={'/login'} replace />}  />

        <Route path="/category/:category" element={<CategoryPage />} />
        
      </Routes>
      
      <Toaster />


      {!isMatch && <Footer />} 
      
      
      
    </div>
  
  )
  
}

export default App