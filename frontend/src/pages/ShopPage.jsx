import React, { useState } from 'react'
import ShopHero from '../components/ShopHero'
import ProductCard from '../components/ProductCard.jsx'

import { useEffect } from 'react'

import { SearchIcon } from 'lucide-react'

import { useProductStore } from '../store/productStore.js'
import TopDealItems from '../components/TopDealItems.jsx'
import axios from 'axios'
import { Link, useNavigate } from 'react-router'
import { useCartStore } from '../store/cartStore.js'
import { useAuthStore } from '../store/userStore.js'


axios.defaults.withCredentials = true

const ShopPage = () => {


  const { products, fetchAllProducts, offerProducts, fetchOfferProducts } = useProductStore()
  
  const { user } = useAuthStore()
  const { cart } = useCartStore()
  const [show, setShow] = useState(true)
  const [category, setCategory] = useState([])
  const [filter, setFilter] = useState("")

  //console.log("filter", filter)
  const navigate = useNavigate()

  const handleSearch = () =>{

    if(filter.trim()){
      navigate(`/search?filter=${encodeURIComponent(filter)}`)
    }
      
  }

  //console.log(cart)

  //console.log(category)

  //console.log(products)
  useEffect(() => {
    

    fetchAllProducts()
  
    
  }, [fetchAllProducts])

  useEffect(() => {

    fetchOfferProducts()
  },[fetchOfferProducts])

  useEffect(() => {
      
  
    const fetchCatCount = async() =>{
      try {
        const res = await axios.get('/api/product/category/count')
        //console.log("count res", res)
        setCategory(res.data)
      } catch (error) {
        console.log(error)
      }

    }


    fetchCatCount()



  }, [])

  useEffect(() => {
    
    const handleResize = () => {
      if(window.innerWidth < 900){
        setShow(!show)
    
      } 

    
    }

    handleResize()

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)

    

  }, [])
  
  return (
    <div className="bg-pink-50">
      <section className="w-full h-[400px] md:h-[500px] relative">
        <ShopHero />
      </section>

      <section className={`flex md:hidden mt-12  w-[300px] sm:w-[400px] mx-auto items-center px-6 justify-center`}>
        <div className='w-full flex rounded-full relative border-2 border-pink-600'>
      
          <input
            placeholder='Type here to search...'
            className='bg-transparent border-none p-2 outline-none placeholder:text-purple-700'
            value={filter}
            onChange={(e) =>(setFilter(e.target.value))}
          />
          <button className='bg-pink-600 text-white absolute right-1 top-1 p-2 rounded-full flex items-center justify-center' onClick={handleSearch}>
            <SearchIcon  className='w-4 h-4'/>
          </button>
          
        </div>
      </section>

{/*       
 */}
      <section className="mt-12 w-full  px-4  lg:px-12 sm:mx-3 lg:mx-auto flex items-center justify-center   ">
        <div className='grid grid-cols-12 gap-4 '>
          <div className='col-span-12 md:col-span-9 space-y-6 '>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
              {products?.map((product) =>(
                
                <ProductCard key={product.name} product={product} />

              ))

              }
            </div>

            

          </div>

          {/*** SIDE BAR */}

          
          <div className={`md:flex w-[280px] col-span-12 md:col-span-3  hidden font-[Merienda] flex-col space-y-6 px-2`}>
            {/**search bar */}
            <div className='w-full flex rounded-full relative border-2 border-pink-600'>
              
              <input
                placeholder='Type here to search...'
                className='bg-transparent border-none p-2 outline-none placeholder:text-purple-700'
                value={filter}
                onChange={(e) =>(setFilter(e.target.value))}
              />
              <button className='bg-pink-600 text-white absolute right-1 top-1 p-2 rounded-full flex items-center justify-center' onClick={handleSearch}>
                <SearchIcon  className='w-4 h-4'/>
              </button>
              
            </div>

            {/** category */}

            <div className='w-full border-2 rounded-lg border-pink-600 flex px-2 py-3 items-center justify-center flex-col'>
              <h3 className='font-bello text-purple-900 mb-3 mt-3 text-xl text-center'>Categories</h3>
              <ul className='flex items-center flex-col gap-2 justify-center w-full'>
                {category?.map((item) => (
                  <li key={item._id} className='odd:bg-pink-200 relative px-2 py-1 rounded-full w-full even:bg-gray-300 '>
                    <Link to={`/category/${item._id}`}>
                      <p>{item?._id}</p>
                      <p className='w-7 h-7 text-white text-sm flex items-center justify-center bg-purple-800 rounded-full absolute top-0.5 right-1'>{item?.count}</p>
                    
                    
                    </Link>

                  </li>
                ))}

              </ul>

            </div>

            {/** cart */}

            <div className='w-full border-2 rounded-lg border-pink-600 flex px-2 py-3 items-center justify-center flex-col'>
              <h3 className='font-bello text-purple-900 mb-3 mt-3 text-xl text-center'>Cart</h3>

              {user ? 
                <div className='w-full'>
                  {cart.length === 0 ?
                    <div className='w-full flex items-center justify-center'>
                      <p className='font-[Merienda] mb-3 font-semibold'>Your cart is empty!</p>

                    </div>

                  :
                    <div className='w-full flex items-center justify-center flex-col'>
                      <div className='flex flex-col items-start justify-center gap-3 '>
                        {cart?.map((item) => (
                          <div key={item?.name} className='flex h-[50px] items-center gap-2 justify-center'>
                            <img src={item?.image} className='w-[50px] h-[50px]'/>
                            <div className='text-xs flex flex-col'>
                              <p className='w-[120px]'>{item?.name}</p>
                              <p>&#8358;  {item?.price?.toLocaleString()}</p>
                            </div>

                            <div className='flex items-center justify-center text-xs mr-2 w-6 h-6 p-2 bg-pink-600 text-white rounded-full'>{item?.quantity}</div>

                          </div>
                        ))}
                      </div>

                    </div>
                  }
                  
                </div>
              : <div>
                Login to view cart
              </div>
              }



            </div>

          </div>
        </div>

        



      </section>

      <TopDealItems offerProducts={offerProducts}/>

      

      
    </div>
  )
}

export default ShopPage


