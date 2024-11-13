import React,{useState, useEffect} from 'react'

export const useSizes = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)

    useEffect(() => {
        // Add event listener for window resize
        const handleResize = () => {
          setWindowWidth(window.innerWidth);
        };
    
        window.addEventListener('resize', handleResize);
    
        // Remove event listener when the component unmounts
        return () => {
          window.removeEventListener('resize', handleResize);
        };
      }, [])
      const isSmallScreen = windowWidth <= 700;
      return {isSmallScreen}
}