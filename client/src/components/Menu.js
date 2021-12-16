import { Link } from "react-router-dom"
import { WelcomeUser } from "../features/users/WelcomeUser"

export const Menu = ({currentUser}) => {
  
  return (
    <div className="menu">   
      <WelcomeUser currentUser={currentUser} />
      <nav>
        <Link to="/">
          <b>Home</b>
        </Link>
        {/* {currentUser && <Link to="/users">
          <b>Users</b>
        </Link>} */}
        {/* {currentUser && <Link to={"/users/"+currentUser.id+"/listings"}>
          <b>My listings</b>
        </Link>} */}
        {!currentUser && <Link to="/login">
          <b>Log In</b>
        </Link>}
        {!currentUser && <Link to="/signup">
          <b>Sign Up</b>
        </Link>}
        {currentUser && <Link to="/dashboard">
          <b>Dashboard</b>
        </Link>}
        {currentUser && <Link to="/logout">
          <b>Log Out</b>
        </Link>}
        <Link to="/faq">
          <b>FAQ</b>
        </Link>
      </nav>
      <span>
        <Link to="/listings/new">
          <b>Add listing</b>
        </Link>
      </span>
    </div> 
  )
}