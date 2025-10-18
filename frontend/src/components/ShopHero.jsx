import React from 'react'

import welcome from '/images/welcome.png'
import { Link } from 'react-router'
import { ArrowLeft } from 'lucide-react'



const ShopHero = () => {




  return (
    <div className="w-full h-full flex">
      <div className=" w-full h-full flex bg-center relative bg-cover duration-500"
        style={{ backgroundImage: `url("https://res.cloudinary.com/dnhttlxgv/image/upload/v1760784232/herobg_ulfw8u.jpg"})` }}>
        <div className="absolute font-[Merienda] inset-0 bg-black/50 flex mt-10 flex-col items-center justify-center">
            
          <img src={welcome} alt="welcome to treats" className="w-[120px]  md:w-[200px] "/>
            
          <p className=" text-sm md:text-lg mt-5  text-center text-gray-100 ">
              Unconventional Treats, Unforgetable Flavours.<br /> Your Happy Place Awaits!
          </p>

          <Link to={'/'} className='text-pink-300 text-sm flex gap-2  p-3  transition-transform hover:translate-x-3 mt-4 '>
          <ArrowLeft />
          
          Back to Home</Link>
            
            
        </div>



      </div>
      
    </div>
  )
}

export default ShopHero
