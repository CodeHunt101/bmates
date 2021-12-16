import React, { useState } from 'react'

export const SignupUserForm = ({fetchCurrentUser}) => {
  
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [gender, setGender] = useState('')
  const [bio, setBio] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')

  const onFirstNameChanged = e => setFirstName(e.target.value)
  const onLastNameChanged = e => setLastName(e.target.value)
  const onGenderChanged = e => setGender(e.target.value)
  const onBioChanged = e => setBio(e.target.value)
  const onUsernameChanged = e => setUsername(e.target.value)
  const onEmailChanged = e => setEmail(e.target.value)
  const onPasswordChanged = e => setPassword(e.target.value)
  const onPasswordConfirmationChanged = e => setPasswordConfirmation(e.target.value)
  
  const handleOnSubmit = (e) => {
    e.preventDefault()
    fetch("/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        user: {
          first_name: firstName,
          last_name: lastName,
          gender,
          bio,
          username: username,
          email,
          password: password,
          password_confirmation: passwordConfirmation
        }
      })
    })
    .then(()=>
      fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username,
          password,
        })
      })
      .then(fetchCurrentUser)
    )
    
  }

  return (
    <section>
      <h2>Sign Up</h2>
      <form onSubmit={handleOnSubmit}>
        <label>First Name:</label>
        <input
          type="text"
          name="firstName"
          value={firstName}
          onChange={onFirstNameChanged}
        />
        <label>Last Name:</label>
        <input
          type="text"
          name="lastName"
          value={lastName}
          onChange={onLastNameChanged}
        />
        <label>Gender:</label>
        <select value={gender} onChange={onGenderChanged}>
          <option value=""></option>
          <option value="M">Male</option>
          <option value="F">Female</option>
        </select>
        <label>Bio:</label>
        <textarea
          name="bio"
          value={bio}
          onChange={onBioChanged}
        />
        <label>Username:</label>
        <input
          name="username"
          value={username}
          onChange={onUsernameChanged}
        />
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
          name="password"
          value={password}
          onChange={onPasswordChanged}
        />
        <label>Password Confirmation:</label>
        <input
          type="password"
          name="password_confirmation"
          value={passwordConfirmation}
          onChange={onPasswordConfirmationChanged}
        />
        <button type="submit">
          Sign Up
        </button>
      </form>
    </section>
  )  
}
