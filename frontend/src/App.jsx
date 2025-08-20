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



const RedirectAuthenticatedUser = ({ children }) =>{
  const { user } = useAuthStore()
  
  if(user){
    return <Navigate to="/" replace />
  }
  return children
}



const App = () => {
  
  const { user, checkAuth, checkingAuth } = useAuthStore()
  
  
  const pathname= useLocation().pathname
  const matchPaths = ['/signup', '/login', '/account-created' ];

  const isMatch = matchPaths.some(path => pathname.includes(path));
  
  useEffect(() =>{
    
    
    checkAuth()
  }, [checkAuth])
  
  if(checkingAuth) return <Loader />
  
  return(
    <div className="relative overflow-x-hidden w-screen h-screen">
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
        <Route path="/admin" element={<AdminPage />} />
        
      </Routes>
      
      <Toaster />
      
      
      
    </div>
  
  )
  
}

export default App