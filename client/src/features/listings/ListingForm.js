import React, { useState, useEffect } from "react"
import { ListingAvailability } from "./ListingAvailability"
import { useParams, useLocation, useRouteMatch, Redirect } from "react-router"
import Autocomplete from "@mui/material/Autocomplete"
import TextField from "@mui/material/TextField"
import Stack from "@mui/material/Stack"
import Box from "@mui/material/Box"
import Grid from "@mui/material/Grid"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import PeopleIcon from "@mui/icons-material/People"
import Avatar from "@mui/material/Avatar"
import { blue } from "@mui/material/colors"
import CssBaseline from "@mui/material/CssBaseline"
import Paper from "@mui/material/Paper"
import Select from "@mui/material/Select"
import MenuItem from "@mui/material/MenuItem"
import InputLabel from "@mui/material/InputLabel"
import FormControl from "@mui/material/FormControl"

export const ListingForm = ({ currentUser }) => {
  const location = useLocation()
  const { path } = useRouteMatch()
  const { listingId } = useParams()

  const [submittedListing, setSubmittedListing] = useState(null)

  const [formData, setFormData] = useState({
    listingType: "",
    title: "",
    description: "",
    topics: [],
    selectedDates: [],
  })

  useEffect(() => {
    if (location && location.state) {
      const { listing } = location.state
      setFormData({
        listingType: listing.listing.listing_type,
        title: listing.listing.title,
        description: listing.listing.description,
        topics: listing.topics.map((t) => t.id.toString()),
        selectedDates: listing.available_dates.map(
          (item) => new Date(item.available_date)
        ),
      })
    }
  }, [location])

  const handleOnChange = (e) =>
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })

  const handleCheckBoxChange = (event, values) => {
    const selectedTopics = values.map((value) => value.id.toString())
    setFormData({
      ...formData,
      topics: selectedTopics,
    })
  }

  const handleOnSubmit = (e) => {
    // This creates a new listing and immediately appends available dates
    e.preventDefault()
    const fetchListings = (method) => {
      fetch(
        method === "POST"
          ? "/api/v1/listings"
          : `/api/v1/listings/${listingId}`,
        {
          method: method,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            listing: {
              listing_type: formData.listingType,
              title: formData.title,
              description: formData.description,
              topic_ids: formData.topics,
              user_provider_id: currentUser.id,
            },
          }),
        }
      )
        .then((resp) => resp.json())
        .then((submittedListing) => {
          formData.selectedDates.forEach((selectedDate) => {
            fetch("/api/v1/available_dates", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                available_date: {
                  available_date: selectedDate,
                  listing_id: submittedListing.listing.id,
                },
              }),
            })
          })

          setSubmittedListing(submittedListing)
        })
    }
    path === "/listings/new" ? fetchListings("POST") : fetchListings("PATCH")
  }

  const [allTopicOptions, setAllTopicOptions] = useState([])
  useEffect(() => {
    fetch("/api/v1/topics")
      .then((resp) => resp.json())
      .then((topics) => {
        setAllTopicOptions(topics.topics)
      })
  }, [])

  const handleDefaultValues = (allTopicOptions) =>
    allTopicOptions.filter((topic) =>
      formData.topics.includes(topic.id.toString())
    )

  const renderTopics = () =>
    allTopicOptions && (
      <Stack spacing={3} sx={{ minWidth: 240 }}>
        <Autocomplete
          onChange={handleCheckBoxChange}
          value={handleDefaultValues(allTopicOptions)}
          multiple
          id="tags-standard"
          options={allTopicOptions}
          getOptionLabel={(option) => option.name}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="standard"
              label="Select Topics"
              placeholder="Topics"
            />
          )}
        />
      </Stack>
    )

  const tileClassNameToAvailable = ({ date, view }) => {
    if (view === "month") {
      if (
        formData.selectedDates.find(
          (dDate) => dDate.toString() === date.toString()
        )
      ) {
        return "available"
      }
    }
  }

  const handleOnClickDay = (value, event) => {
    if (
      formData.selectedDates.find(
        (date) => date.toString() === value.toString()
      )
    ) {
      setFormData({
        ...formData,
        selectedDates: formData.selectedDates.filter(
          (date) => date.toString() !== value.toString()
        ),
      })
    } else {
      setFormData({
        ...formData,
        selectedDates: [...formData.selectedDates, value],
      })
    }
  }

  if (submittedListing) {
    return (
      <Redirect
        push
        to={{ pathname: `/listings/${submittedListing.listing.id}` }}
      />
    )
  }

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <CssBaseline />
      <Grid
        item
        sx={{ mx: "auto" }}
        xs={12}
        sm={8}
        md={5}
        component={Paper}
        elevation={6}
        circle
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
            <PeopleIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {location.pathname === "/listings/new"
              ? "New Listing"
              : "Edit Listing"}
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleOnSubmit}
            sx={{ mt: 1, my: 5 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <FormControl sx={{ minWidth: 100 }}>
                  <InputLabel id="demo-simple-select-helper-label">
                    Type
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={formData.listingType}
                    label="Type"
                    onChange={handleOnChange}
                    name="listingType"
                  >
                    <MenuItem value={"Mate"}>Mate</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={8}>
                <TextField
                  sx={{ minWidth: 240 }}
                  name="title"
                  required
                  id="listing-title"
                  label="Title"
                  value={formData.title}
                  onChange={handleOnChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="description"
                  required
                  multiline
                  minRows={2}
                  fullWidth
                  id="listing-description"
                  label="Description"
                  value={formData.description}
                  onChange={handleOnChange}
                />
              </Grid>
              <Grid item xs={12}>
                {renderTopics()}
              </Grid>
              <Grid item xs={12}>
                <ListingAvailability
                  tileClassNameToAvailable={tileClassNameToAvailable}
                  handleOnClickDay={handleOnClickDay}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Submit
            </Button>
          </Box>
        </Box>
      </Grid>
    </Grid>
  )
}
