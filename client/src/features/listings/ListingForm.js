import React, { useState, useEffect } from "react"
import { ListingAvailability } from "./ListingAvailability"
import { Footer } from "../../components/Footer"
import { useParams, useLocation, useRouteMatch, Redirect } from "react-router"
import { blue } from "@mui/material/colors"
import {
  Input,
  Autocomplete,
  TextField,
  Stack,
  Box,
  Grid,
  Button,
  Typography,
  Avatar,
  Paper,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  IconButton,
} from "@mui/material"
import {
  People as PeopleIcon,
  PhotoCamera as PhotoCameraIcon,
} from "@mui/icons-material"

export const ListingForm = ({
  currentUser,
  validationErrors,
  handleValidationErrors,
}) => {
  const location = useLocation()
  const { path } = useRouteMatch()
  const { listingId } = useParams()

  const [submittedListing, setSubmittedListing] = useState(null)
  const [areAvailableDatesSubmitted, setAreAvailableDatesSubmitted] =
    useState(false)

  const [formData, setFormData] = useState({
    listingType: "",
    title: "",
    description: "",
    topics: [],
    selectedDates: [],
  })
  const [attachedImage, setAttachedImage] = useState(null)

  useEffect(() => {
    if (listingId) {
      fetch(`/api/v1/listings/${listingId}`)
        .then((resp) => resp.json())
        .then((resp) => {
          const listing = resp.listing
          setFormData({
            listingType: listing.listing.listing_type,
            title: listing.listing.title,
            description: listing.listing.description,
            topics: listing.topics.map((t) => t.id.toString()),
            selectedDates: listing.available_dates.map(
              (item) => new Date(item.available_date)
            ),
          })
        })
    } else {
      setFormData({
        listingType: "",
        title: "",
        description: "",
        topics: [],
        selectedDates: [],
      })
    }
  }, [location, listingId])

  const [descriptionCharaceters, setDescriptionCharaceters] = useState(0)

  const handleOnChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
    if (e.target.name === "description") {
      setDescriptionCharaceters(e.target.value.length)
    }

    if (validationErrors.listings) {
      handleValidationErrors({
        ...validationErrors,
        listings: false,
      })
    }
  }

  const handleOnImageChange = (e) => {
    setAttachedImage(e.target.files[0])
  }

  const handleAutoCompleteChange = (event, values) => {
    const selectedTopics = values.map((value) => value.id.toString())
    setFormData({
      ...formData,
      topics: selectedTopics,
    })
  }

  const handleOnSubmit = (e) => {
    // This creates a new listing and immediately appends available dates
    e.preventDefault()

    const newListingInfo = new FormData()

    const appendListingInfo = () => {
      newListingInfo.append("listing[image]", attachedImage)
      return newListingInfo
    }

    const fetchListingWithImageAndDate = (method) => {
      // POSTs or PATCHes form without iterables (available dates)
      const selectedDates = formData.selectedDates.filter(
        (selectedDate) => selectedDate > new Date()
      )
      // If user has selected at least one day (in the future) and one topic, it'll attempt to fetch everything.
      if (selectedDates.length > 0 && formData.topics.length > 0) {
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
                user_provider_id: currentUser.current_user.id,
              },
            }),
          }
        )
          .then((resp) => resp.json())
          .then((resp) => {
            // If server doesn't validates, correctly, it'll render the errors from state, otherwise it'll proceed to fetch dates and image
            if (resp?.errors_count) {
              handleValidationErrors({
                ...validationErrors,
                listings: resp,
              })
            } else {
              // POSTs iterables
              const promises = formData.selectedDates.map((selectedDate) => {
                return fetch("/api/v1/available_dates", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    available_date: {
                      available_date: selectedDate,
                      listing_id: resp.listing.id,
                    },
                  }),
                })
              })
              Promise.all(promises).then(() => {
                setSubmittedListing(resp)
                // PATCHes image (if any)
                const promise =
                  attachedImage &&
                  fetch(`/api/v1/listings/${resp.listing.id}/update_image`, {
                    method: "PATCH",
                    body: appendListingInfo(),
                  })
                Promise.resolve(promise).then(() =>
                  setAreAvailableDatesSubmitted(true)
                )
              })
            }
          })
      } else {
        handleValidationErrors({
          ...validationErrors,
          listings: {
            calendar: {
              error_message:
                selectedDates.length === 0 &&
                "You haven't selected any available date. Select at least one.",
            },
            topics: {
              error_message:
                formData.topics.length === 0 &&
                "You haven't selected any topics. Select at least one.",
            },
          },
        })
      }
    }

    path === "/listings/new"
      ? fetchListingWithImageAndDate("POST")
      : fetchListingWithImageAndDate("PATCH")
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
    // Topics in state that matches all topic options, are automatically selected
    allTopicOptions.filter((topic) =>
      formData.topics.includes(topic.id.toString())
    )

  const renderTopics = () =>
    allTopicOptions && (
      <Stack spacing={3} sx={{ minWidth: 240 }}>
        <Autocomplete
          onChange={handleAutoCompleteChange}
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
        {validationErrors.listings.topics?.error_message && (
          <Typography
            component="small"
            variant="caption"
            color="error"
            sx={{ display: "inherit", textAlign: "center" }}
          >
            {validationErrors.listings.topics?.error_message}
          </Typography>
        )}
      </Stack>
    )

  const tileClassNameToAvailable = ({ date, view }) => {
    // Looks up through the selected dates. If they match with a calendar date, the className of the day tile is set to available.
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
    // If new selectedDate is already on the selectedDates state, it's removed from the state, otherwise it's appended.
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

  if (submittedListing && areAvailableDatesSubmitted) {
    return (
      <Redirect
        push
        to={{ pathname: `/listings/${submittedListing.listing.id}` }}
      />
    )
  }

  //Redirect to Home if user wants to edit a listing and Listing doesn't belong to user
  if (
    path === "/listings/:listingId/edit" &&
    currentUser &&
    !currentUser.listings
      .map((listing) => listing.listing.id.toString())
      .includes(listingId)
  ) {
    return <Redirect push to={{ pathname: "/" }} />
  }

  return (
    (path === "/listings/new" ||
      (currentUser &&
        currentUser.listings
          .map((listing) => listing.listing.id.toString())
          .includes(listingId))) && (
      <Grid container component="main" sx={{ height: "100vh" }}>
        <Grid
          item
          sx={{ mx: "auto" }}
          xs={12}
          sm={8}
          md={5}
          component={Paper}
          elevation={6}
          circle="true"
          id="new-listing-paper"
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
                    error={!!validationErrors.listings?.error_messages?.title}
                    helperText={
                      validationErrors.listings.error_messages?.title &&
                      `Title ${validationErrors.listings.error_messages.title[0]}`
                    }
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
                    error={
                      !!validationErrors.listings?.error_messages?.description
                    }
                    helperText={
                      (validationErrors.listings.error_messages?.description &&
                        `Description ${validationErrors.listings.error_messages.description[0]}`) ||
                      (descriptionCharaceters > 0 &&
                        `Characeters count: ${descriptionCharaceters}`)
                    }
                    name="description"
                    required
                    multiline
                    minRows={2}
                    fullWidth
                    id="listing-description"
                    label="Description (must be between 100 - 2000 characters)"
                    value={formData.description}
                    onChange={handleOnChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <label htmlFor="icon-button-file">
                    Listing picture
                    <IconButton
                      color="primary"
                      aria-label="upload picture"
                      component="span"
                    >
                      <PhotoCameraIcon />
                    </IconButton>
                    <Input
                      accept="image/*"
                      id="icon-button-file"
                      type="file"
                      name="image"
                      multiple
                      onChange={handleOnImageChange}
                    />
                  </label>
                </Grid>
                <Grid item xs={12}>
                  {renderTopics()}
                </Grid>
                <Grid item xs={12}>
                  <ListingAvailability
                    tileClassNameToAvailable={tileClassNameToAvailable}
                    handleOnClickDay={handleOnClickDay}
                  />
                  {validationErrors.listings.calendar?.error_message && (
                    <Typography
                      component="small"
                      variant="caption"
                      color="error"
                      sx={{ display: "inherit", textAlign: "center" }}
                    >
                      {validationErrors.listings.calendar?.error_message}
                    </Typography>
                  )}
                </Grid>
              </Grid>
              <Button
                type="submit"
                variant="contained"
                sx={{
                  width: "fit-content",
                  mt: 2,
                  display: "block",
                  ml: "auto",
                  mr: "auto",
                }}
              >
                Submit
              </Button>
              {validationErrors.listings?.errors_count && (
                <Typography
                  component="p"
                  variant="body2"
                  color="error"
                  sx={{ display: "inherit", textAlign: "center" }}
                >
                  {`We have found ${
                    validationErrors.listings.errors_count === 1
                      ? `${validationErrors.listings.errors_count} error`
                      : `${validationErrors.listings.errors_count} erros`
                  }.`}{" "}
                  Please review your responses.
                </Typography>
              )}
            </Box>
          </Box>
        </Grid>
        <Footer />
      </Grid>
    )
  )
}
