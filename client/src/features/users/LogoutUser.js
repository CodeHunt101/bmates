import React, {useEffect} from "react"
import { useNavigate } from "react-router"

export const LogoutUser = ({fetchCurrentUser}) => {
  const navigate = useNavigate()
  
  

  const handleLogout = () => {
    fetch('/logout')
      .then(fetchCurrentUser)
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(()=>navigate("/"),[handleLogout])
  
  return (
    <>
      {handleLogout()}
    </>
  )
}