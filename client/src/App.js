import { useState, useEffect } from "react"
import { Home } from "./components/Home"
import {MainMenu} from "./components/MainMenu"
import { Users } from "./features/users/Users"
import { UserDetails } from "./features/users/UserDetails"
import { ListingsList } from "./features/listings/ListingsList"
import { ListingForm } from "./features/listings/ListingForm"
import { Reservations } from "./features/reservations/Reservations"
import { LoginUserForm } from "./features/users/LoginUserForm"
import { SignupUserForm } from "./features/users/SignupUserForm"
import { LogoutUser } from "./features/users/LogoutUser"
import { Switch, Route, Redirect } from "react-router-dom"
import { ListingDetails } from "./features/listings/ListingDetails"
import { EditUserForm } from "./features/users/EditUserForm"
// import { RedirectToMain } from "./components/RedirectToMain"

function App() {
  const [currentUser, setCurrentUser] = useState(null)
  
  const fetchCurrentUser = () => {
    fetch('/api/v1/current_user')
    .then(resp => resp.json())
    .then(resp => {
      if (resp && resp.current_user) {
        setCurrentUser(resp)
      } 
      else setCurrentUser(null)
      
    })
  }
  useEffect(()=>{
    fetchCurrentUser()
  },[])

  const [userSubmittedImage, setUserSubmittedImage] = useState(false)

  const handleUserSubmittedImage = (status) => {
    setUserSubmittedImage(status)
  }
  
  return (
    <>
      <MainMenu currentUser={currentUser} fetchCurrentUser={fetchCurrentUser} userSubmittedImage={userSubmittedImage}/>
      <section className="main-container">
        <Switch>
          <Route path="/users/:userId/listings">
            <ListingsList currentUser={currentUser}/>
          </Route>
          <Route path="/users/:userId/reservations">
            <Reservations />
          </Route>
          <Route path="/users/:userId">
            <UserDetails />
          </Route>
          <Route path="/users">
            <Users />
          </Route>
        
            {/* If order of listing/new and listing/userid is changed, it won't work */}
        
          <Route path="/listings/new">
            <ListingForm currentUser={currentUser} />
          </Route>
          <Route path="/listings/:listingId/edit">
            <ListingForm currentUser={currentUser} />
          </Route>
          <Route path="/listings/:listingId">
            <ListingDetails currentUser={currentUser} />
          </Route>
          <Route path="/listings">
            <ListingsList currentUser={currentUser} />
          </Route>

          <Route path="/edit-profile">
            <EditUserForm currentUser={currentUser} fetchCurrentUser={fetchCurrentUser} handleUserSubmittedImage={handleUserSubmittedImage}/>
          </Route>
          <Route path="/my-listings">
            <ListingsList currentUser={currentUser} />
          </Route>
          <Route path="/my-reservations">
            <Reservations currentUser={currentUser} fetchCurrentUser={fetchCurrentUser}/>
          </Route>
        
          <Route path="/logout">
            <LogoutUser fetchCurrentUser={fetchCurrentUser} />
            <Redirect to="/"/>
          </Route>
        
          <Route path="/login">
            <LoginUserForm fetchCurrentUser={fetchCurrentUser}/>
            {currentUser && <Redirect to="/"/>}
          </Route>
        
          <Route path="/signup" >
            <SignupUserForm fetchCurrentUser={fetchCurrentUser}/>
            {currentUser && <Redirect to="/"/>}
          </Route>
          <Route exact path="/">
            <Home currentUser={currentUser}/>
          </Route>
        
          {/* <Route exact path="/*" element={<RedirectToMain />}/> */}
          <Route render={() => <h1>404 Not found!</h1>} />
        </Switch>
      </section>
    </>
  )
}

export default App;