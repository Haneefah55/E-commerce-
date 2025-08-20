
import { Link } from 'react-router'
import { Heart } from "lucide-react"; // install lucide-react for icons

const HomeLayout = () => {
  
  
  const categories = [
    {
      href: "/cake",
      name: "Cakes",
      image: "/images/cake.jpg",
      
    },
    {
      href: "/cupcake",
      name: "Cupcakes",
      image: "/images/cupc.jpg",
      
    },
    {
      href: "/doughnut",
      name: "Doughnuts",
      image: "/images/donot.jpeg",
      
    },
    {
      href: "/chocolate",
      name: "Chocolates",
      image: "/images/choco.jpeg",
      
    },
    {
      href: "/ice-cream",
      name: "Ice Creams",
      image: "/images/icec.jpeg",
      
    },
    {
      href: "/yoghurt",
      name: "Yoghurt",
      image: "/images/you.jpeg",
      
    },
    {
      href: "/macaron",
      name: "Macarons",
      image: "/images/macaron.jpeg",
      
    },
    {
      href: "/sweet",
      name: "Sweets & Candies",
      image: "/images/cake.jpg",
      
    },
    
    
  ]
  
  
  
  
  return (
    <div className=" p-3">
      <div className="text-center font-[Merienda] flex items-center mb-7 md:mb-12 text-fuchsia-900 justify-center flex-col">
        <h3 className="font-bold  mb-3 text-xl md:text-3xl">Explore Our Desserts Categories</h3>
        <p className="text-xs md:text-xl">Unconventional Treats, Unforgettable Flavors. Your Happy Place Awaits!</p>
      </div>

  
          
      <div className="grid ml-5 md:ml-0 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            
            {/* Product Card */}
          
          {categories.map((category) =>(
            
            <div className="relative group  rounded-2xl shadow transition w-[280px] h-[320px] overflow-hidden cursor-pointer "
            key={category.name}
            >
              <Link to={`/category/${category.href}`} >
                <div className="w-full h-full cursor-pointer rounded-2xl">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900 opacity-40 rounded-2xl z-10" />
                  <img src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform  rounded-2xl duration-500 ease-out group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute bottom-4 left-[50%] translate-y-0 -translate-x-[50%] font-bello font-extralight rounded-3xl px-5 py-2 bg-pink-50 z-30 text-fuchsia-900">
                    {category.name}
                  </div>
                </div>
                
              </Link>
              
            </div>
          
          ))
            
          }
        

            {/* Repeat product cards... */}
      </div>


    
          
        

        
      
    </div>
  );
}

export default HomeLayout
  