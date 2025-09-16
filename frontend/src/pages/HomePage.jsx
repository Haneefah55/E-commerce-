import Carousel from '../components/Carousel.jsx'
import { useEffect } from 'react'
import CategoryLayout from '../components/CategoryLayout.jsx'
import { useProductStore } from '../store/productStore.js'
import ProductCard from '../components/ProductCard.jsx'

const HomePage = () =>{

  const { featuredProducts, fetchFeaturedProducts } = useProductStore()

  useEffect(() => {
    

    fetchFeaturedProducts()
  }, [fetchFeaturedProducts])
  


  return(
  
    <div className="bg-pink-50">
      <section className="w-full h-[500px] relative">
        <Carousel />
      </section>
      
      <section className="mt-12 max-w-7xl px-4 md:px-8 mx-auto">
        <CategoryLayout />
      </section>

      <section className= "mt-8 max-w-7xl px-4 md:px-8 mx-auto">
        <div className="flex items-center justify-center">
          <div className='flex flex-col gap-4 '>
            <h3 className="p-2 text-purple-800 ml-2 font-[Merienda] font-semibold text-xl">Featured Products</h3>

            <div className="flex relative overflow-x-hidden">

              

              {featuredProducts.map((product) =>(
                <ProductCard key={product._id} product={product} />
              ))}

            </div>
          </div>
          
        </div>
        
      </section>
      
      
      
      
    </div>
  )
}

export default HomePage
  