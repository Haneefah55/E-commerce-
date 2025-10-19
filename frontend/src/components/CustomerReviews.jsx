import { ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import { useEffect, useState } from 'react'
import { FaQuoteLeft } from 'react-icons/fa'
import StarRatings from 'react-star-ratings';

const CustomerReviews = ({ reviews }) => {

  const [currentIndex, setCurrentIndex] = useState(0)
  const [itemsPerPage, setItemsPerPage] = useState(3)

  const next = () =>{
    if(currentIndex < reviews.length - itemsPerPage){
      setCurrentIndex((prevIndex) => prevIndex + 1)
    }
  }

  const prev = () =>{
    if(currentIndex > 0) {
    setCurrentIndex((prevIndex) => prevIndex - 1)
    }
  }

  const isStartDisabled = currentIndex === 0
  const isEndDisabled = currentIndex >= reviews.length - itemsPerPage

  useEffect(() => {
    
    const handleResize = () => {
      if(window.innerWidth < 650){
        setItemsPerPage(1)
    
      } 
      else if(window.innerWidth < 800){
        setItemsPerPage(2)
   
      } 
      else {
        setItemsPerPage(3)
 
      }

      setCurrentIndex(0)
    }

    handleResize()

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)

    

  }, [])
  

  return (
    <div  className='pt-5 w-full pb-10 max-w-4xl mx-auto'>
      <div className=' container px-5 md:px-4  '>
        <h3 className="p-2 w-fit text-purple-800 ml-2 font-[Merienda] pb-4 border-b-4 border-b-pink-600 font-semibold mb-4 text-sm md:text-xl">Sweat Words From Our Customers</h3>
        <div className='relative group'>
          <div className=' overflow-hidden mx-auto pl-5'>
            <div className='flex gap-6 transition-transform duration-300 ease-in-out'
              style={{ transform: `translateX(-${currentIndex * (100 / itemsPerPage)}%)` }}
            
            >
              {reviews?.map((review) => (
                <div  className='w-[270px] h-[300px] flex-shrink-0 relative  bg-gray-200 shadow-lg flex flex-col overflow-hidden  p-2 cursor-pointer font-[Merienda] items-center justify-center rounded-lg'
                  key={review._id} 
                
                >
                  <FaQuoteLeft className='w-10 h-10 text-pink-800 absolute top-4 left-10' />
                  <div className=' rounded-full mt-10 mb-3 w-7 h-7 bg-pink-800 text-white p-4  flex items-center justify-center '>{review?.name?.charAt(0).toUpperCase()}</div>
                  <div className='mt-3 self-center'>
                    <StarRatings
                      rating={Math.floor(review?.ratings)}
                      starRatedColor='#f59e0b'
                      numberOfStars={5}
                      name='rating'
                      starDimension='20px'
                      starSpacing='3px'
                    />
                    
                  </div>

                  <p className='text-center text-sm py-3 font-semibold text-purple-800'>{review?.comment}</p>
                  <p className='font-bold capitalize text-center mb-7 text-pink-800'>{review?.name}</p>
                  
                 
                  


                </div>
              ))}
            </div>
          </div>
          <button
            onClick={prev}
            disabled={isStartDisabled}
            className={`absolute top-1/2 -left-4 transform -translate-y-1/2 p-2 rounded-md transition-colors duration-300 hidden group-hover:flex items-center  justify-center ${isStartDisabled ? "bg-gray-600 cursor-not-allowed" : "bg-purple-800 hover:bg-purple-600"}`}
          
          >
            <ChevronLeft className='w-6 h-6' />

          </button>

          <button
            onClick={next}
            disabled={isEndDisabled}
            className={`absolute top-1/2 -right-4 transform -translate-y-1/2 p-2 rounded-md transition-colors duration-300 hidden  group-hover:flex  items-center justify-center ${isEndDisabled ? "bg-gray-600 cursor-not-allowed" : "bg-purple-800 hover:bg-purple-600"}`}
          
          >
            <ChevronRight className='w-6 h-6' />

          </button>

        </div>
        

      </div>

    </div>
  )
}

export default CustomerReviews