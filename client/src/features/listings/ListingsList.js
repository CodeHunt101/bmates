import React, { useState, useEffect } from "react"
import { ListingPreview } from "./ListingPreview"
import { useParams, useRouteMatch } from "react-router"
import CssBaseline from "@mui/material/CssBaseline"
import Grid from "@mui/material/Grid"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Container from "@mui/material/Container"
import Link from "@mui/material/Link"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import Pagination from "@mui/material/Pagination"

export const ListingsList = ({ currentUser }) => {
  const [listings, setListings] = useState(null)
  const { path } = useRouteMatch()
  const { userId, listingId } = useParams()

  useEffect(() => {
    path === "/listings" &&
      fetch("/api/v1/listings")
        .then((resp) => resp.json())
        .then((resp) => setListings(resp.listings))

    path === "/my-listings" &&
      fetch(`/api/v1/current_user`)
        .then((resp) => resp.json())
        .then((resp) => setListings(resp.listings))

    path === "/users/:userId/listings" &&
      fetch(`/api/v1/users/${userId}`)
        .then((resp) => resp.json())
        .then((resp) => setListings(resp.listings))
  }, [currentUser, listingId, path, userId])

  const [page, setPage] = useState(1)
  const handleOnPageChange = (event, page) => setPage(page)

  const renderListingsOnPage = (page = 1) => {
    if (listings) {
      return listings
        .slice(page * 8 - 8, page * 8)
        .map((listing) => (
          <ListingPreview key={listing.listing.id} listing={listing} />
        ))
    }
  }

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
            Listings
          </Typography>
        </Box>
        {listings && (
          <Container
            sx={{ display: "flex", justifyContent: "center" }}
            maxWidth="md"
          >
            <Pagination
              count={Math.ceil(listings.length / 8)}
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
            {renderListingsOnPage(page)}
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
