import { Link } from "react-router-dom"

export const Menu = ({currentUser}) => {
  return (
    
        <nav>
          <Link to="/">
            <b>Home</b>
          </Link>
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