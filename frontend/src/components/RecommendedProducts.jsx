import React from 'react'
import ProductCard from './ProductCard.jsx'


const RecommendedProducts = ({ recommendedProducts }) => {
  return (
    <div className="w-full h-auto mx-auto">
      <h3 className='font-semibold text-purple-800 text-xl font-[Merienda] mr-4 mb-5'>People also brought</h3>

      <div className=" w-full grid grid-cols-1 md:grid-cols-3 ">

        {recommendedProducts.map((product) => (

        
          <ProductCard key={product._id} product={product} />

        ))}
      </div>

      
      
    </div>
  )
}

export default RecommendedProducts
