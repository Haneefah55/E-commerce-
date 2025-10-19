import { Routes, Route, useLocation, Navigate, Router } from 'react-router'
import { Toaster } from 'react-hot-toast'
import React, { useEffect } from 'react'

import { useAuthStore } from './store/userStore.js'

import HomePage from './pages/HomePage.jsx'
import SignUpPage from './pages/SignUpPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'
import Navbar from './components/Navbar.jsx'
import AdminPage from './pages/AdminPage.jsx'
import Loader from './components/Loader.jsx'
import EditProduct from './components/EditProduct.jsx'
import ShopPage from './pages/ShopPage.jsx'
import CategoryPage from './pages/CategoryPage.jsx'
import { useCartStore } from './store/cartStore.js'
import CartPage from './pages/CartPage.jsx'
import Footer from './components/Footer.jsx'
import CheckoutPage from './pages/CheckoutPage.jsx'
import PaymentPage from './pages/PaymentPage.jsx'
import PaymentSuccess from './pages/PaymentSuccess.jsx'
import PaymentFailed from './pages/PaymentFailed.jsx'
import OrderPage from './pages/OrderPage.jsx'
import WishlistPage from './pages/WishlistPage.jsx'
import UserSettingsPage from './pages/UserSettingsPage.jsx'
import ProductPage from './pages/ProductPage.jsx'
import SearchResultPage from './pages/SearchResultPage.jsx'
import ScrollToTop from './components/ScrollToTop.jsx'


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
  const matchPaths = ['/signup', '/login', '/purchase-success', '/purchase-failed' ];

  const isMatch = matchPaths.some(path => pathname.includes(path));
  //console.log(wishlist)

  
  
  useEffect(() =>{
    
    checkAuth()
    
  }, [checkAuth])

  useEffect(() => {
    if(user){
      getCartItems()
    }
    

  }, [user])

  useEffect(() => {
   

    if(user){
    getWishlist()
    }

    
    
  }, [user])
  
  

  
  return(
    <div className="relative  w-screen h-screen overflow-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-pink-200 [&::-webkit-scrollbar-thumb]:bg-pink-700 ">
      {!isMatch && <Navbar />} 

    
        <ScrollToTop />

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
          
        
          
          <Route path="*" element={<NotFoundPage />} />

          <Route path="/admin" element={ user?.role === "admin" ? <AdminPage /> : <Navigate to={'/login'} replace />} />

          <Route path="/shop" element={<ShopPage />} />

          <Route path="/user/cart" element={ user ? <CartPage /> : <Navigate to={'/login'} replace />} />
          <Route path="/user/order" element={ user ? <OrderPage /> : <Navigate to={'/login'} replace />} />
          <Route path="/user/wishlist" element={ user ? <WishlistPage /> : <Navigate to={'/login'} replace />} />
          <Route path="/user/settings" element={ user ? <UserSettingsPage /> : <Navigate to={'/login'} replace />} />
          <Route path="/checkout-page" element={ user ? <CheckoutPage /> : <Navigate to={'/login'} replace />} />
          <Route path="/payment" element={ user ? <PaymentPage /> : <Navigate to={'/login'} replace />} />
          <Route path="/purchase-success/:id" element={ <PaymentSuccess />} />
          <Route path="/purchase-failed" element={ user ? <PaymentFailed /> : <Navigate to={'/login'} replace />} />

          <Route path="/edit-product/:id" element={ user?.role === "admin" ? <EditProduct /> : <Navigate to={'/login'} replace />}  />

          <Route path="/category/:category" element={<CategoryPage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/search" element={<SearchResultPage />} />
          
        </Routes>
  
      
      
      <Toaster />


      {!isMatch && <Footer />} 
      
      
      
    </div>
  
  )
  
}

export default App