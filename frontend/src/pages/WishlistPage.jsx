import React, { useEffect } from 'react'
import { useAuthStore } from '../store/userStore.js'
import ProductCard from '../components/ProductCard'
import { Heart, ShoppingCart } from 'lucide-react'
import { Link } from 'react-router'

const WishlistPage = () => {

  const { getWishlist, wishlist } = useAuthStore()

  console.log("wishlist", wishlist)

  useEffect(() =>{


    getWishlist()
  }, [getWishlist])
  return (
    <div className='bg-pink-100 font-[Merienda] w-screen min-h-screen py-20'>
      <div className='flex flex-col items-center justify-center mx-auto my-10 px-4 md:px-8 '>
        <h3 className='text-3xl text-pink-800 font-bello mb-6'>My Wishlist</h3>

        { wishlist?.length === 0 
          ? ( <EmptyOrderUI />) 
          : (
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap6'>

              {wishlist?.map((list) =>(
              <ProductCard product={list} key={list.name} />

              ))}

            </div>

            
          )

        } 
      </div>
    </div>
  )
}

export default WishlistPage

const EmptyOrderUI = () => (

  <div className='flex flex-col font-[Merienda] items-center justify-center space-y-4 py-16 px-10'>

    <Heart className='w-24 h-24 text-pink-500' />
    <h3 className='text-2xl font-semibold text-pink-800'>Your have not save any item yet!</h3>
    <p className='text-md text-pink-800'>Found something you like?, tap on the heart icon to save it to your wishlist</p>
    <Link to={'/shop'} className='mt-4 rounded-md bg-pink-600 text-white transition-colors hover:bg-transparent hover:border-pink-600 border-2 p-3 hover:text-pink-600 transition-transform hover:translate-x-3'>Continue Shopping</Link>

  </div>
)

