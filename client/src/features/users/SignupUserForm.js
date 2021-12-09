import React, { useState } from 'react'

export const SignupUserForm = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [gender, setGender] = useState('')
  const [bio, setBio] = useState('')
  const [userName, setUserName] = useState('')
  const [email, setEmail] = useState('')
  const [isMate, setIsMate] = useState(false)
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')


  const onFirstNameChanged = e => setFirstName(e.target.value)
  const onLastNameChanged = e => setLastName(e.target.value)
  const onGenderChanged = e => setGender(e.target.value)
  const onBioChanged = e => setBio(e.target.value)
  const onUserNameChanged = e => setUserName(e.target.value)
  const onEmailChanged = e => setEmail(e.target.value)
  const onIsMateChanged = e => (
    e.target.checked ? setIsMate(true) : setIsMate(false)
  )
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
          username: userName,
          email,
          mate: isMate,
          password: password,
          password_confirmation: passwordConfirmation
        }
      })
    })
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
        <label>UserName:</label>
        <input
          name="username"
          value={userName}
          onChange={onUserNameChanged}
        />
        <label>Email:</label>
        <input
          type="text"
          name="email"
          value={email}
          onChange={onEmailChanged}
        />
        <label>Mate:</label>
        <input
          type="checkbox"
          name="mate"
          value={isMate}
          onChange={onIsMateChanged}
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
