import React from 'react'
import ShopHero from '../components/ShopHero'
import ProductCard from '../components/ProductCard.jsx'

import { useEffect } from 'react'

import { Heart } from 'lucide-react'

import { useProductStore } from '../store/productStore.js'

const ShopPage = () => {


  const { products, fetchAllProducts } = useProductStore()

  //console.log(products)
  useEffect(() => {
    

    fetchAllProducts()
  
    
  }, [fetchAllProducts])
  
  return (
    <div className="bg-pink-50">
      <section className="w-full h-[400px] md:h-[500px] relative">
        <ShopHero />
      </section>

      <section className="mt-12 max-w-7xl px-4 md:px-8 mx-auto flex items-center justify-center ">

        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-6'>

          {products?.map((product) =>(
              
            <ProductCard key={product.name} product={product} />

          ))

          }

        </div>



      </section>

      
    </div>
  )
}

export default ShopPage

