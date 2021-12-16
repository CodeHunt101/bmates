import { Link } from "react-router-dom"

export const Menu = ({currentUser}) => {
  
  return (
        
    <nav>
      <Link to="/">
        <b>Home</b>
      </Link>
      {currentUser && <Link to="/users">
        <b>Users</b>
      </Link>}
      {currentUser && <Link to={"/users/"+currentUser.id+"/listings"}>
        <b>My listings</b>
      </Link>}
      {currentUser && <Link to="/listings">
        <b>Listings</b>
      </Link>}
      {!currentUser && <Link to="/login">
        <b>Log In</b>
      </Link>}
      {!currentUser && <Link to="/signup">
        <b>Sign Up</b>
      </Link>}
      {currentUser && <Link to="/logout">
        <b>Log Out</b>
      </Link>}
    </nav>
  )
}