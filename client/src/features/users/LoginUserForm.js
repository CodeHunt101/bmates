import React, { useState } from "react"
import { Footer } from "../../components/Footer"
import {
  Avatar,
  Button,
  TextField,
  Link,
  Grid,
  Box,
  Typography,
  Paper,
} from "@mui/material"
import LoginIcon from "@mui/icons-material/Login"
import { blue } from "@mui/material/colors"

export const LoginUserForm = ({
  fetchCurrentUser,
  validationErrors,
  handleValidationErrors,
}) => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const onUsernameChanged = (e) => setUsername(e.target.value)
  const onPasswordChanged = (e) => setPassword(e.target.value)

  const handleOnSubmit = (e) => {
    // Logs the user in
    e.preventDefault()

    fetch("/api/v1/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    })
      .then((resp) => resp.json())
      .then((resp) => {
        if (resp?.error_message) {
          handleValidationErrors({
            ...validationErrors,
            session: resp,
          })
        } else {
          handleValidationErrors({
            ...validationErrors,
            session: false,
          })
          fetchCurrentUser()
        }
      })
  }

  const renderErrorMessage = () =>
    validationErrors.session && (
      <Typography
        component="small"
        variant="caption"
        color="error"
        sx={{ width: "fit-content", textAlign: "center" }}
      >
        {validationErrors.session.error_message}
      </Typography>
    )

  return (
    <>
      <Grid container component="main" sx={{ height: "100vh", width: "100vw" }}>
        <Grid
          item
          xs={12}
          sm={8}
          md={5}
          component={Paper}
          elevation={6}
          square
          className="login-signup"
        >
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
              <LoginIcon />
            </Avatar>
            <Typography
              component="h1"
              variant="h5"
              color="white"
              sx={{
                backgroundColor: "#1976d2",
                width: "fit-content",
                margin: "auto",
                borderRadius: "10px",
                p: 1,
              }}
            >
              Log In
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
                    autoComplete="given-name"
                    name="userName"
                    required
                    fullWidth
                    id="login-userName"
                    label="Username"
                    autoFocus
                    onChange={onUsernameChanged}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="login-password"
                    autoComplete="new-password"
                    onChange={onPasswordChanged}
                  />
                </Grid>
              </Grid>
              {renderErrorMessage()}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Log In
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="/signup" variant="body2">
                    Not an account yet? Sign up
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
        <Grid
          item
          id="login-image"
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      </Grid>
      <Footer />
    </>
  )
}
