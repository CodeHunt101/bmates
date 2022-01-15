import React, { useState, useEffect } from "react"
import { ListingPreview } from "./ListingPreview"
import { SortAndFilterListings } from "../customSearch/SortAndFilterListings"
import { useParams, useRouteMatch, useLocation} from "react-router"
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

  const [filterMessage, setFilterMessage] = useState("")

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

  // SortAndFilterListings states & handlers
  const [allTopicOptions, setAllTopicOptions] = useState([])
  const [topics, setTopics] = useState([])

  useEffect(() => {
    // If there is a location state, render the repsective listings
    if (
      location.state?.filteredListings !== "Not found" &&
      location.state?.filteredListings.length > 0
    ) {
      setFilterMessage("success")
      setTopics([])
      setListings(
        location.state.filteredListings.filter(
          (listing) => listing.listing.is_active
        )
      )
    }
    // Depending on the current path, the listings state with fetch the date from a different server path
    // Fetch only if there is no location state, or user couldn't find anything from the search
    if (location.state?.filteredListings === "Not found") {
      setFilterMessage("error")
    }

    if (
      !location.state ||
      location.state?.filteredListings === "Not found" ||
      location.state?.filteredListings.length === 0
    ) {
      setTopics([])
      fetchListings()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listingId, path, userId, location.state])

  useEffect(() => {
    fetch("/api/v1/topics")
      .then((resp) => resp.json())
      .then((topics) => {
        setAllTopicOptions(topics.topics)
      })
  }, [])

  const generateListingsFromResponse = (response) => {
    if (response.listings.length > 0) {
      const activeListings = response.listings.filter(
        (listing) => listing.listing.is_active
      )
      const sortedListings = sortListings(
        activeListings,
        sortParameters.method,
        sortParameters.order
      )
      setListings(sortedListings)
      topics.length > 0 && filterListings(sortedListings)
    }
    if (response.listings.length === 0) {
      setListings("N/A")
    }
  }

  const fetchListings = () => {
    path === "/listings" &&
      fetch("/api/v1/listings")
        .then((resp) => resp.json())
        .then((resp) => {
          generateListingsFromResponse(resp)
        })

    path === "/my-listings" &&
      fetch(`/api/v1/current_user`)
        .then((resp) => resp.json())
        .then((resp) => {
          generateListingsFromResponse(resp)
        })

    path.includes("/users/:userId") &&
      fetch(`/api/v1/users/${userId}`)
        .then((resp) => resp.json())
        .then((resp) => {
          generateListingsFromResponse(resp)
        })
  }

  const handleTopicsChange = (event, values) => {
    setTopics(values)
  }

  const [sortParameters, setSortParameters] = useState({
    method: "modified",
    order: "descending",
  })

  const handleSortParametersChange = (e) => {
    setSortParameters({
      ...sortParameters,
      [e.target.name]: e.target.value,
    })
  }

  const sortListings = (listingsResponse, method, order) => {
    const methodAttribute = {
      created: "created_at",
      modified: "updated_at",
      rating: "listing_average_rating",
    }[method]

    if (["created", "modified"].includes(method)) {
      return listingsResponse.sort((a, b) => {
        const dateA = new Date(a.listing[methodAttribute])
        const dateB = new Date(b.listing[methodAttribute])
        return order === "descending" ? dateB - dateA : dateA - dateB
      })
    }

    if (["rating"].includes(method)) {
      return listingsResponse.sort((a, b) => {
        const ratingA = a[methodAttribute]
        const ratingB = b[methodAttribute]
        return order === "descending" ? ratingB - ratingA : ratingA - ratingB
      })
    }
  }

  const filterListings = (listings) => {
    const filteredListings = listings.filter((listing) => {
      return !topics
        .map((topic) =>
          listing.topics.map((topic) => topic.id).includes(topic.id)
        )
        .includes(false)
    })

    if (filteredListings.length === 0) {
      setListings(listings)
      setFilterMessage("error")
    } else {
      setListings(filteredListings)
      setFilterMessage("success")
    }
  }

  const handleOnSubmit = (e) => {
    e.preventDefault()
    fetchListings()
    filterListings(listings)
    setTopics([])
  }

  const renderFilterMessage = () => {
    if (filterMessage === "error") {
      return (
        <Typography
          component="h2"
          variant="subtitle1"
          align="center"
          color="error"
          gutterBottom
        >
          <b>
            Sorry, we couldn't find listings that match your search criteria,
            but there you have all mates:
          </b>
        </Typography>
      )
    }
    if (filterMessage === "success") {
      return (
        <Typography
          component="h2"
          variant="subtitle1"
          align="center"
          color="#2e7d32"
          gutterBottom
        >
          <b>
            We found the following listings that satisfy your search criteria:
          </b>
        </Typography>
      )
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
          <SortAndFilterListings
            allTopicOptions={allTopicOptions}
            // handleTopicValues={handleTopicValues}
            topics={topics}
            handleTopicsChange={handleTopicsChange}
            handleOnSubmit={handleOnSubmit}
            handleSortParametersChange={handleSortParametersChange}
            sortParameters={sortParameters}
          />
          {/* {renderNoMatchesMessage()} */}
          {renderFilterMessage()}
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
