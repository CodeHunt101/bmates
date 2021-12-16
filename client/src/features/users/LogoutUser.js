import React from "react"

export const LogoutUser = ({fetchCurrentUser}) => {
  
  const handleLogout = () => {
    fetch('/api/v1/logout')
      .then(fetchCurrentUser)
  }
  
  return (
    <>
      {handleLogout()}
    </>
  )
}