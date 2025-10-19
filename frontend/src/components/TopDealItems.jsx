import React, { useEffect, useState } from 'react'
import { useCartStore } from '../store/cartStore.js'
import { useAuthStore } from '../store/userStore.js'
import toast from 'react-hot-toast'
import { ShoppingCart, ChevronLeft, ChevronRight } from 'lucide-react'
import { Link } from 'react-router'

const TopDealItems = ({ offerProducts }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [itemsPerPage, setItemsPerPage] = useState(3)
  const [itemWidth, setItemsWidth] = useState(100 / 3)

  const { user } = useAuthStore()

  const { addToCart } = useCartStore()

  const discount = 20
  //console.log("offerProducts", offerProducts)



  

  const handleAddToCart = async(product) =>{
    if(!user){
      toast.error("Please login to add product to cart", { id: "login" });
      return
    } else {
      addToCart(product)
      
    }
    
  }

  const next = () =>{
    if(currentIndex < offerProducts.length - itemsPerPage){
      setCurrentIndex((prevIndex) => prevIndex + 1)
    }
  }

  const prev = () =>{
    if(currentIndex > 0) {
    setCurrentIndex((prevIndex) => prevIndex - 1)
    }
  }

  const isStartDisabled = currentIndex === 0
  const isEndDisabled = currentIndex >= offerProducts?.length - itemsPerPage
 

  useEffect(() => {
  
    const handleResize = () => {
      if(window.innerWidth < 650){
        setItemsPerPage(1)
        setItemsWidth(100)
      } 
      else if(window.innerWidth < 800){
        setItemsPerPage(2)
        setItemsWidth(50)
      } 
      else {
        setItemsPerPage(3)
        setItemsWidth(100 / 3)
      }

      setCurrentIndex(0)
    }

    handleResize()

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)

    

  }, [])
  
  
  return (

  
    <div className='py-12 w-full max-w-4xl mx-auto'>
      <div className=' container px-4  '>
        <h3 className="p-2 text-purple-800 ml-2 font-[Merienda] font-semibold text-md md:text-xl ">Top deals of the month</h3>
        <div className='w-[280px] h-1 mb-5 bg-pink-800 flex' />
        <div className='relative'>
          <div className='overflow-hidden mx-auto pl-6'>
            <div className='flex gap-6 transition-transform duration-300 ease-in-out'
              style={{ transform: `translateX(-${currentIndex * (100 / itemsPerPage)}%)` }}
            
            >
              {offerProducts?.map((product) =>(
                
            
                <div  className='w-[270px] h-[350px] flex-shrink-0 relative group  flex flex-col overflow-hidden transition-all cursor-pointer rounded-2xl'
                  key={product._id} 
                  /**style={{ width: `${itemWidth}%`}} **/
                >
                  <Link  to={`/product/${product._id}`} className="w-full h-[250px] cursor-pointer rounded-2xl relative">
                    <img src={product?.image}
                      alt={product?.name}
                      className="w-full h-full object-cover transition-transform  rounded-2xl duration-500 ease-out group-hover:scale-110"
                      loading="lazy"
                    />
                  </Link>

                  <button 
                    className='flex items-center gap-2 justify-center bg-white p-2 absolute font-semibold font-[Merienda] rounded-md text-xs bottom-[35%] left-[45%] translate-y-0 -translate-x-[40%]  text-pink-600 '
                    onClick={() => handleAddToCart(product)}
                    
                  >
                    <ShoppingCart className='w-5 h-5'  />
                    Add to cart
                  </button>
                

                  <div className=" font-[Merienda] text-sm font-semibold flex flex-col p-2 text-nowrap text-fuchsia-900 items-center">
                  <p>{product?.name}</p>
                  <div className='flex gap-2 items-center'>
                    <p className='text-xs mt-2'>&#8358; {product?.discountedPrice?.toLocaleString()}</p>
                    <s className='text-xs text-gray-800 mt-2'>&#8358; {product?.price?.toLocaleString()}</s>
                    

                  </div>
                  
                    
                  </div>

                  <div className='absolute top-3 right-4 bg-white text-pink-800 font-semibold font-[Merienda] rounded-full p-2'>
                    -{discount}%
                  </div>
                  
                  
                </div>
          
                
              ))}
            </div>
          </div>
          <button
            onClick={prev}
            disabled={isStartDisabled}
            className={`absolute top-1/2 -left-4 transform -translate-y-1/2 p-2 rounded-md transition-colors duration-300 flex items-center justify-center ${isStartDisabled ? "bg-gray-600 cursor-not-allowed" : "bg-purple-800 hover:bg-purple-600"}`}
          
          >
            <ChevronLeft className='w-6 h-6' />

          </button>

          <button
            onClick={next}
            disabled={isEndDisabled}
            className={`absolute top-1/2 -right-4 transform -translate-y-1/2 p-2 rounded-md transition-colors duration-300 flex items-center justify-center ${isEndDisabled ? "bg-gray-600 cursor-not-allowed" : "bg-purple-800 hover:bg-purple-600"}`}
          
          >
            <ChevronRight className='w-6 h-6' />

          </button>
        </div>

      </div>
      
    </div>
  )
}

export default TopDealItems
