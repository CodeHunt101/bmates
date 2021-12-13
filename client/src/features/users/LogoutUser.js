import React from "react"

export const LogoutUser = ({fetchCurrentUser}) => {
  
  const handleLogout = () => {
    fetch('/logout')
      .then(fetchCurrentUser)
  }
  
  return (
    <>
      {handleLogout()}
    </>
  )
}