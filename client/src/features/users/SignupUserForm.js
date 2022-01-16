import React, { useState } from "react"
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

function GitHubLink() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      <Link color="inherit" href="https://github.com/CodeHunt101">
        My GitHub profile
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  )
}

export const SignupUserForm = ({ fetchCurrentUser }) => {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [passwordConfirmation, setPasswordConfirmation] = useState("")
  const [errors, setErrors] = useState(null)

  const onUsernameChanged = (e) => setUsername(e.target.value)
  const onEmailChanged = (e) => setEmail(e.target.value)
  const onPasswordChanged = (e) => setPassword(e.target.value)
  const onPasswordConfirmationChanged = (e) =>
    setPasswordConfirmation(e.target.value)

  const handleOnSubmit = (e) => {
    // POSTs a new user and logs them in
    e.preventDefault()
    fetch("/api/v1/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: {
          username: username.toLowerCase(),
          email,
          password,
          password_confirmation: passwordConfirmation,
        },
      }),
    })
      .then((resp) => resp.json())
      .then((resp) => {
        if (resp?.errors_count) {
          setErrors(resp)
        } else {
          fetch("/api/v1/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username: username.toLowerCase(),
              password,
            }),
          }).then(fetchCurrentUser)
        }
      })
  }
  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: "url(https://source.unsplash.com/random?friends)",
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
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
          <Typography
            component="h1"
            variant="h5"
            color="white"
            sx={{
              backgroundColor: "#1976d2",
              width: "fit-content",
              margin: "auto",
              borderRadius: "25px",
              p: 1.5,
            }}
          >
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleOnSubmit}
            sx={{ mt: 1 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  error={!!errors?.error_messages?.username}
                  helperText={
                    errors?.error_messages?.username
                      ? `Username ${errors.error_messages.username[0]}`
                      : false
                  }
                  autoComplete="given-username"
                  name="userName"
                  required
                  fullWidth
                  id="signup-userName"
                  label="Username"
                  autoFocus
                  onChange={onUsernameChanged}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={!!errors?.error_messages?.email}
                  helperText={
                    errors?.error_messages?.email
                      ? `Email ${errors.error_messages.email[0]}`
                      : false
                  }
                  required
                  fullWidth
                  id="signup-email"
                  label="Email Address"
                  type="email"
                  name="email"
                  autoComplete="email"
                  onChange={onEmailChanged}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  error={!!errors?.error_messages?.password}
                  helperText={
                    errors?.error_messages?.password
                      ? `Password ${errors.error_messages.password[0]}`
                      : false
                  }
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="signup-password"
                  autoComplete="new-password"
                  onChange={onPasswordChanged}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  error={!!errors?.error_messages?.password_confirmation}
                  helperText={
                    errors?.error_messages?.password_confirmation
                      ? `Password confirmation ${errors.error_messages.password_confirmation[0]}`
                      : false
                  }
                  required
                  fullWidth
                  name="passwordConfirmation"
                  label="Password Confirmation"
                  type="password"
                  id="signup-password-confirmation"
                  autoComplete="new-password"
                  onChange={onPasswordConfirmationChanged}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Log in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <GitHubLink sx={{ mt: 5 }} />
      </Grid>
    </Grid>
  )
}
