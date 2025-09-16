
import { PenIcon, PenSquareIcon, Star, Trash, Trash2Icon, TrashIcon } from 'lucide-react'
import React, { useEffect } from 'react'
import { Link } from 'react-router'

import { useProductStore } from '../store/productStore.js'

const ProductList = () =>{
  const { toggleFeaturedProducts, deleteProduct, products, fetchAllProducts } = useProductStore()
  

  useEffect(() => {
  
      fetchAllProducts()
    
  
    }, [fetchAllProducts])
  
  
  return(
  
    <div className="w-full h-screen self-center font-[Merienda] relative  overflow-x-auto">

      <table  className=" table-auto border-spacing-x-1 sm:w-[500px] md:w-full divide-y divide-pink-900 ">
        <thead className="bg-pink-600 text-nowrap ">
          <tr>
            <th scope='col' className="px-6 py-3 text-left text-xs font-medium text-gray-100 uppercase ">
              Product
            </th>

            <th scope='col' className="px-6 py-3 text-left text-xs font-medium text-gray-100 uppercase ">
              Price
            </th>

            <th scope='col' className="px-6 py-3 text-left text-xs font-medium text-gray-100 uppercase ">
              Category
            </th>

            <th scope='col' className="px-6 py-3 text-left text-xs font-medium text-gray-100 uppercase ">
              In Stock
            </th>

            <th scope='col' className="px-6 py-3 text-left text-xs font-medium text-gray-100 uppercase ">
              Featured
            </th>

            <th scope='col' className="px-6 py-3 text-left text-xs font-medium text-gray-100 uppercase">
              Action
            </th>
          </tr>

        </thead>

        <tbody className="divide-y divide-pink-700 ">

          {
            products?.map((product) =>(
              <tr key={product._id} className=" even:bg-pink-200 font-semibold   odd:bg-transparent hover:bg-pink-200 text-sm text-pink-800">
                <td className="px-6 py-4 text-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <img
                        className="h-10 w-10 rounded-full object-cover"
                        src={product.image}
                        alt={product.name}
                      />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-semibold text-pink-900 ">{product.name}</div>
                    </div>
                  </div>

                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm ">
                    &#8358; {product?.price?.toFixed(2)}

                  </div>

                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm ">
                    {product.category}

                  </div>

                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm ">
                    {product.stock}

                  </div>

                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  <button className={`p-1 rounded-full ${product.isFeatured ? 
                    "bg-yellow-500 text-gray-900"  
                    : "bg-gray-400 text-gray-300"  } hover:bg-yellow-400 transition-colors duration-200 `}
                    
                    onClick={() => toggleFeaturedProducts(product._id)}
                  
                  >


                    <Star className='h-5 w-5'/>
                    

                  </button>

                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  <div className='flex gap-2 items-center'>
                    <button className='hover:text-pink-500'
                      onClick={() => deleteProduct(product._id)}
                    
                    >
                      <Trash2Icon className='w-5 h-5' />

                    </button>
                    <Link to={`/edit-product/${product._id}`} className='hover:text-pink-500'>
                      <PenSquareIcon className='w-5 h-5'/>
                    </Link>
                  </div>

                </td>
              </tr>


            ))
          }


        </tbody>

      </table>
    </div>

  )
}
export default ProductList