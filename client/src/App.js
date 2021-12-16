import { useState, useEffect } from "react"
import { Home } from "./components/Home"
import { Menu } from "./components/Menu"
// import { WelcomeUser } from "./features/users/WelcomeUser"
import { Users } from "./features/users/Users"
import { Listings } from "./features/listings/Listings"
import { Reservations } from "./features/reservations/Reservations"
import { LoginUserForm } from "./features/users/LoginUserForm"
import { SignupUserForm } from "./features/users/SignupUserForm"
import { LogoutUser } from "./features/users/LogoutUser"
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom"
// import { RedirectToMain } from "./components/RedirectToMain"

function App() {
  const [currentUser, setCurrentUser] = useState(null)

  const fetchCurrentUser = () => {
    fetch('/api/v1/users')
    .then(resp => resp.json())
    .then(users => setCurrentUser(users.current_user))
  }
  useEffect(()=>{
    fetchCurrentUser()
  },[])
  
  return (
    <Router>
      <Menu currentUser={currentUser}/>
      <Switch>
        <Route exact path="/">
          <Home currentUser={currentUser}/>
        </Route>
          
        <Route exact path="/users">
          <Users />
        </Route>
        
        <Route exact path="/users/:userId">
          <Users />
        </Route>
        
        <Route exact path="/users/:userId/listings">
          <Listings />
        </Route>

        <Route exact path="/listings">
          <Listings />
        </Route>

        <Route exact path="/listings/:listingId">
          <Listings />
        </Route>
     
        <Route exact path="/users/:userId/made_reservations">
          <Reservations isProvider={false} />
        </Route>

        <Route exact path="/users/:userId/received_reservations">
          <Reservations isProvider={true}/>
        </Route>
        
        <Route exact path="/logout">
          <LogoutUser fetchCurrentUser={fetchCurrentUser} />
          <Redirect to="/"/>
        </Route>
        
        <Route exact path="/login">
          <LoginUserForm fetchCurrentUser={fetchCurrentUser}/>
          {currentUser && <Redirect to="/"/>}
        </Route>
      
        <Route exact path="/signup" >
          <SignupUserForm fetchCurrentUser={fetchCurrentUser}/>
          {currentUser && <Redirect to="/"/>}
        </Route>
        
        {/* <Route exact path="/*" element={<RedirectToMain />}/> */}
        <Route render={() => <h1>Not found!</h1>} />
      </Switch>
    </Router>
  )
}

export default App;