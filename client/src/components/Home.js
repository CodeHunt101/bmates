import React from "react"
import { Link } from "react-router-dom"

export const Home = ({currentUser}) => (
  <div className="home">
    <h1>Home Page!!</h1>
    {currentUser && <Link to="/listings">
      <b>Search Listings</b>
    </Link>}
  </div>
)