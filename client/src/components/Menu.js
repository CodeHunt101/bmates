import { Link } from "react-router-dom"

export const Menu = ({currentUser}) => {
  return (
    
        <nav>
          <Link to="/">
            <b>Home</b>
          </Link>
          {!currentUser && <Link to="/signin">
            <b>Sign In</b>
          </Link>}
          {!currentUser && <Link to="/signup">
            <b>Sign Up</b>
          </Link>}
          <Link to="/signout">
            <b>Sign Up</b>
          </Link>
        </nav>
  )
}