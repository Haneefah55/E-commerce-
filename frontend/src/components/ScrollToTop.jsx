import React, { useEffect } from 'react'
import { useLocation } from 'react-router'

const ScrollToTop = () => {

  const { pathname } = useLocation()

  useEffect(() =>  {

   // console.log("routes changed to", pathname)
    const scrolldev = document.querySelector('.overflow-auto')

    if(scrolldev) {
      scrolldev.scrollTo({
        top: 0,
      left: 0,
      behavior: "smooth",

      })
    }

  }, [pathname])

  return null
}

export default ScrollToTop