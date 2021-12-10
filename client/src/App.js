import { useState, useEffect } from "react";
import { Menu } from "./components/Menu";
import { SigninUserForm } from "./features/users/SigninUserForm"
import { SignupUserForm } from "./features/users/SignupUserForm"
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
        {!currentUser && <Route exact path="/signin" element={<SigninUserForm fetchCurrentUser={fetchCurrentUser}/>} />}
        {!currentUser && <Route exact path="/signup" element={<SignupUserForm />} />}
      </Routes>
    </BrowserRouter>
  );
}

export default App;