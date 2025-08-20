import img from '/images/donut.png'


const Loader = () =>{
  
  
  return(
    
    <div className="w-screen h-screen flex bg-fuchsia-100 items-center justify-center">
    
      <div className="w-20 h-20 border-8 border-pink-600 rounded-full animate-spin border-t-transparent flex items-center justify-center" >
        <img src={img} className="w-10" />
      </div>
    </div>
    
  )
}

export default Loader
  