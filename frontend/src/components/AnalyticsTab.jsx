import axios from "axios"
import { useEffect, useState } from "react"
import { User, ShoppingCart, Package } from 'lucide-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faNairaSign } from '@fortawesome/free-solid-svg-icons'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'






axios.defaults.withCredentials = true


const AnalyticsTab = ()=>{

  const [analyticsData, setAnalyticsData] = useState({
    users: 0,
    products: 0,
    totalSales: 0,
    totalRevenue: 0,
  })
  
  const [dailySalesData, setDailySalesData] = useState([])

  const [isLoading, setIsLoading] = useState(true)
  
  useEffect(() =>{

    const fetchAnanlyticsData = async () =>{
      try {
        const response = await axios.get('/api/analytics')
        console.log("analytic response", response)

        setAnalyticsData(response.data.analyticsData)
        setDailySalesData(response.data.dailySalesData)
        setIsLoading(false)
        
      } catch (error) {
        console.log("error fetching analityic", error)
        
      } finally{
        setIsLoading(false)
      }
    }

    fetchAnanlyticsData()

  }, [])

  

 

  if(isLoading){
    return <div>isLoading...</div>
  }
  
  return(
    <div className="max-w-7xl min-h-screen w-full self-center mx-auto px-4 sm:px-6 lg:px-8 flex flex-col ">
      <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 ">

        <AnalyticsCard
          title='Total Users'
          value={analyticsData.users.toLocaleString()}
          icon={User}
          color='from-purple-500 to-purple-900'

        />

        <AnalyticsCard
          title='Total Products'
          value={analyticsData.products.toLocaleString()}
          icon={Package}
          color='from-purple-500 to-purple-900'

        />

        <AnalyticsCard
          title='Total sales'
          value={analyticsData.totalSales.toLocaleString()}
          icon={ShoppingCart}
          color='from-purple-500 to-purple-900'

        />

        <div className={` rounded-lg shadow-lg relative font-[Merienda] overflow-hidden p-6 from-purple-600 to-purple-900 `}>

          <div className="flex justify-between items-center">
            <div className="z-10">
              <p className="text-purple-400 text-sm mb-1 font-semibold">Total Revenue</p>
              <h3 className="text-white  text-2xl font-bold">&#8358; {analyticsData.totalRevenue.toLocaleString()}</h3>
            </div>
            
          </div>
          <div>
            <div className="absolute inset-0 bg-gradient-to-br from-pink-500 to-pink-800"/>
            <div className="absolute   -bottom-4 -right-4 text-pink-900 opacity-50">
              
          
              <FontAwesomeIcon icon={faNairaSign}  className="h-32 w-32" />
            </div>

          </div>

        </div>



      </div>

      <div className="bg-pink-700/80 rounded-lg p-4 shadow-lg">
        <ResponsiveContainer width='100%' height={400}>
          <LineChart data={dailySalesData}>
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey='date' stroke='#D1D5DB' />
            <YAxis yAxisId='left' stroke='#D1D5DB' />
            <YAxis yAxisId='right' orientation="right" stroke='#D1D5DB' />
            <Tooltip />
            <Legend />
            <Line

              yAxisId='left'
              type='monotone'
              dataKey='sales'
              stroke='#FF85BC'
              activeDot={{ r: 8 }}
              name="Sales"

            />

            <Line

              yAxisId='right'
              type='monotone'
              dataKey='revenue'
              stroke="#6A0460"
              activeDot={{ r: 8 }}
              name="Revenue"

            />
          </LineChart>
        </ResponsiveContainer>
      
      
      </div>

    </div>
  
  )
}
export default AnalyticsTab



const AnalyticsCard = ({ title, value, icon: Icon, color }) =>(
  <div className={` rounded-lg shadow-lg relative font-[Merienda] overflow-hidden p-6 ${color}`}>

    <div className="flex justify-between items-center">
      <div className="z-10">
        <p className="text-purple-400 text-sm mb-1 font-semibold">{title}</p>
        <h3 className="text-white text-2xl font-bold">{value}</h3>
      </div>
      
    </div>
    <div>
      <div className="absolute inset-0 bg-gradient-to-br from-pink-500 to-pink-800"/>
      <div className="absolute -bottom-4 -right-4 text-pink-900 opacity-50">
        <Icon className="h-32 w-32" />

      </div>

    </div>

  </div>
)