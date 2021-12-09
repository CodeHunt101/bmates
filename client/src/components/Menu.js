import { Link } from "react-router-dom"

export const Menu = () => {
  return (
    
        <nav>
          <Link to="/">
            <b>Home</b>
          </Link>
          <Link to="/signin">
            <b>Sign In</b>
          </Link>
          <Link to="/signup">
            <b>Sign Up</b>
          </Link>
        </nav>
  )
}