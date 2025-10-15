import React, { useEffect, useState } from 'react'
import { Heart, ShoppingCart } from 'lucide-react'
import { useAuthStore } from '../store/userStore.js'
import toast from 'react-hot-toast'
import { useCartStore } from '../store/cartStore.js'
import { Link } from 'react-router'

const ProductCard = ({ product }) => {

  
  const { user, toggleWishlist, wishlist } = useAuthStore()

  const { addToCart } = useCartStore()



  const onWishlist = wishlist?.some((item) => item._id === product._id)

  const outOfStock = product?.stock === 0

  const handleAddToCart = async(product) =>{
    if(!user){
      toast.error("Please login to add product to cart", { id: "login" });
      return
    } else {
      await addToCart(product)
      
    }
    
  }



  return (
    <div className="relative group  transition w-[250px] h-[350px] overflow-hidden cursor-pointer flex flex-col ">
      <Link to={`/product/${product._id}`} className="w-full h-[250px] cursor-pointer rounded-2xl ">
        
        <img src={product?.image}
          alt={product?.name}
          className="w-full h-full object-cover transition-transform  rounded-2xl duration-500 ease-out group-hover:scale-110"
          loading="lazy"
        />
      </Link>
      <button 
        className='flex items-center gap-2 justify-center bg-white p-2 absolute font-semibold font-[Merienda] rounded-md text-xs bottom-[35%] left-[45%] disabled:bg-gray-500 disabled:text-white translate-y-0 -translate-x-[40%]  text-pink-600 '
          onClick={() => handleAddToCart(product)}
          disabled={outOfStock}
        
      >


        <ShoppingCart className='w-5 h-5'  />
        {outOfStock ? "Out of stock" : "Add to cart"}
      </button>


     

      <div className=" font-[Merienda] text-sm font-semibold flex flex-col p-2 text-nowrap text-fuchsia-900 items-center">
      <p>{product?.name}</p>
      <p className='text-xs mt-2'>&#8358; {product?.price?.toLocaleString()}</p>
        
      </div>
      <button className='absolute top-3 right-4 bg-white rounded-full p-2' 
        onClick={() => toggleWishlist(product?._id)}
        
      >

        {onWishlist ? (<Heart fill='#db2777' strokeWidth={0}/>) : ( <Heart className='text-pink-500'/>)

        }
        

      </button>

      
      
    </div>
  )
}

export default ProductCard
