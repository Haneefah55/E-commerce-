import img1 from '/images/slide1.jpg'
import img2 from '/images/slide2.jpg'
import img3 from '/images/slide3.jpg'
import welcome from '/images/welcome.png'

import React, { useState, useEffect } from 'react'

const Carousel = () =>{
  const [currentIndex, setCurrentIndex] = useState(0)
  
  const slides = [
    
    {
      url: img1,
      
    },
    {
      url: img2,
      
    },
    {
      url: img3,
      
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
        <div className="absolute inset-0 bg-black/30 flex mt-10 flex-col items-center justify-center">
            
          <img src={welcome} alt="welcome to treats" className="w-[200px] md:w-[350px]"/>
            
          <p className="font-[Merienda] text-md mt-5 text-gray-100 md:text-xl font-semibold">
              Where Sweet Dreams Comes To Life!
          </p>
            
            
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
  