import { Menu } from "./components/Menu";
import { SigninUserForm } from "./features/users/SigninUserForm"
import { SignupUserForm } from "./features/users/SignupUserForm"
import { BrowserRouter, Routes, Route } from "react-router-dom"


function App() {

  return (
    <BrowserRouter>
      <Menu />
      <Routes>
        <Route exact path="/" element={<h1>HOME PAGE!!</h1>} />
          
        <Route exact path="/signin" element={<SigninUserForm />} />
          
        <Route exact path="/signup" element={<SignupUserForm />} />
          
      </Routes>
    </BrowserRouter>
  );
}

export default App;