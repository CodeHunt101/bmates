import React from "react"
import { Link, Switch, Route } from "react-router-dom"
import { EditUserForm } from "../features/users/EditUserForm"
import { Listings } from "../features/listings/Listings"

export const Dashboard = ({currentUser, fetchCurrentUser}) => {
  return (
    <>
    <h1>Dashboard</h1>
    <nav>
      <Link to="/dashboard/edit-profile">
        <b>Edit Profile</b>
      </Link>
      <Link to="/dashboard/inbox">
        <b>Inbox</b>
      </Link>
      <Link to="/dashboard/my-listings">
        <b>My Listings</b>
      </Link>
      <Link to="/dashboard/my-reservations">
        <b>My Reservations</b>
      </Link>

      <Switch>
        <Route path="/dashboard/edit-profile">
          <EditUserForm currentUser={currentUser} fetchCurrentUser={fetchCurrentUser}/>
        </Route>
        <Route path="/dashboard/my-listings">
          <Listings currentUser={currentUser} fetchCurrentUser={fetchCurrentUser}/>
        </Route>
      </Switch>
    </nav>
    </>
  )
}