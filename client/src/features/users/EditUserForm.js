import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router'
import Avatar from "@mui/material/Avatar"
import Button from "@mui/material/Button"
import CssBaseline from "@mui/material/CssBaseline"
import TextField from "@mui/material/TextField"
import Link from "@mui/material/Link"
import Grid from "@mui/material/Grid"
import Box from "@mui/material/Box"
import AccessibilityNewIcon from "@mui/icons-material/AccessibilityNew"
import Typography from "@mui/material/Typography"
import { blue } from "@mui/material/colors"
import Paper from "@mui/material/Paper"
import Select from "@mui/material/Select"
import MenuItem from "@mui/material/MenuItem"
import InputLabel from "@mui/material/InputLabel"
import FormControl from "@mui/material/FormControl"

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
    // password: "",
    // passwordConfirmation: ""
   
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
      // password: "",
      // passwordConfirmation: ""
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
          // password: formData.password,
          // password_confirmation: formData.passwordConfirmation
        }
      })
    }).then(()=>setIsFormSubmitted(true))
    
  }

  if (isFormSubmitted) {
    return <Redirect push to={`/users/${formData.id}`} />
  }

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <CssBaseline />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: blue[500] }}>
            <AccessibilityNewIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Edit Profile
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleOnSubmit}
            sx={{ mt: 1 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <TextField
                  autoComplete="given-first-name"
                  name="firstName"
                  required
                  id="edit-user-first-name"
                  label="First Name"
                  value={formData.firstName}
                  onChange={handleOnChange}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  autoComplete="given-last-name"
                  name="lastName"
                  required
                  id="edit-user-last-name"
                  label="Last name"
                  value={formData.lastName}
                  onChange={handleOnChange}
                />
              </Grid>
                {/* <label>Gender:</label>
                <select value={formData.gender} name="gender" onChange={handleOnChange}>
                  <option value=""></option>
                  <option value="M">Male</option>
                  <option value="F">Female</option>
                </select> */}
              <Grid item xs={12} sm={4}>
                <FormControl sx={{ minWidth: 100 }}>
                  <InputLabel id="demo-simple-select-helper-label">
                    Gender
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={formData.gender}
                    label="Gender"
                    onChange={handleOnChange}
                    name="gender"
                  >
                    <MenuItem value={"M"}>Male</MenuItem>
                    <MenuItem value={"F"}>Female</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
                {/* <label>Bio:</label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleOnChange}
                /> */}
              <Grid item xs={12}>
                <TextField
                  name="bio"
                  required
                  multiline
                  minRows={3}
                  fullWidth
                  id="edit-user-bio"
                  label="Bio"
                  value={formData.bio}
                  onChange={handleOnChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-username"
                  name="username"
                  required
                  fullWidth
                  id="edit-user-userName"
                  label="Username"
                  value={formData.username}
                  onChange={handleOnChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="edit-user-email"
                  label="Email Address"
                  name="email"
                  value={formData.email}
                  onChange={handleOnChange}
                />
              </Grid>
                {/* <label>Password:</label>
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
                /> */}
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Submit
              </Button>
            </Grid>
          </Box>
        </Box>
      </Grid>
    </Grid>
  )  
}
