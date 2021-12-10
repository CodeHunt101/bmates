import { useState, useEffect } from "react";
import { Menu } from "./components/Menu";
import { LoginUserForm } from "./features/users/LoginUserForm"
import { SignupUserForm } from "./features/users/SignupUserForm"
import { LogoutUser } from "./features/users/LogoutUser";
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { WelcomeUser } from "./features/users/WelcomeUser";


function App() {
  const [currentUser, setCurrentUser] = useState(null)

  const fetchCurrentUser = () => {
    fetch('/users')
    .then(resp => resp.json())
    .then(users => setCurrentUser(users.current_user))
  }
  useEffect(()=>{
    fetchCurrentUser()
  },[])
  

  return (
    <BrowserRouter>
      <Menu currentUser={currentUser}/>
      <WelcomeUser currentUser={currentUser} />
      <Routes>
        <Route exact path="/" element={<h1>HOME PAGE!!</h1>} />
        {!currentUser && <Route exact path="/login" element={<LoginUserForm fetchCurrentUser={fetchCurrentUser}/>} />}
        {!currentUser && <Route exact path="/signup" element={<SignupUserForm fetchCurrentUser={fetchCurrentUser}/>} />}
        {currentUser && <Route exact path="/logout" element={<LogoutUser fetchCurrentUser={fetchCurrentUser}/>}/>}
      </Routes>
    </BrowserRouter>
  );
}

export default App;