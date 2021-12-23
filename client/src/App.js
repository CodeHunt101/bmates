import { useState, useEffect } from "react"
import { Home } from "./components/Home"
import { Menu } from "./components/Menu"
import { Users } from "./features/users/Users"
import { Listings } from "./features/listings/Listings"
import { ListingForm } from "./features/listings/ListingForm"
import { Reservations } from "./features/reservations/Reservations"
import { LoginUserForm } from "./features/users/LoginUserForm"
import { SignupUserForm } from "./features/users/SignupUserForm"
import { LogoutUser } from "./features/users/LogoutUser"
import { Switch, Route, Redirect } from "react-router-dom"
import { Dashboard } from "./components/Dashboard"
// import { RedirectToMain } from "./components/RedirectToMain"

function App() {
  const [currentUser, setCurrentUser] = useState(null)

  const fetchCurrentUser = () => {
    fetch('/api/v1/current_user')
    .then(resp => resp.json())
    .then(resp => setCurrentUser(resp.current_user))
  }
  useEffect(()=>{
    // debugger
    fetchCurrentUser()
  },[])
  
  return (
    <>
      <Menu currentUser={currentUser} />
      <Switch>
        <Route path="/users/:userId/listings">
          <Listings currentUser={currentUser}/>
        </Route>
        <Route path="/users/:userId/reservations">
          <Reservations />
        </Route>
        <Route path="/users/:userId">
          <Users />
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
          <Listings currentUser={currentUser} fetchCurrentUser={fetchCurrentUser}/>
        </Route>
        <Route path="/listings">
          <Listings currentUser={currentUser} fetchCurrentUser={fetchCurrentUser}/>
        </Route>

        {/* <Route path="/dashboard/edit-profile">
          <EditUserForm currentUser={currentUser} fetchCurrentUser={fetchCurrentUser}/>
        </Route>
        <Route path="/dashboard/my-listings">
          <Listings currentUser={currentUser} fetchCurrentUser={fetchCurrentUser}/>
        </Route>
        <Route path="/dashboard/my-reservations">
          <Reservations currentUser={currentUser} fetchCurrentUser={fetchCurrentUser}/>
        </Route> */}
        <Route path="/dashboard">
          <Dashboard currentUser={currentUser} fetchCurrentUser={fetchCurrentUser} />
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
    </>
  )
}

export default App;