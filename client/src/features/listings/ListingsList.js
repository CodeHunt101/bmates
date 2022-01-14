import React, { useState, useEffect } from "react"
import { ListingPreview } from "./ListingPreview"
import { useParams, useRouteMatch, useLocation } from "react-router"
import CssBaseline from "@mui/material/CssBaseline"
import Grid from "@mui/material/Grid"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Container from "@mui/material/Container"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import Pagination from "@mui/material/Pagination"
import Paper from "@mui/material/Paper"
import { LinearProgress } from "@mui/material"

export const ListingsList = () => {
  const { path } = useRouteMatch()
  const { userId, listingId } = useParams()
  const location = useLocation()

  const [listings, setListings] = useState([])

  const generateListingFromResponse = (response) => {
    if (response.listings.length > 0) {
      setListings(
        response.listings.filter((listing) => listing.listing.is_active)
      )
    }
    if (response.listings.length === 0) {
      setListings("N/A")
    }
  }

  useEffect(() => {
    // If there is a location state, render the repsective listings
    if (
      location.state?.filteredListings !== "Not found" &&
      location.state?.filteredListings.length > 0
    ) {
      setListings(
        location.state.filteredListings.filter(
          (listing) => listing.listing.is_active
        )
      )
    }
    // Depending on the current path, the listings state with fetch the date from a different server path
    // Fetch only if there is no location state, or user couldn't find anything from the search
    if (
      !location.state ||
      location.state?.filteredListings === "Not found" ||
      location.state?.filteredListings.length === 0
    ) {
      path === "/listings" &&
        fetch("/api/v1/listings")
          .then((resp) => resp.json())
          .then((resp) => {
            generateListingFromResponse(resp)
          })

      path === "/my-listings" &&
        fetch(`/api/v1/current_user`)
          .then((resp) => resp.json())
          .then((resp) => generateListingFromResponse(resp))

      path.includes("/users/:userId") &&
        fetch(`/api/v1/users/${userId}`)
          .then((resp) => resp.json())
          .then((resp) => generateListingFromResponse(resp))
    }
  }, [listingId, path, userId, location.state])

  const renderNoMatchesMessage = () =>
    location.state?.filteredListings === "Not found" && (
      <Typography
        component="h2"
        variant="subtitle1"
        align="center"
        color="error"
        gutterBottom
      >
        Sorry, we couldn't find listings that match your search criteria, but
        there you have all listings:
      </Typography>
    )

  const [page, setPage] = useState(1)

  const handleOnPageChange = (event, page) => setPage(page)

  const renderListingsOnPage = (page = 1) => {
    if (typeof listings === "string") {
      return (
        <Typography variant="h6" align="center">
          There are no listings to show!
        </Typography>
      )
    } else if (listings.length === 0) {
      return (
        <Box sx={{ width: "50%" }}>
          <LinearProgress />
        </Box>
      )
    } else {
      return listings
        .slice(page * 8 - 8, page * 8)
        .map((listing) => (
          <ListingPreview key={listing.listing.id} listing={listing} />
        ))
    }
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
        elevation={path !== "/users/:userId" ? 6 : 3}
        circle="true"
      >
        {/* Hero unit */}
        <Box
          sx={{
            pt: path !== "/users/:userId" ? 8 : 1,
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
            {path !== "/users/:userId" && "Listings"}
          </Typography>
          {renderNoMatchesMessage()}
        </Box>
        {listings.length > 0 && (
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
    </ThemeProvider>
  )
}
