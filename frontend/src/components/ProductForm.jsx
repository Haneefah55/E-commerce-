
import React, { useState } from 'react'
import { useProductStore } from '../store/productStore'


const ProductForm = () =>{
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [stock, setStock] = useState("")
  const [image, setImage] = useState("")
  const [category, setCategory] = useState("")

  //const isLoading = false

  const categories = ["cake", "cupcake", "doughnut", "yoghurt", "ice-cream", "chocolate", "macaron", "sweet & candy"]
  
  const { createProduct, isLoading } = useProductStore()

  const handleImageUploade = (e) =>{
    const file = e.target.files[0]
    
    if(file){
      const reader = new FileReader()
      
      reader.onloadend = () =>{
        setImage(reader.result)
      }
      
      reader.readAsDataURL(file)
    }
    
  }
  const productData = {name, description, price, image, category, stock }
  
  const handleSubmit = async(e) =>{
    e.preventDefault()
    

    try {
      await createProduct(productData)
      
    } catch (error) {
      console.log(error)
    } finally{
      setName('')
      setDescription('')
      setPrice('')
      setStock('')
      setCategory('')
      setImage('')
    }
  }
  
  return(
  
    <div className=" flex w-[300px] md:w-[400px] p-3 items-center justify-center self-center flex-col font-[Merienda]">
      
      <h3 className="bg-pink-600 text-transparent bg-clip-text font-bold ">Add New Product</h3>
      
      <form className="w-full mt-6 h-auto flex flex-col space-y-6 " onSubmit={handleSubmit}>
      
          
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => (setName(e.target.value))}
          required
          className="w-full p-2 bg-white/30 bg-opacity-50 rounded-md border-2 border-pink-400 outline-none focus:border-pink-600 text-gray-700 placeholderé:text-gray-400 transition duration-200"
                    
        />
        
        <textarea 
          type="text"
          row='3'
          placeholder="Description"
          value={description}
          onChange={(e) => (setDescription(e.target.value))}
          required
          className="w-full p-2 bg-white/30 bg-opacity-50 rounded-md border-2 border-pink-400 outline-none focus:border-pink-600 text-gray-700 placeholder:text-gray-400 transition duration-200"
        
        />
        
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => (setPrice(e.target.value))}
          required
          className="w-full p-2 bg-white/30 bg-opacity-50 rounded-md border-2 border-pink-400 outline-none focus:border-pink-600 text-gray-700 placeholder:text-gray-400 transition duration-200"
                    
        />
        <input
          type="number"
          placeholder="Quantity in stock"
          value={stock}
          onChange={(e) => (setStock(e.target.value))}
          required
          className="w-full p-2 bg-white/30 bg-opacity-50 rounded-md border-2 border-pink-400 outline-none focus:border-pink-600 text-gray-700 placeholder:text-gray-400 transition duration-200"
                    
        />
        
        <select
          value={category}
          onChange={(e) => (setCategory(e.target.value))}
          required
          className="w-full p-2 bg-white/30 bg-opacity-50 rounded-md border-2 border-pink-400 outline-none focus:border-pink-600 text-gray-700 placeholder:text-gray-400 transition duration-200"
        
        >
          <option value=""> Select a category</option>
          {categories.map((category) => (
          <option
            key={category}
            value={category}
            >{category}</option>
          
          ))}
          
        </select>
        
        <div className="flex justify-center self-start">
          <input type="file"
            id="image"
            required
            className="sr-only"
            accept="image/*"
            onChange={handleImageUploade}
            
          />
          <label htmlFor="image"
            className="cursor-pointer px-3 py-2 border-2 rounded-md border-pink-400 text-gray-800  hover:border-none hover:bg-pink-600 hover:text-gray-100 font-semibold "
            >Upload Image</label>
            {image && <span>Image Uploaded</span>}
            
            
          
        </div>
        
        <input
          type="submit"
          className="cursor-pointer px-3 py-2 border-2 rounded-md border-pink-400 text-gray-800  hover:border-none hover:bg-pink-600 hover:text-gray-100 font-semibold transform transition hover:scale-90 duration-200"
          value={`${isLoading ? "Submitting..." : "Submit"}`}
          disabled={isLoading}
        />
        
      </form>
      
      
    </div>
  )
}

export default ProductForm
  