import React, { useEffect, useState } from 'react'

const useScrollPosition = () => {
    const [scrollPos,setScrollPos] = useState(window.scrollY)

    useEffect(()=>{
        window.addEventListener("scroll", ()=>setScrollPos(window.scrollY));
        return () => window.removeEventListener("scroll", ()=>setScrollPos(window.scrollY));
    },[])

    return scrollPos
}

export default useScrollPosition