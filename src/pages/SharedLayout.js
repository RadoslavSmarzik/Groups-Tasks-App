import { Outlet } from "react-router-dom"
import MyNavbar from "../components/MyNavbar"
import "./SharedLayout.css"
import { auth } from "../firebase/config"
import { onAuthStateChanged  } from "firebase/auth"
import { useState, useEffect } from "react"
import FetchDatabase from "../components/FetchDatabase"

const SharedLayout = () => {
  const [isLoged, setIsLoged] = useState(false)
  
  useEffect( () => {
    const unsubscribe = onAuthStateChanged(auth, (user) =>{
      if (user){
        setIsLoged(true)
        return
      }
      setIsLoged(false)
    })

    return () => unsubscribe()

  }, [])

  return (
    <div>
        {isLoged && <FetchDatabase/>}
        <MyNavbar className="navigation" isLoged = {isLoged}></MyNavbar>
        <section className="main">
          {isLoged && <Outlet/>}
        </section>
    </div>
  )
}

export default SharedLayout