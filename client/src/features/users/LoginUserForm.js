import React, { useState } from 'react'

export const LoginUserForm = ({fetchCurrentUser}) => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const onUsernameChanged = e => setUsername(e.target.value)
  const onPasswordChanged = e => setPassword(e.target.value)
  
  const handleOnSubmit = (e) => {
    e.preventDefault()
    
    fetch("/api/v1/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username,
        password,
      })
    })
    .then(resp => resp.json()).then(resp => console.log(resp.message))
    .then(fetchCurrentUser)
  }

  return (
    <section>
      <h2>Log In</h2>
      <form onSubmit={handleOnSubmit}>
        <label>Email:</label>
        <input
          type="text"
          name="username"
          value={username}
          onChange={onUsernameChanged}
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
