import React, { useState, useEffect } from "react"
import { User } from "./User"

export const Users = () => {
  const [users, setUsers] = useState([])
  
  useEffect(()=>{
      fetch('/users')
        .then(resp => resp.json())
        .then(resp => setUsers(resp.users))
  },[])
  
  const renderUsers = () => (
      users.map(user => <User key={user.id} user={user}/>)
  )

  return(
    <>
      <h2>Users</h2>
      {renderUsers()}
    </>
  )
}