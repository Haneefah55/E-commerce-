
import { Link } from 'react-router'


const AccountCreatedPage = () =>{
  
  
  
  return(
    <div className="w-full h-full flex items-center justify-center bg-center bg-cover overflow-hidden relative bg-no-repeat"
      style={{ backgroungImage: "url('/images/img1.jpg')" }}
    >
      <div className="flex absolute inset-0 bg-black/50 items-center justify-center" >
        <div className="w-[300px] h-[300px] bg-gray-100 flex items-center justify-center text-md text-center rounded-md flex-col font-[Merienda]">
          <p>Your account has been created successfully<br />Please Login to continue</p>
          <Link to="/login" className="w-[100px] p-2 bg-pink-600 mt-4 text-gray-100 ">Login</Link>
        </div>
      </div>
      
    </div>
  
  
  )
}

export default AccountCreatedPage
  