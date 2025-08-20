import Carousel from '../components/Carousel.jsx'

import HomeLayout from '../components/HomeLayout.jsx'
const HomePage = () =>{

  return(
  
    <div className="bg-pink-50">
      <section className="w-full h-[400px] md:h-[500px] relative">
        <Carousel />
      </section>
      
      <section className="mt-12 max-w-7xl px-4 md:px-8 mx-auto">
        <HomeLayout />
      </section>
      
      
      
      
    </div>
  )
}

export default HomePage
  