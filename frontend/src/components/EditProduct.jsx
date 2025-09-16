import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { useParams } from 'react-router'
import { useProductStore } from '../store/productStore.js'



const EditProduct = () => {

  const { id } = useParams();

  const { fetchProduct, product, updateProduct, isLoading } = useProductStore()
  const navigate = useNavigate()
  

  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [stock, setStock] = useState("")
  const [image, setImage] = useState(null)
  const [category, setCategory] = useState("")


  const categories = ["cake", "cupcake", "doughnut", "yoghurt", "ice-cream", "chocolate", "macaron", "sweet & candy"]


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

  


  const handleSubmit = async(e) =>{
    e.preventDefault()
    const productData = {name, description, price, image, category, stock }
    console.log("productData", { ...productData })

    try {
     await updateProduct(id, productData)
     navigate("/admin")

    } catch (error) {
      console.log(error)
    }
  /*** 

    try {
      await createProduct(productData)
      window.location.reload()
    } catch (error) {
      console.log(error)
    }
      **/
  }

  useEffect(() => {
    if (product) {

      setName(product.name || "");
      setDescription(product.description || "");
      setPrice(product.price || "");
      setStock(product.stock || "");
      setCategory(product.category || "");
    }

  }, [product]);
 

  useEffect(() => {
    if (id) {
      fetchProduct(id);

      
    }
  }, [id, fetchProduct]); // Only run when ID changes

  return (
    <div className='w-screen m-auto flex items-center overflow-visible  bg-pink-100 justify-center '>

      <div  className='w-full h-full flex items-center mt-40 mb-20 justify-center'>
        <div className='w-[320px] md:w-[400px] p-3 flex mt-20 items-center justify-center flex-col font-[Merienda] '>

          <h3 className='text-pink-600 text-2xl font-semibold'>Edit Product</h3>

          <form className="w-full mt-6 h-auto flex flex-col space-y-6 " onSubmit={handleSubmit}>
        
            
          <input
            type="text"
            placeholder={product ? product.name : "Name"}
            value={name}
            onChange={(e) => (setName(e.target.value))}
            
            className="w-full p-2 bg-white/30 bg-opacity-50 rounded-md border-2 border-pink-400 outline-none focus:border-pink-600 text-gray-700 placeholderé:text-gray-400 transition duration-200"
                      
          />
          
          <textarea 
            type="text"
            row='3'
            placeholder={product ? product.description : "Description"}
            value={description}
            onChange={(e) => (setDescription(e.target.value))}
          
            className="w-full p-2 bg-white/30 bg-opacity-50 rounded-md border-2 border-pink-400 outline-none focus:border-pink-600 text-gray-700 placeholder:text-gray-400 transition duration-200"
          
          />
          
          <input
            type="number"
            placeholder={product ? product.price : "Price"}
            value={price}
            onChange={(e) => (setPrice(e.target.value))}
            
            className="w-full p-2 bg-white/30 bg-opacity-50 rounded-md border-2 border-pink-400 outline-none focus:border-pink-600 text-gray-700 placeholder:text-gray-400 transition duration-200"
                      
          />
          <input
            type="number"
            placeholder={product ? product.stock : "Quantity in stock"}
            value={stock}
            onChange={(e) => (setStock(e.target.value))}
            
            className="w-full p-2 bg-white/30 bg-opacity-50 rounded-md border-2 border-pink-400 outline-none focus:border-pink-600 text-gray-700 placeholder:text-gray-400 transition duration-200"
                      
          />
          
          <select
            value={category}
            onChange={(e) => (setCategory(e.target.value))}
          
            className="w-full p-2 bg-white/30 bg-opacity-50 rounded-md border-2 border-pink-400 outline-none focus:border-pink-600 text-gray-700 placeholder:text-gray-400 transition duration-200"
          
          >
            <option value=""> {product ? product.category : "Select a category"}</option>
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
      </div>

      
      
    </div>
  )
}

export default EditProduct
