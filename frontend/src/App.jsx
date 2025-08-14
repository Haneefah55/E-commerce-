import { Routes, Route, useLocation } from 'react-router'
import { Toaster } from 'react-hot-toast'

import HomePage from './pages/HomePage.jsx'
import SignUpPage from './pages/SignUpPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'
import Navbar from './components/Navbar.jsx'
import AccountCreatedPage from './pages/AccountCreatedPage.jsx'

const App = () => {
  
  
  
  const pathname= useLocation().pathname
  const matchPaths = ['/signup', '/login', '/account-created' ];

  const isMatch = matchPaths.some(path => pathname.includes(path));
  

  return(
    <div className="relative overflow-x-hidden w-screen h-screen">
      {!isMatch && <Navbar />} 
      
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/account-created" element={<AccountCreatedPage />} />
        
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      
      <Toaster />
      
      
      
    </div>
  
  )
  
}

export default App