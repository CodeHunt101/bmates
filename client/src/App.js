import { useState, useEffect } from "react"
import { Home } from "./components/Home"
import { Menu } from "./components/Menu"
import { Users } from "./features/users/Users"
import { User } from "./features/users/User"
import { Listings } from "./features/listings/Listings"
import { Listing } from "./features/listings/Listing"
import { LoginUserForm } from "./features/users/LoginUserForm"
import { SignupUserForm } from "./features/users/SignupUserForm"
import { LogoutUser } from "./features/users/LogoutUser"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { WelcomeUser } from "./features/users/WelcomeUser"
// import { RedirectToMain } from "./components/RedirectToMain"

function App() {
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
    <Router>
      <Menu currentUser={currentUser}/>
      <WelcomeUser currentUser={currentUser} />
      <Routes>
        <Route path="/" element={<Home />} />
          {currentUser && (
        <>
          <Route path="mates" element={<Users isMate={true}/>}>
            <Route path=":userId" element={<User/>} />
          </Route>
          {currentUser.mate && <Route path="mates/:userId/listings" element={<Listings/>}/>}
          <Route path="members" element={<Users isMate={false}/>}>
            <Route path=":userId" element={<User/>} />
          </Route>
          <Route path="listings" element={<Listings/>}>
            <Route path=":listingId" element={<Listing />} />
          </Route>
          <Route path="logout" element={<LogoutUser fetchCurrentUser={fetchCurrentUser}/>}/>
          </>
        )}
        {!currentUser && <Route path="login" element={<LoginUserForm fetchCurrentUser={fetchCurrentUser}/>} />}
        {!currentUser && <Route path="signup" element={<SignupUserForm fetchCurrentUser={fetchCurrentUser}/>} />}
          {/* TODO: redirect to main when url is wrong */}
          {/* <Route path="/*" element={<RedirectToMain />}/> */}
        
      </Routes>
    </Router>
  )
}

export default App;