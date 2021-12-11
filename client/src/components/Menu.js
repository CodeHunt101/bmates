import { Link } from "react-router-dom"

export const Menu = ({currentUser}) => {
  
  return (
        
        <nav>
          <Link to="/">
            <b>Home</b>
          </Link>
          {currentUser && <Link to="/mates">
            <b>Mates</b>
          </Link>}
          {currentUser && <Link to="/members">
            <b>Members</b>
          </Link>}
          {currentUser && <Link to={"/mates/"+currentUser.id+"/listings"}>
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