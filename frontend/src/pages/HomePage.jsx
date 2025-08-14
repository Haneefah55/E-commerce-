import Carousel from '../components/Carousel.jsx'


const HomePage = () =>{

  return(
  
    <div className="w-full h-full bg-pink-100 flex flex-col ">
      <div className="w-full h-3/5 relative">
        <Carousel />
      </div>
      
      <h3 className="font-semibold font-[Merienda] text-md md:text-xl my-5 w-full max-w-[500px] text-white text-center">
        Unconventional Treats, Unforgettable Flavors. Your Happy Place Awaits!
      </h3>
      
      
      
    </div>
  )
}

export default HomePage
  