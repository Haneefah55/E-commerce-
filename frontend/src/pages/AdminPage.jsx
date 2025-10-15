import { PlusCircle, ShoppingBasket, BarChart, Settings } from 'lucide-react'

import React, { useState, useEffect } from 'react'
import ProductForm from '../components/ProductForm.jsx'
import ProductList from '../components/ProductList.jsx'
import SettingsTab from '../components/SettingsTab.jsx'
import AnalyticsTab from '../components/AnalyticsTab.jsx'

import { useProductStore } from '../store/productStore.js'

const AdminPage = () =>{
  const tabs = [
    {
      id: "add",
      label: "Add Products",
      icon: PlusCircle,
    },
    {
      id: "product",
      label: "Products",
      icon: ShoppingBasket,
    },
    {
      id: "analytics",
      label: "Analytics",
      icon: BarChart,
    },
    {
      id: "settings",
      label: "Settings",
      icon: Settings,
    },
    
  ]
  
  
  const [activeTab, setActiveTab ] = useState("product")

  const { fetchAllProducts } = useProductStore()

  useEffect(() => {

    fetchAllProducts()
  

  }, [fetchAllProducts])




  
  
  return(
  
    <div className=" relative flex overflow-x-auto bg-pink-100 px-4 pt-10 flex-col w-screen items-center justify-center">
      
      <div className="bg-pink-700 bg-clip-text text-transparent fontbold mt-16 text-3xl font-bello">
        Admin Dashboard
      </div>
      
      <div className="flex mt-4 justify-center mb-8">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={` flex items-center justify-center px-4 gap-3 font-[Merienda] py-2 mr-2 transition-colors duration-200 ${activeTab === tab.id ? "bg-pink-600 text-gray-100 " : "bg-pink-200 rounded-sm text-pink-600 hover:bg-pink-200"}`} >
            <tab.icon className="font-bold h-5 w-5" />
            <span className="hidden md:flex ">{tab.label} </span>
          </button>
        ))}
      </div>
      
      <div className="max-w-[1200px] w-full   flex md:justify-center md:items-center p-1 md:p-3">

        <div className='w-full flex items-center justify-center'> 
          {activeTab === "add" && <ProductForm />}
          {activeTab === "product" && <ProductList />}
          {activeTab === "analytics" && <AnalyticsTab />}
          {activeTab === "settings" && <SettingsTab />}
        </div>

        
      
        
      </div>
      
      
      
      
    </div>
  
  )
}
export default AdminPage