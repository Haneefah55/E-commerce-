import React from 'react'
import ProductCard from './ProductCard.jsx'
import { useProductStore } from '../store/productStore.js'

const RecommendedProducts = () => {

  const { recommendedProducts } = useProductStore()
  return (
    <div className="w-full h-auto mx-auto">
      <h3 className='font-semibold text-purple-800 text-xl font-[Merienda] mr-4 mb-5'>People also brought</h3>

      <div className=" w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 ">

        {recommendedProducts.map((product) => (

        
          <ProductCard key={product._id} product={product} />

        ))}
      </div>

      
      
    </div>
  )
}

export default RecommendedProducts
