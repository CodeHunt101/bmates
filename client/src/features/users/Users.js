import React, { useState, useEffect } from "react"
import { User } from "./User"

export const Users = ({isMate}) => {
  const [users, setUsers] = useState([])
  
  useEffect(()=>{
      fetch('/users')
        .then(resp => resp.json())
        .then(resp => setUsers(resp.users))
  },[])
  
  const renderUsers = (isMate) => (
      users.filter(user => user.mate === isMate)
      .map(user => <User key={user.id} user={user}/>)
  )

  return(
    <>
      <h2>Users</h2>
      {renderUsers(isMate)}
    </>
  )
}