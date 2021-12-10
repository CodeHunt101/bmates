import React, { useState } from 'react'
import { useNavigate } from "react-router-dom"

export const LoginUserForm = ({fetchCurrentUser}) => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onEmailChanged = e => setEmail(e.target.value)
  const onPasswordChanged = e => setPassword(e.target.value)
  
  const handleOnSubmit = (e) => {
    e.preventDefault()
    
    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email,
        password,
      })
    })
    .then(fetchCurrentUser)
    .then(navigate('/'))
  }

  return (
    <section>
      <h2>Log In</h2>
      <form onSubmit={handleOnSubmit}>
        <label>Email:</label>
        <input
          type="text"
          name="email"
          value={email}
          onChange={onEmailChanged}
        />
        <label>Password:</label>
        <input
          type="password"
          name="firstName"
          value={password}
          onChange={onPasswordChanged}
        />
        <button type="submit">
          Log In
        </button>
      </form>
    </section>
  )
}
