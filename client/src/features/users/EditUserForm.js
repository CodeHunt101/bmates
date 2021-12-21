import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router'

export const EditUserForm = ({currentUser, fetchCurrentUser}) => {

  const [isFormSubmitted, setIsFormSubmitted] = useState(false)

  const [formData, setFormData] = useState({
    id: "",
    firstName: "",
    lastName: "",
    gender: "",
    bio: "",
    username: "",
    email: "",
    password: "",
    passwordConfirmation: ""
   
  })

  useEffect(()=> {
    currentUser && setFormData({
      id: currentUser.id,
      firstName: currentUser.first_name,
      lastName: currentUser.last_name,
      gender: currentUser.gender,
      bio: currentUser.bio,
      username: currentUser.username,
      email: currentUser.email,
      password: "",
      passwordConfirmation: ""
    })
  },[currentUser])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(()=>fetchCurrentUser(),[])

  const handleOnChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }
  
  const handleOnSubmit = (e) => {
    e.preventDefault()
    fetch(`/api/v1/users/${formData.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        user: {
          id: formData.id,
          first_name: formData.firstName,
          last_name: formData.lastName,
          gender: formData.gender,
          bio: formData.bio,
          username: formData.username,
          email: formData.email,
          password: formData.password,
          password_confirmation: formData.passwordConfirmation
        }
      })
    }).then(()=>setIsFormSubmitted(true))
    
  }

  if (isFormSubmitted) {
    return <Redirect push to={`/users/${formData.id}`} />
  }

  return (
    <section>
      <h2>Edit Profile</h2>
      <form onSubmit={handleOnSubmit}>
        <label>First Name:</label>
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleOnChange}
        />
        <label>Last Name:</label>
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleOnChange}
        />
        <label>Gender:</label>
        <select value={formData.gender} name="gender" onChange={handleOnChange}>
          <option value=""></option>
          <option value="M">Male</option>
          <option value="F">Female</option>
        </select>
        <label>Bio:</label>
        <textarea
          name="bio"
          value={formData.bio}
          onChange={handleOnChange}
        />
        <label>Username:</label>
        <input
          name="username"
          value={formData.username}
          onChange={handleOnChange}
        />
        <label>Email:</label>
        <input
          type="text"
          name="email"
          value={formData.email}
          onChange={handleOnChange}
        />
        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleOnChange}
        />
        <label>Password Confirmation:</label>
        <input
          type="password"
          name="passwordConfirmation"
          value={formData.passwordConfirmation}
          onChange={handleOnChange}
        />
        <button type="submit">
          Submit
        </button>
      </form>
    </section>
  )  
}
