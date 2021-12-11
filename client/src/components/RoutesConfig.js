import { App } from "../App"
import { Users } from "./features/users/Users"
import { User } from "./features/users/User"
import { Listings } from "./features/listings/Listings"
import { Listing } from "./features/listings/Listing"
import { LoginUserForm } from "./features/users/LoginUserForm"
import { SignupUserForm } from "./features/users/SignupUserForm"
import { LogoutUser } from "./features/users/LogoutUser"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { useState, useEffect } from "react"

export const RoutesConfig = () => {
  const [currentUser, setCurrentUser] = useState(null)

  const fetchCurrentUser = () => {
    fetch('/users')
    .then(resp => resp.json())
    .then(users => setCurrentUser(users.current_user))
  }
  useEffect(()=>{
    fetchCurrentUser()
  },[])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App currentUser={currentUser} fetchCurrentUser={fetchCurrentUser}/>} >
          {currentUser && 
            <>
            <Route path="mates" element={<Users isMate={true}/>}>
              <Route path=":userId" element={<User/>} />
              <Route path=":userId/listings" element={<Listings/>}/>
            </Route>
            
            <Route path="members" element={<Users isMate={false}/>}>
              <Route path=":userId" element={<User/>} />
            </Route>
            <Route path="listings" element={<Listings/>}>
              <Route path=":listingId" element={<Listing />} />
            </Route>
            <Route path="logout" element={<LogoutUser/>}/>
            </>
          }
          {!currentUser && <Route path="/login" element={<LoginUserForm/>} />}
          {!currentUser && <Route path="/signup" element={<SignupUserForm/>} />}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}