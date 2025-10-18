import Carousel from '../components/Carousel.jsx'
import { useEffect } from 'react'
import CategoryLayout from '../components/CategoryLayout.jsx'
import { useProductStore } from '../store/productStore.js'
import storyBg from '/images/home-story.jpg'
import FeaturedProducts from '../components/FeaturedProducts.jsx'
import TopDealItems from '../components/TopDealItems.jsx'
import { useCartStore } from '../store/cartStore.js'
import CustomerReviews from '../components/CustomerReviews.jsx'
import { useReviewStore } from '../store/reviewStore.js'
import toast from 'react-hot-toast'



const HomePage = () =>{

  const { featuredProducts, fetchFeaturedProducts, fetchOfferProducts, offerProducts } = useProductStore()
  //console.log(offerProducts)
  const { getCartItems } = useCartStore()

  const { getCustomersReview, customerReviews } = useReviewStore()

  const handleSubscribe = async() =>{
    toast.success("Subscription successfull", { id: "subscribe" })
  }

  //console.log("customerReviews", customerReviews)

  useEffect(() => {
    

    getCartItems()
  }, [getCartItems])


  useEffect(() => {
    

    fetchFeaturedProducts()
  }, [fetchFeaturedProducts])

  useEffect(() => {
    

    fetchOfferProducts()
  }, [fetchOfferProducts])

  useEffect(() => {

    getCustomersReview()
  }, [getCustomersReview])
  


  return(
  
    <main className="bg-pink-50 ">
      <section className="w-full h-[500px]  mb-20 relative">
        <Carousel />
      </section>
    

      <section className=' w-full font-[Merienda] mt-20 '>
        <div className='flex items-center justify-center flex-col relative '>
          
          <div className='flex flex-col md:flex-row gap-3'>
            <img src={storyBg} alt='our story' className='w-[280px] md:w-[300px] rounded-lg shadow-lg' />
            
            <div className='p-3 w-[300px] md:w-[450px] flex flex-col items-center justify-center text-sm  text-purple-950'>
              <h2 className=' font-semibold font-bello text-xl '>What is it?</h2>
              <h1 className=' font-bold font-bello -mt-4 mb-3 text-6xl text-pink-500 '>Dessert</h1>
              
              <p className='mb-3 text-center'>At <strong>Treats</strong>, we see desserts not as a final course, but as an experience. We love sweets because they are a celebration for no reason at all. The crackle of a crème brûlée, the gooey center of a brownie, the fluffy peak of a cupcake—these are life’s little victories. We’re not here to sell you just a product, we are here to sell you a moment of pure, unapologetic joy</p>
              
              <p className='mb-3 text-center' >So go ahead, you deserve a <strong>Treat</strong>.</p>

            </div>
          </div>
            

          
            
          
        </div>
        
        

      </section>
      
      <section className="mt-12 bg-pink-100 max-w-7xl px-4 md:px-8 mx-auto">
        <CategoryLayout />
      </section>

      <TopDealItems offerProducts={offerProducts} />

    
      <FeaturedProducts featuredProducts={featuredProducts}  />

      <CustomerReviews reviews={customerReviews} />

      <section className=' w-full font-[Merienda] mt-10' 
        style={{ backgroundImage: "url('https://res.cloudinary.com/dnhttlxgv/image/upload/v1760784353/news_zpjuqo.jpg')", backgroundSize: 'cover' }}>
        <div className='w-full flex bg-black/80 py-8 items-center justify-center px-4  text-pink-200 flex-col'>
          <div className='w-full  flex items-center justify-center px-4 flex-col'>
            <h2 className='font-bold text-3xl mb-4'>Stay in the loop!</h2>
            <div className=' flex items-center justify-center flex-col md:flex-row'>

              <p className='w-[280px] md:w-[380px]  mb-3'>Subscribe to our newsletter, stay updated on new exciting desserts, specials, and events.</p>
              <div className=' flex flex-col '>
                <input

                  placeholder='Your email address'
                  className='w-[250px] p-2 bg-white/30 placeholder:text-white my-3'

                />
                <button className='w-[150px] p-2 bg-pink-600 text-white' onClick={handleSubscribe}>Subscribe</button>
              </div>

              



            </div>
          </div>
          
          

        </div>

      </section>

      
      
      
      
      
    </main>
  )
}

export default HomePage
  