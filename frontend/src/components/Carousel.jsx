import { Link } from 'react-router'

import welcome from '/images/welcome.png'

import React, { useState, useEffect } from 'react'

const Carousel = () =>{
  const [currentIndex, setCurrentIndex] = useState(0)
  
  const slides = [
    
    {
      url: "https://res.cloudinary.com/dnhttlxgv/image/upload/v1760784264/slide1_cglkf2.jpg",
      title: "Unconventional Treats, Unforgetable Flavours!",

      
    },
    {
      url: "https://res.cloudinary.com/dnhttlxgv/image/upload/v1760784277/slide2_iitl9i.jpg",
      title: "Indulge in Sweet Perfection",
      
    },
    {
      url: "https://res.cloudinary.com/dnhttlxgv/image/upload/v1760784301/slide3_zjzhwm.jpg",
      title: "Life is Sweet with Treats",
      
    },
  
  ]
  
  const prevSlide = () =>{
    const isFirstSlide = currentIndex === 0
    const newIndex = isFirstSlide ? slides.length -1 : currentIndex -1
    setCurrentIndex(newIndex)
  }
  
  const nextSlide = () =>{
    const isLastSlide = currentIndex === slides.length -1 
    const newIndex = isLastSlide ? 0 : currentIndex + 1
    
    setCurrentIndex(newIndex)
  }
  
  const goToSlide = (slideIndex) =>{
    setCurrentIndex(slideIndex)
  }
  
  
  useEffect(() =>{
    const interval = setInterval(nextSlide, 5000)
    return () => clearInterval(interval);
  }, [nextSlide])
  
  
  
  return(
    <div className="w-full h-full relative flex  group">
      <div className=" w-full h-full bg-center bg-cover duration-500"
        style={{ backgroundImage: `url(${slides[currentIndex].url})`}}
      >
        <div className="absolute font-[Merienda] inset-0 bg-black/50 flex mt-10 flex-col items-center justify-center">
            
          <img src={welcome} alt="welcome to treats" className="w-[200px] "/>
            
          <p className=" text-xs md:text-lg mt-5 text-center text-gray-100 ">
              {slides[currentIndex].title}
          </p>

          <Link to={'/shop'} className='bg-pink-600 text-white hover:bg-transparent hover:border-white hover:border-2 p-2 md:p-3 text-sm md:text-xl hover:text-white transition hover:translate-x-3 rounded-md  mt-4 '>Shop Now</Link>
            
            
        </div>
      
      </div>
      
      <div className="hidden group-hover:flex p-2 absolute top-[50%] -translate-x-0 translate-y-[50%] left-5 hover:bg-gray-200/20 text-2xl bg-black/20 hover:text-gray-900 text-gray-100 cursor-pointer">
        <button onClick={prevSlide}>&lt;</button>
      </div>
      
      <div className="hidden group-hover:flex p-2 absolute top-[50%] -translate-x-0 translate-y-[50%] right-5 text-2xl hover:bg-gray-200/20 hover:text-gray-900 bg-black/20 text-gray-100 cursor-pointer">
        <button onClick={nextSlide}>&gt;</button>
      </div>
      <div className=" absolute bottom-4 left-[50%] translate-y-0 -translate-x-[50%] flex gap-5  self-center py-2">
        {slides.map((slide, slideIndex) =>(
        
        <div 
          key={slideIndex}
          onClick={() => goToSlide(slideIndex)}
          className={`w-3 h-3 rounded-full ${slideIndex === currentIndex ? "bg-pink-200" : "bg-pink-700" } `}
        
        ></div>
        ))}
      </div>

    </div>
  
  
  
  )
}
export default Carousel
  