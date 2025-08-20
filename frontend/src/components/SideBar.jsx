

const SideBar = () =>{
  
  
  
  return(
  
    
    <div className="col-span-12 lg:col-span-3 space-y-6">
          
          {/* Search */}
      <div className="bg-white rounded-2xl shadow p-4">
            <input
              type="text"
              placeholder="Search..."
              className="w-full border rounded-lg px-3 py-2 focus:outline-pink-500"
            />
          </div>

          {/* Categories */}
      <div className="bg-white rounded-2xl shadow p-4">
            <h2 className="font-semibold mb-3">Categories</h2>
            <ul className="space-y-2 text-gray-600">
              <li className="flex justify-between hover:text-pink-500 transition">
                <span>Cakes</span> <span>5</span>
              </li>
              <li className="flex justify-between hover:text-pink-500 transition">
                <span>Macarons</span> <span>3</span>
              </li>
              <li className="flex justify-between hover:text-pink-500 transition">
                <span>Lollipops</span> <span>2</span>
              </li>
            </ul>
          </div>

          {/* Price Filter */}
      <div className="bg-white rounded-2xl shadow p-4">
            <h2 className="font-semibold mb-3">Price Filter</h2>
            <input type="range" min="5" max="100" className="w-full accent-pink-500" />
            <button className="mt-3 w-full bg-pink-500 text-white rounded-lg py-2 hover:bg-pink-600 transition">
              Filter
            </button>
          </div>

          {/* Cart */}
      <div className="bg-white rounded-2xl shadow p-4">
            <h2 className="font-semibold mb-3">Cart</h2>
            <p className="text-gray-600">Black Forest Cake - $15.50</p>
            <div className="mt-3 flex justify-between font-bold">
              <span>Total:</span>
              <span>$15.50</span>
            </div>
            <button className="mt-3 w-full bg-green-500 text-white rounded-lg py-2 hover:bg-green-600 transition">
              View Cart
            </button>
          </div>

          {/* Top Sells */}
      <div className="bg-white rounded-2xl shadow p-4">
            <h2 className="font-semibold mb-3">Top Sells</h2>
            <ul className="space-y-2">
              <li className="flex justify-between hover:text-pink-500 transition">
                <span>Peanut Butter Cake</span> <span>$15.50</span>
              </li>
              <li className="flex justify-between hover:text-pink-500 transition">
                <span>Apple Spice Cake</span> <span>$12.50</span>
              </li>
            </ul>
          </div>
    </div>
  
  )
}