import { useState, useEffect } from "react"
import { Home } from "./components/Home"
import { MainMenu } from "./components/MainMenu"
import { Users } from "./features/users/Users"
import { UserDetails } from "./features/users/UserDetails"
import { ListingsList } from "./features/listings/ListingsList"
import { ListingForm } from "./features/listings/ListingForm"
import { Reservations } from "./features/reservations/Reservations"
import { LoginUserForm } from "./features/users/LoginUserForm"
import { SignupUserForm } from "./features/users/SignupUserForm"
import { Switch, Route, Redirect, useLocation } from "react-router-dom"
import { ListingDetails } from "./features/listings/ListingDetails"
import { EditUserForm } from "./features/users/EditUserForm"
import { Inbox } from "./features/messages/Inbox"

function App() {
  const location = useLocation()
  const path = location.pathname

  const [currentUser, setCurrentUser] = useState(null)
  const [userResponseGiven, setUserResponseGiven] = useState(false)

  const fetchCurrentUser = () => {
    fetch("/api/v1/current_user")
      .then((resp) => resp.json())
      .then((resp) => {
        if (resp && resp.current_user) {
          setCurrentUser(resp)
        } else setCurrentUser(null)
      })
      .then(() => setUserResponseGiven(true))
  }

  const userIsLoggedIn = (condition = true) => {
    if (condition === true) {
      return !!(currentUser && userResponseGiven)
    } else {
      return !!(!currentUser && userResponseGiven)
    }
  }

  const handleCurrentUser = (value) => {
    setCurrentUser(value)
  }

  const [validationErrors, setValidationErrors] = useState({
    session: false,
    users: false,
    listings: false,
    reservations: false,
    sortAndFilters: false,
  })

  const handleValidationErrors = (object) => {
    setValidationErrors(object)
  }

  useEffect(
    () =>
      setValidationErrors({
        session: false,
        users: false,
        listings: false,
        reservations: false,
        sortAndFilters: false,
      }),
    [path]
  )

  const [userSubmittedImage, setUserSubmittedImage] = useState(false)

  const handleUserSubmittedImage = (status) => {
    setUserSubmittedImage(status)
  }

  useEffect(() => {
    fetchCurrentUser()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userSubmittedImage])

  return (
    <>
      <MainMenu
        currentUser={currentUser}
        fetchCurrentUser={fetchCurrentUser}
        handleCurrentUser={handleCurrentUser}
      />
      <section className="main-container">
        <Switch>
          <Route path="/users/:userId/listings">
            <ListingsList currentUser={currentUser} />
          </Route>
          <Route path="/users/:userId/reservations">
            {userIsLoggedIn() && <Reservations />}
            {userIsLoggedIn(false) && <Redirect to="/" />}
          </Route>
          <Route path="/users/:userId">
            <UserDetails currentUser={currentUser} />
          </Route>
          <Route path="/users">
            <Users />
          </Route>

          {/* If order of listing/new and listing/userid is changed, it won't work */}

          <Route path="/listings/new">
            {userIsLoggedIn() && (
              <ListingForm
                currentUser={currentUser}
                handleValidationErrors={handleValidationErrors}
                validationErrors={validationErrors}
              />
            )}
            {userIsLoggedIn(false) && <Redirect to="/" />}
          </Route>
          <Route path="/listings/:listingId/edit">
            {userIsLoggedIn() && (
              <ListingForm
                currentUser={currentUser}
                handleValidationErrors={handleValidationErrors}
                validationErrors={validationErrors}
              />
            )}
            {userIsLoggedIn(false) && <Redirect to="/" />}
          </Route>
          <Route path="/listings/:listingId">
            <ListingDetails currentUser={currentUser} />
          </Route>
          <Route path="/listings">
            <ListingsList currentUser={currentUser} />
          </Route>

          <Route path="/edit-profile">
            {/* SHA: why the warning with the ternary operator */}
            {/* {userIsLoggedIn(false) ? <Redirect to="/"/> : <EditUserForm currentUser={currentUser} fetchCurrentUser={fetchCurrentUser} handleUserSubmittedImage={handleUserSubmittedImage}/>} */}
            {userIsLoggedIn(false) && <Redirect to="/" />}
            {userIsLoggedIn() && (
              <EditUserForm
                currentUser={currentUser}
                fetchCurrentUser={fetchCurrentUser}
                handleUserSubmittedImage={handleUserSubmittedImage}
                handleValidationErrors={handleValidationErrors}
                validationErrors={validationErrors}
              />
            )}
          </Route>
          <Route path="/my-listings">
            {/* SHA: why the ternary operator won't work */}
            {/* {userIsLoggedIn() ? <ListingsList currentUser={currentUser} /> : <Redirect to="/"/>} */}
            {userIsLoggedIn(false) && <Redirect to="/" />}
            {userIsLoggedIn() && <ListingsList currentUser={currentUser} />}
          </Route>
          <Route path="/my-reservations">
            {userIsLoggedIn(false) ? (
              <Redirect to="/" />
            ) : (
              <Reservations
                currentUser={currentUser}
                fetchCurrentUser={fetchCurrentUser}
              />
            )}
          </Route>
          <Route path="/inbox">
            {userIsLoggedIn() && <Inbox currentUser={currentUser} />}
            {userIsLoggedIn(false) && <Redirect to="/" />}
          </Route>

          <Route path="/login">
            {currentUser && <Redirect to="/" />}
            {!currentUser && (
              <LoginUserForm
                fetchCurrentUser={fetchCurrentUser}
                handleValidationErrors={handleValidationErrors}
                validationErrors={validationErrors}
              />
            )}
          </Route>

          <Route path="/signup">
            {currentUser && <Redirect to="/" />}
            {userIsLoggedIn(false) && (
              <SignupUserForm
                fetchCurrentUser={fetchCurrentUser}
                handleValidationErrors={handleValidationErrors}
                validationErrors={validationErrors}
              />
            )}
          </Route>
          <Route exact path="/">
            <Home />
          </Route>
          <Route render={() => <h1>404 Not found!</h1>} />
        </Switch>
      </section>
    </>
  )
}

export default App
