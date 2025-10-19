import React, { useEffect, useState } from 'react'
import { useCartStore } from '../store/cartStore.js'
import { useAuthStore } from '../store/userStore.js'
import toast from 'react-hot-toast'
import { ShoppingCart, Heart, ChevronLeft, ChevronRight } from 'lucide-react'
import { Link } from 'react-router'

const FeaturedProducts = ({ featuredProducts }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [itemsPerPage, setItemsPerPage] = useState(3)
  const [itemWidth, setItemsWidth] = useState(100 / 3)

  const { user, toggleWishlist, wishlist } = useAuthStore()

  const { addToCart } = useCartStore()



  const onWishlist = wishlist?.some((item) => item._id === featuredProducts._id)

 

  const handleAddToCart = async(product) =>{
    if(!user){
      toast.error("Please login to add product to cart", { id: "login" });
      return
    } else {
      addToCart(product)
      
    }
    
  }

  const next = () =>{
    if(currentIndex < featuredProducts.length - itemsPerPage){
      setCurrentIndex((prevIndex) => prevIndex + 1)
    }
  }

  const prev = () =>{
    if(currentIndex > 0) {
    setCurrentIndex((prevIndex) => prevIndex - 1)
    }
  }

  const isStartDisabled = currentIndex === 0
  const isEndDisabled = currentIndex >= featuredProducts.length - itemsPerPage
 

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
        <h3 className="p-2 text-purple-800 ml-2 font-[Merienda] font-semibold text-xl">Must-Try Treats</h3>
        <div className='w-[280px] h-1 mb-3 bg-pink-800 flex' />
        <div className='relative'>
          <div className='overflow-hidden mx-auto pl-6'>
            <div className='flex gap-6 transition-transform duration-300 ease-in-out'
              style={{ transform: `translateX(-${currentIndex * (100 / itemsPerPage)}%)` }}
            
            >
              {featuredProducts.map((product) =>(
            
                <div  className='w-[270px] h-[350px] flex-shrink-0 relative group  flex flex-col overflow-hidden transition-all cursor-pointer rounded-2xl'
                  key={product._id} 
                
                >
                  <Link to={`/product/${product._id}`} className="w-full h-[250px] cursor-pointer rounded-2xl relative">
                    <img src={product?.image}
                      alt={product?.name}
                      className="w-full h-full object-cover transition-transform  rounded-2xl duration-500 ease-out group-hover:scale-110"
                      loading="lazy"
                    />

                    <button 
                      className='flex items-center gap-2 justify-center bg-white p-2 absolute font-semibold font-[Merienda] rounded-md text-xs bottom-4 left-[45%] translate-y-0 -translate-x-[40%]  text-pink-600 disabled:bg-gray-500 disabled:text-white'
                      onClick={() => handleAddToCart(product)}
                      disabled={product?.stock === 0}
                      
                    >
                      <ShoppingCart className='w-5 h-5'  />
                      {product?.stock === 0 ? "Out of stock" : "Add to cart"}
                    </button>
                  </Link>

                  <div className=" font-[Merienda] text-sm font-semibold flex flex-col p-2 text-nowrap text-fuchsia-900 items-center">
                  <p>{product?.name}</p>
                  <p className='text-xs mt-2'>&#8358; {product?.price?.toFixed(2)}</p>
                    
                  </div>
                  <button className='absolute top-3 right-4 bg-white rounded-full p-2' 
                    onClick={() => toggleWishlist(product?._id)}
                    
                  >

                    {onWishlist ? (<Heart fill='#db2777' strokeWidth={0}/>) : ( <Heart className='text-pink-500'/>)

                    }
                    

                  </button>
                  
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

export default FeaturedProducts
