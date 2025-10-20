import React from 'react'
import { useProductStore } from '../store/productStore'
import ProductCard from '../components/ProductCard'
import { useEffect } from 'react'
import { useParams } from 'react-router'
import he from 'he'



const CategoryPage = () => {

  const { category } = useParams()


  const { fetchProductByCategory, products } = useProductStore()

  console.log(products)


  useEffect(() => {

    fetchProductByCategory(category)
   
  }, [fetchProductByCategory, category])
  
  return (
    <div className="min-h-screen bg-pink-100 ">
      <div className="max-w-screen-xl mt-10 px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="font-bello text-pink-800 text-center text-3xl capitalize font-semibold">{he.decode(category.charAt(0).toUpperCase() + category.slice(1))}s</h2>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center'>
        {products.length === 0 && (
          <h2 className='text-3xl font-semibold font-[Merienda] text-pink-600 text-center col-span-full'>No Products Found</h2>
        )}

        {products?.map((product) => (

          <ProductCard key={product._id} product={product}/>
          
        ))

        }


      </div>
      
    </div>
  )
}

export default CategoryPage
