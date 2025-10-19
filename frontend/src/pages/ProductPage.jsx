import axios from 'axios'
import React, { useState } from 'react'
import StarRatings from 'react-star-ratings';
import { useEffect } from 'react'
import { useParams, Link } from 'react-router'
import bg from '/images/rain.jpg'
import { Heading3, Star } from 'lucide-react'
import { useAuthStore } from '../store/userStore.js'
import { useProductStore } from '../store/productStore.js'
import { useCartStore } from '../store/cartStore.js';
import toast from 'react-hot-toast';
import { useReviewStore } from '../store/reviewStore.js';
import ProductCard from '../components/ProductCard.jsx';


axios.defaults.withCredentials = true

const ProductPage = () => {

  const { id } = useParams()

  const { user, toggleWishlist, wishlist } = useAuthStore()
  const { fetchRelatedProduct, relatedProduct } = useProductStore()

  const { addToCart } = useCartStore()

  const [product, setProduct] = useState({})

  const [comment, setComment] = useState("")
  const [ratings, setRatings] = useState(null)
  const [rateValue, setRateValue] = useState(0)
 // const [isSubmitting, setIsSubmitting] = useState(false)
  
  console.log(product)

  const outOfStock = product?.stock === 0
  const isOffer = product?.isOffer

  const discountedPrice = Math.floor(product?.price * (1 - 20 / 100))
  
 

  const { createProductReview, isLoading, productReview, getProductReview, averageRating, totalProductReview } = useReviewStore()

  const handleAddCart = async() =>{
    try {
      if(!user){
      toast.error("Please login to add product to cart", { id: "login" });
      return
    } else {
      await addToCart(product)
      
    }
    } catch (error) {
      console.log(error)
    }
  }

  const handleToggle = async () =>{
    try {
      await toggleWishlist(product?._id)
    } catch (error) {
      console.log(error)
    }
  }

  const onWishlist = wishlist?.some((item) => item._id === product._id)
  const [activeTab, setActiveTab ] = useState("description")
  const tabs = [
    {
      id: "description",
      label: "Description",

    },
    {
      id: "review",
      label: "Reviews",
   
    },
    
  ]



  const handleRate =(i) => {

    if(!user){
      toast.error("Please login to rate product", { id: "login" });
      return
    }

    console.log("index", i)
    const value = i + 1
    setRatings(value)
    setRateValue(value)
   
  }

  const handleSubmitComment = async(e) =>{


    e.preventDefault()

    if(!user){
      toast.error("please login to leave a review", { id: "login" })
      return
    } 

    try {
      
      if(!ratings){
        toast.error("product rating is required")
        return
      } else if (!comment) {
        toast.error("product review is required")
        return
      } else {
        await createProductReview(comment, ratings, product._id)
      
      }
      
    } catch (error) {
      console.log(error)
   
    } finally {
      setComment('')
      setRatings(null)
    }
  }

  useEffect(() => {

    const fetchProduct = async() =>{
      const response = await axios.get(`/api/product/${id}`)
      //console.log("fetch product response", response.data)

       setProduct(response.data)
    }

    fetchProduct()

  }, [])

  useEffect(() => {

     getProductReview(product._id)

  }, [product])

  useEffect(() => {
    if(product){
      fetchRelatedProduct(product)
    }
   

  }, [product])


  return (
    <div className='w-screen min-h-screen'>
      <div className='w-full h-[400px] flex bg-center relative bg-cover ' style={{ backgroundImage: `url("https://res.cloudinary.com/dnhttlxgv/image/upload/v1760784326/rain_ztqfii.jpg")`}}>
        <div className='absolute inset-0 flex flex-col items-center justify-end'>
        <h3 className='text-2xl mt-10 font-bold mb-4 capitalize font-[Merienda] '>{product?.name}</h3>

        <div className='flex font-[Lato] gap-3 font-semibold mb-8 items-center justify-center'>
          <Link to='/'>Home </Link>
          <Link to='/'> / Shop </Link>
          / {product?.name}
        </div>
        </div>

      </div>

      <div className='w-full max-w-6xl py-16 px-5 md:px-24 flex flex-col items-center justify-center'>
        <div className=' flex items-center justify-center'>
          <div className='flex flex-col gap-5 font-[Merienda] md:flex-row'>
            <div className='w-[280px] md:w-[300px] h-[300px] flex realtive'>
              <img src={product?.image} alt={product?.name} className='w-full object-cover rounded-lg' />
            </div>
            <div className='w-[300px] h-[300px] md:w-[400px] p-3'>
              <h3 className='text-xl font-bold '>{product?.name}</h3>
              {/** star rating */}
              
              <div className='my-2 w-full '>
                
                <StarRatings
                  rating={Math.floor(averageRating)}
                  starRatedColor='#f59e0b'
                  numberOfStars={5}
                  name='rating'
                  starDimension='30px'
                  starSpacing='5px'
                />

                <p className='text-gray-600 mt-1 text-xs'>({totalProductReview} Customer Reviews)</p>
              </div>

              {isOffer ? (<h4 className='font-semibold mb-2 text-pink-600'>&#8358; {discountedPrice.toLocaleString()}</h4>)
                : (<h4 className='font-semibold mb-2 text-pink-600'>
                  &#8358; {product?.price?.toLocaleString()}
                </h4>)
              }

                
                {product?.stock === 0 &&
                  <h4 className='font-semibold mb-2 text-pink-600'>Out of stock</h4>
                }
              
              <div className='flex items-center gap-3 mt-3'>
                <button className='p-2 text-sm bg-pink-700 disabled:bg-gray-500 disabled:text-white text-white' onClick={handleAddCart} disabled={outOfStock}>
                  {outOfStock ? "Out of Stock" : "Add to cart"}
                </button>
                <button className='p-2 text-sm bg-pink-700 text-white' onClick={handleToggle}>
                  {onWishlist ? "Remove from wishlist" : "Add to wishlist"}
          
                  </button>
              </div>

              <div className='bg-gray-400 h-0.5 w-full mt-5' />

              <p className='mt-4 '>Category: <span className='font-bold text-pink-700'>{product?.category}</span></p>
              

            </div>


          </div>
        </div>

        <div className=' flex font-[Merienda] mt-10 w-[350px] flex-col sm:w-full md:w-[750px]'>
          <div className=' w-full flex px-4'>
            
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={` px-4 font-[Merienda] transition-colors duration-200 ${activeTab === tab.id ? "border-b-2 border-b-pink-600 " : "border-b-2 border-b-gray-400"}`} >
            
                
                {tab.label}
              </button>
            ))}
            <div className='w-full flex border-b-2 border-b-gray-400' />
      
            
          </div>

          {/*** decriptions */}

          <div className={`w-full  p-4 ${activeTab === "description" ? "flex" : "hidden" }`}>

            {product.description}

          </div>

            {/*** reviews */}
          <div className={`w-full  flex-col p-4 ${activeTab === "review" ? "flex" : "hidden" }`}>

            {productReview?.length === 0 &&
            
            <div className='flex flex-col gap-3 w-[300px] md:w-[500px]'>
              <p>There are no reviews yet</p>
              <p>Be the first to review "{product?.name}"</p>

            </div>

            }

            <div className='flex flex-col gap-3 w-[300px] md:w-[500px]'>

              {productReview && productReview?.map((item) =>(
                <div  key={item._id} className='flex w-[300px] md:w-[500px] flex-col bg-gray-100 shadow-lg mb-4 p-2 rounded-md'>
                  <div className='flex items-start gap-5'>
                    <p className='capitalize font-semibold text-pink-600'>{item.name}</p>
                    
                    <StarRatings
                      rating={Math.floor(item?.ratings)}
                      starRatedColor='#f59e0b'
                      numberOfStars={5}
                      name='rating'
                      starDimension='20px'
                      starSpacing='3px'
                    />

                  </div>

                  <div className='py-2 text-sm'>
                    {item?.comment}
                  </div>

                </div>
              ))

              }

            </div>
            
            
            

            

          </div>

          <div className='w-full px-5 flex mt-10 flex-col gap-3'>
            <h3>Please rate "{product?.name}"</h3>

            <div className='flex gap-2'>
              {[...Array(5)].map((_, index) =>{
                
                return (

                  <Star

                    key={index}
                    className={`${ ratings >= index + 1  ? "fill-amber-500 stroke-amber-500" : "fill-none stroke-gray-400" }`}
                    onClick={() => handleRate(index)}

                    
                  />
                )
              })}
            </div>

            <div>
              {ratings === 1 && <p>({rateValue}) Its Okay 🙂</p>}
              {ratings === 2 && <p>({rateValue}) It taste Good 😊</p>}
              {ratings === 3 && <p>({rateValue}) It taste Very Good 😋</p>}
              {ratings === 4 && <p>({rateValue}) It's Delicious 😋😍</p>}
              {ratings === 5 && <p>({rateValue}) It's Delicious and Satisfying 😊😋😍</p>}
            </div>

            <form className='w-[300px] md:w-[400px] items-center justify-center' onSubmit={handleSubmitComment}>
              <h3 className='font-bold text-xl'>Leave a review </h3>
              <textarea
                value={comment}
                required
                onChange={(e) => (setComment(e.target.value))}
                className="w-full py-2 px-4 bg-white/30 bg-opacity-50 rounded-md border-2 border-pink-400 outline-none focus:border-pink-800  transition duration-200 "

                rows={3}
                placeholder='What do you think'

              />

              <div className='flex items-center justify-center gap-4 mt-3'>
                <button
                  className="w-full py-2 px-5  bg-pink-800 text-gray-100 font-semibold transform transition hover:scale-90 duration-200"
                  type= "submit"
                  diabled={isLoading}
              
                >            
                  { isLoading ? "Submitting" : "Submit"}
                                        
                </button>
                <button type='cancel' className="w-full py-2 px-5 bg-pink-800 text-gray-100 font-semibold transform transition hover:scale-90 duration-200" onClick={() => setComment("")}>Cancel</button>
              </div>

            </form>




          </div>


              
        </div>

        <div className=' flex font-[Merienda] mt-10 w-[350px] p-5 flex-col sm:w-full md:w-[750px]'>
          <h3 className='mb-4 font-bold text-xl'>Related Products</h3>
          {relatedProduct.length === 0 && 
              <div className='flex text-pink-800 items-center justify-center font-bold text-xl'>No related product found</div>
          }
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2'>
            
            {relatedProduct && relatedProduct?.map((item) => (
              <ProductCard key={item.name} product={item}/>
            ))

            }

          </div>

        </div>
      </div>

    </div>
  )
}

export default ProductPage