import React, { useState, useEffect } from "react"
import CssBaseline from "@mui/material/CssBaseline"
import Grid from "@mui/material/Grid"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Container from "@mui/material/Container"
import Link from "@mui/material/Link"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import { User } from "./User"
import Pagination from "@mui/material/Pagination"

export const Users = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    fetch("/api/v1/users")
      .then((resp) => resp.json())
      .then((resp) => setUsers(resp.users))
  }, [])

  const [page, setPage] = useState(1)
  const handleOnPageChange = (event, page) => setPage(page)

  const renderUsersOnPage = (page = 1) =>
    users
      .slice(page * 8 - 8, page * 8)
      .map((user) => <User key={user.id} user={user} />)

  function Copyright(props) {
    return (
      <Typography
        variant="body2"
        color="text.secondary"
        align="center"
        {...props}
      >
        {"Copyright © "}
        <Link color="inherit" href="https://github.com/CodeHunt101">
          My GitHub profile
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    )
  }

  const theme = createTheme()

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: "background.paper",
            pt: 8,
            pb: 6,
          }}
        >
          <Typography
            component="h2"
            variant="h4"
            align="center"
            color="text.primary"
            gutterBottom
          >
            Users
          </Typography>
        </Box>
        {users && (
          <Container
            sx={{ display: "flex", justifyContent: "center" }}
            maxWidth="md"
          >
            <Pagination
              count={Math.ceil(users.length / 8)}
              page={page}
              onChange={handleOnPageChange}
              variant="outlined"
              color="primary"
            />
          </Container>
        )}
        <Container sx={{ py: 5 }} maxWidth="lg">
          {/* End hero unit */}
          <Grid
            container
            sx={{ display: "flex", justifyContent: "center" }}
            spacing={4}
          >
            {renderUsersOnPage(page)}
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      <Box sx={{ bgcolor: "background.paper", p: 6 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          Some footer!
        </Typography>
        <Copyright />
      </Box>
      {/* End footer */}
    </ThemeProvider>
  )
}
