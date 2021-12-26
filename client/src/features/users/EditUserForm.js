import React, { useState, useEffect } from "react"
import { useHistory } from "react-router"
import Avatar from "@mui/material/Avatar"
import Button from "@mui/material/Button"
import CssBaseline from "@mui/material/CssBaseline"
import TextField from "@mui/material/TextField"
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
import FormGroup from "@mui/material/FormGroup"
import FormControlLabel from "@mui/material/FormControlLabel"
import Checkbox from "@mui/material/Checkbox"

export const EditUserForm = ({ currentUser, fetchCurrentUser }) => {
  const history = useHistory()

  const [formData, setFormData] = useState({
    id: "",
    firstName: "",
    lastName: "",
    gender: "",
    bio: "",
    username: "",
    email: "",
    password: "",
    passwordConfirmation: "",
  })

  const [passwordChangeRequired, setPasswordChangeRequired] = useState(false)

  useEffect(() => {
    currentUser &&
      setFormData({
        id: currentUser.id,
        firstName: currentUser.first_name,
        lastName: currentUser.last_name,
        gender: currentUser.gender,
        bio: currentUser.bio,
        username: currentUser.username,
        email: currentUser.email,
        password: "",
        passwordConfirmation: "",
      })
  }, [currentUser])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => fetchCurrentUser(), [])

  const handleOnChange = (e) => {
    console.log(e.target.checked)
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleOnCheck = (e) => {
    setPasswordChangeRequired(e.target.checked)
  }

  const handleOnSubmit = (e) => {
    e.preventDefault()
    const objectToStringifyWithoutPassword = {
      user: {
        id: formData.id,
        first_name: formData.firstName,
        last_name: formData.lastName,
        gender: formData.gender,
        bio: formData.bio,
        username: formData.username,
        email: formData.email,
      },
    }

    const objectToStringifyWithPassword = {
      ...objectToStringifyWithoutPassword,
      user: {
        ...objectToStringifyWithoutPassword.user,
        password: formData.password,
        password_confirmation: formData.passwordConfirmation,
      },
    }

    fetch(`/api/v1/users/${formData.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(
        passwordChangeRequired
          ? objectToStringifyWithPassword
          : objectToStringifyWithoutPassword
      ),
    }).then(
      () => {
        if (passwordChangeRequired) {
          return (
            formData.password.length >= 6 &&
            formData.password.length <= 20 &&
            formData.password === formData.passwordConfirmation &&
            history.push(`/users/${formData.id}`)
          )
        } else {
          return history.push(`/users/${formData.id}`)
        }
      }
        
    )
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
            sx={{ mt: 1, my: 5 }}
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
              <Grid item xs={12}>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        onChange={handleOnCheck}
                        inputProps={{ "aria-label": "controlled" }}
                      />
                    }
                    label="I want to change my password"
                  />
                </FormGroup>
              </Grid>
              {passwordChangeRequired && (
                <>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="edit-user-password"
                      autoComplete="new-password"
                      onChange={handleOnChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      name="passwordConfirmation"
                      label="Password Confirmation"
                      type="password"
                      id="edit-user-password-confirmation"
                      autoComplete="new-password"
                      onChange={handleOnChange}
                    />
                  </Grid>
                </>
              )}
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
