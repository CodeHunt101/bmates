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
import Paper from "@mui/material/Paper"

export const ListingsList = ({ currentUser }) => {
  const [listings, setListings] = useState(null)
  const { path } = useRouteMatch()
  const { userId, listingId } = useParams()

  useEffect(() => {
    // Depending on the current path, the listings state with fetch the date from a different server path
    path === "/listings" &&
      fetch("/api/v1/listings")
        .then((resp) => resp.json())
        .then((resp) =>
          setListings(
            resp.listings.filter((listing) => listing.listing.is_active)
          )
        )

    path === "/my-listings" &&
      fetch(`/api/v1/current_user`)
        .then((resp) => resp.json())
        .then((resp) =>
          setListings(
            resp.listings.filter((listing) => listing.listing.is_active)
          )
        )

    path === "/users/:userId/listings" &&
      fetch(`/api/v1/users/${userId}`)
        .then((resp) => resp.json())
        .then((resp) =>
          setListings(
            resp.listings.filter((listing) => listing.listing.is_active)
          )
        )
  }, [currentUser, listingId, path, userId])

  const [page, setPage] = useState(1)
  const handleOnPageChange = (event, page) => setPage(page)

  const renderListingsOnPage = (page = 1) => {
    if (listings && listings.length>0) {
      return listings
        .slice(page * 8 - 8, page * 8)
        .map((listing) => (
          <ListingPreview key={listing.listing.id} listing={listing} />
        ))
    } else {
      return <Typography
        variant="h6"
        align="center"
      >
        There are no listings to show!
      </Typography>
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
      <Grid
        item
        sx={{ mx: "auto", minHeight: "75vh" }}
        xs={12}
        sm={8}
        md={10.1}
        component={Paper}
        elevation={6}
        circle="true"
      >
        {/* Hero unit */}
        <Box
          sx={{
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
        {listings && listings.length > 0 && (
          <Container
            sx={{ display: "flex", justifyContent: "center" }}
            maxWidth="md"
          >
            <Pagination
              count={Math.ceil(listings.length / 8)}
              page={page}
              onChange={handleOnPageChange}
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
      </Grid>
      {/* Footer */}
      <Box
        sx={{ bgcolor: "background.paper", margin: 1, p: 2 }}
        component="footer"
      >
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
