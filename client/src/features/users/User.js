import React from "react"
import { useParams } from "react-router"

export const User = ({user}) => {
  const {userId} = useParams()
  const renderUser = () => {
    if (!userId) {
      return ( 
        <p>{user.first_name} {user.last_name}</p>)
    } else {
      if (parseInt(userId) === user.id) {
        return (
          <p>{user.first_name} {user.last_name}</p>
        )
      }
    }
  }
  
  return(
    <div className="user">
      {renderUser()}
    </div>
  )
}