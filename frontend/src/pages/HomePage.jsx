import Carousel from '../components/Carousel.jsx'
import { useEffect } from 'react'
import CategoryLayout from '../components/CategoryLayout.jsx'
import { useProductStore } from '../store/productStore.js'

import FeaturedProducts from '../components/FeaturedProducts.jsx'
import TopDealItems from '../components/TopDealItems.jsx'
import { useCartStore } from '../store/cartStore.js'

const HomePage = () =>{

  const { featuredProducts, fetchFeaturedProducts, fetchOfferProducts, offerProducts } = useProductStore()
  //console.log(offerProducts)
  const { getCartItems } = useCartStore()

  useEffect(() => {
    

    getCartItems()
  }, [getCartItems])


  useEffect(() => {
    

    fetchFeaturedProducts()
  }, [fetchFeaturedProducts])

  useEffect(() => {
    

    fetchOfferProducts()
  }, [fetchOfferProducts])
  


  return(
  
    <div className="bg-pink-50">
      <section className="w-full h-[500px] relative">
        <Carousel />
      </section>
      
      <section className="mt-12 max-w-7xl px-4 md:px-8 mx-auto">
        <CategoryLayout />
      </section>

      <TopDealItems offerProducts={offerProducts} />

    
      <FeaturedProducts featuredProducts={featuredProducts}  />

      
      
      
      
      
    </div>
  )
}

export default HomePage
  