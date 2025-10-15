import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router'
import ProductCard from '../components/ProductCard'

axios.defaults.withCredentials = true



const SearchResultPage = () => {

  const location = useLocation()
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const query = new URLSearchParams(location.search)
  const filter = query.get("filter")
  console.log("prdoct", products)
  console.log("filetr", filter)

  useEffect(() => {
    const fetchSearchResult = async() =>{
      if(!filter) return

      setIsLoading(true)

      try {
        const res = await axios.get(`/api/product/search?filter=${filter}`)
        console.log(res.data)
        setProducts(res.data)
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchSearchResult()
  }, [filter])


  return (
    <div className='w-screen min-h-screen font-[Merienda] py-16 px-3 bg-pink-50 md:px-8'>
      <div className='w-full flex items-center mt-8 justify-center flex-col'>
        <h2 className='text-purple-900 text-xl mb-8'>Search result for "{filter}"</h2>

        {isLoading ? (
          <div>Loading...</div>
        ) : products.length > 0 ? (
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
              {products.map((product) =>(
                <ProductCard product={product} key={product._id} />
              ))}
            </div>
        ) : (
          <div className='mt-6 flex  flex-col  items-center justify-center'>
            <p className='text-gray-700'>
              No results found for "<strong>{filter}</strong>" 🙁😞<br/>
              Try searching for something else


            </p>

            <button className='mt-4 w-150px flex items-center p-2 bg-purple-800 text-white rounded-lg shadow-lg justify-center' onClick={() => navigate('/shop')}>Back to shop</button>
          </div>
        )

        }
      </div>

    </div>
  )
}

export default SearchResultPage