import React from 'react'
import { Minus, Plus, Trash } from 'lucide-react'
import { useCartStore } from '../store/cartStore.js'

const CartItem = ({ item }) => {

  const { removeFromCart, updateQuantity } = useCartStore()


  return (
    
    <div className='mx-auto bg-white border-2 h-auto p-5 rounded-lg shadow-sm flex flex-col md:flex-row items-center mb-4  font-[Merienda]'>
      <div className='flex  justify-center gap-3 flex-col md:flex-row'>
        <img className='w-[180px] h-[150px]  object-cover rounded-md'
          src={item.image}

        />

        <div className='flex flex-col justify-between py-5 max-w-[300px] '>
          <p className='font-semibold text-md text-pink-500'>{item.name}</p>
          <p className=' text-sm text-pink-800 mt-3 mb-3 '>{item.description.split(" ").slice(0, 15).join(" ")}...</p>
          <button onClick={() => removeFromCart(item?._id)}>
            <Trash className='text-pink-800' />
          </button>

        </div>

      </div>

      <div className='flex items-center ml-5 justify-around gap-4 w-[280px]'>
        <div className='flex items-center justify-center gap-1 '>
          <label className='sr-only'>Choose quantity</label>
          <button className='p-0.5 bg-pink-600 rounded-lg text-white text-sm'
            onClick={() => updateQuantity(item?._id, item?.quantity - 1)}
            
          >
            <Minus className='w-4 h-4'/>
          </button>
          {item.quantity}
          <button className='p-0.5 bg-pink-600 rounded-lg text-white text-sm'
            onClick={() => updateQuantity(item?._id, item?.quantity + 1)}
          
          >
            <Plus  className='w-4 h-4' />
          </button>
        </div>
        <div className='font-semibold text-pink-800' >
          &#8358; {item.price * item.quantity}
        </div>


      </div>

      
    </div>
  )
}

export default CartItem
