import React, { useState, useEffect } from "react"
import { useHistory } from "react-router"
import { formatNames } from "../../helper_functions"
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
import Input from "@mui/material/Input"
import IconButton from "@mui/material/IconButton"
import PhotoCamera from "@mui/icons-material/PhotoCamera"
import AdapterDateFns from "@mui/lab/AdapterDateFns"
import LocalizationProvider from "@mui/lab/LocalizationProvider"
import DatePicker from "@mui/lab/DatePicker"
import auLocale from "date-fns/locale/en-AU"
import Autocomplete from "@mui/material/Autocomplete"
import Stack from "@mui/material/Stack"
import { FormHelperText } from "@mui/material"

export const EditUserForm = ({
  currentUser,
  handleUserSubmittedImage,
  validationErrors,
  handleValidationErrors,
}) => {
  const history = useHistory()

  const [formData, setFormData] = useState({
    id: "",
    firstName: "",
    lastName: "",
    gender: "",
    dob: "",
    country: "",
    bio: "",
    username: "",
    email: "",
    topics: [],
    password: "",
    passwordConfirmation: "",
  })

  const [attachedImage, setAttachedImage] = useState(null)

  const [passwordChangeRequired, setPasswordChangeRequired] = useState(false)

  useEffect(() => {
    currentUser &&
      setFormData({
        id: currentUser.current_user.id,
        firstName: currentUser.current_user.first_name || "",
        lastName: currentUser.current_user.last_name || "",
        gender: currentUser.current_user.gender || "",
        dob:
          currentUser.current_user.dob &&
          new Date(currentUser.current_user.dob),
        country: currentUser.current_user.country_id || "",
        bio: currentUser.current_user.bio || "",
        username: currentUser.current_user.username,
        email: currentUser.current_user.email,
        topics: currentUser.user_topics.map((t) => t.id.toString()),
        password: "",
        passwordConfirmation: "",
      })
  }, [currentUser])

  const [bioCharaceters, setBioCharaceters] = useState(0)

  const handleOnChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })

    if (e.target.name === "bio") {
      setBioCharaceters(e.target.value.length)
    }
  }

  useEffect(
    () =>
      handleValidationErrors({
        ...validationErrors,
        users: false,
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }),
    [bioCharaceters]
  )

  const handleOnDobChange = (value) => {
    setFormData({
      ...formData,
      dob: new Date(value.setHours(0, 0, 0, 0)),
    })
  }

  const handleOnImageChange = (e) => {
    setAttachedImage(e.target.files[0])
  }

  const handleOnCheck = (e) => {
    setPasswordChangeRequired(e.target.checked)
  }

  const redirectToUserDetails = (userId) => history.push(`/users/${userId}`)

  const handleOnSubmit = (e) => {
    // PUTs the new user info through a FormData instance. The information can be send with or without new password
    e.preventDefault()

    const patchUserTopics = () =>
      fetch(`/api/v1/users/${formData.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: {
            topic_ids: formData.topics,
          },
        }),
      })

    // Images can only be sent to the server through a FormData instance
    const newUserInfo = new FormData()

    const appendUserInfoWithoutPassword = () => {
      newUserInfo.append("user[id]", formData.id)
      formData.firstName !== "" &&
        newUserInfo.append("user[first_name]", formatNames(formData.firstName))
      formData.lastName !== "" &&
        newUserInfo.append("user[last_name]", formatNames(formData.lastName))
      formData.gender !== "" &&
        newUserInfo.append("user[gender]", formData.gender)
      formData.country !== "" &&
        newUserInfo.append("user[country_id]", formData.country)
      formData.dob && newUserInfo.append("user[dob]", formData.dob)
      formData.bio !== "" && newUserInfo.append("user[bio]", formData.bio)
      formData.username !== "" &&
        newUserInfo.append("user[username]", formData.username.toLowerCase())
      formData.email !== "" && newUserInfo.append("user[email]", formData.email)
      attachedImage && newUserInfo.append("user[image]", attachedImage)
      return newUserInfo
    }
    const appendUserInfoWithPassword = () => {
      appendUserInfoWithoutPassword()
      newUserInfo.append("user[password]", formData.password)
      newUserInfo.append(
        "user[password_confirmation]",
        formData.passwordConfirmation
      )
      return newUserInfo
    }

    if (passwordChangeRequired) {
      fetch(`/api/v1/users/${formData.id}`, {
        method: "PUT",
        body: appendUserInfoWithPassword(),
      })
        .then((resp) => resp.json())
        .then((resp) => {
          if (resp?.errors_count) {
            handleValidationErrors({
              ...validationErrors,
              users: resp,
            })
          } else {
            patchUserTopics()
              .then(() => handleUserSubmittedImage(true))
              .then(() => redirectToUserDetails(formData.id))
          }
        })
    }
    if (!passwordChangeRequired) {
      fetch(`/api/v1/users/${formData.id}`, {
        method: "PUT",
        body: appendUserInfoWithoutPassword(),
      })
        .then((resp) => resp.json())
        .then((resp) => {
          if (resp?.errors_count) {
            handleValidationErrors({
              ...validationErrors,
              users: resp,
            })
          } else {
            patchUserTopics()
              .then(() => handleUserSubmittedImage(true))
              .then(() => redirectToUserDetails(formData.id))
          }
        })
    }
  }

  const handleTopicsChange = (event, values) => {
    const selectedTopics = values.map((value) => value.id.toString())
    setFormData({
      ...formData,
      topics: selectedTopics,
    })
  }

  const handleCountryChange = (event, value) => {
    const selectedCountry = value.id.toString()
    setFormData({
      ...formData,
      country: selectedCountry,
    })
  }

  const [allCountriesOptions, setAllCountriesOptions] = useState([])

  const [allTopicOptions, setAllTopicOptions] = useState([])
  useEffect(() => {
    fetch("/api/v1/topics")
      .then((resp) => resp.json())
      .then((topics) => {
        setAllTopicOptions(topics.topics)
      })

    fetch("/api/v1/countries")
      .then((resp) => resp.json())
      .then((countries) => {
        setAllCountriesOptions(countries.countries)
      })
  }, [])

  const handleCurrentTopicValues = (allTopicOptions) =>
    // Topics in state that matches all topic options, are automatically selected
    allTopicOptions.filter((topic) =>
      formData.topics.includes(topic.id.toString())
    )

  const handleCurrentCountryValue = (allCountriesOptions) =>
    allCountriesOptions.find(
      (country) => country.id.toString() === formData.country
    ) || null

  const renderTopics = () =>
    allTopicOptions && (
      <Stack spacing={3} sx={{ minWidth: 240 }}>
        <Autocomplete
          onChange={handleTopicsChange}
          value={handleCurrentTopicValues(allTopicOptions)}
          multiple
          id="tags-standard"
          options={allTopicOptions}
          getOptionLabel={(option) => option && option.name}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="standard"
              label="Topics you like"
              placeholder="Topics"
            />
          )}
        />
      </Stack>
    )

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
            Edit Profile
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleOnSubmit}
            sx={{ mt: 1, my: 5 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <label htmlFor="icon-button-file">
                  Profile picture
                  <IconButton
                    color="primary"
                    aria-label="upload picture"
                    component="span"
                  >
                    <PhotoCamera />
                  </IconButton>
                  <Input
                    accept="image/*"
                    id="icon-button-file"
                    type="file"
                    name="image"
                    onChange={handleOnImageChange}
                  />
                </label>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  error={!!validationErrors.users?.error_messages?.first_name}
                  helperText={
                    validationErrors.users.error_messages?.first_name &&
                    `First name ${validationErrors.users.error_messages.first_name[0]}`
                  }
                  sx={{ minWidth: "100%" }}
                  autoComplete="given-first-name"
                  name="firstName"
                  id="edit-user-first-name"
                  label="First Name"
                  value={formData.firstName}
                  onChange={handleOnChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  error={!!validationErrors.users?.error_messages?.last_name}
                  helperText={
                    validationErrors.users.error_messages?.last_name &&
                    `First name ${validationErrors.users.error_messages.last_name[0]}`
                  }
                  sx={{ minWidth: "100%" }}
                  autoComplete="given-last-name"
                  name="lastName"
                  id="edit-user-last-name"
                  label="Last name"
                  value={formData.lastName}
                  onChange={handleOnChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl
                  sx={{ minWidth: "80%" }}
                  error={formData.gender === ""}
                >
                  <InputLabel id="demo-simple-select-helper-label">
                    Gender
                  </InputLabel>
                  <Select
                    error={formData.gender === ""}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={formData.gender}
                    label="Gender"
                    onChange={handleOnChange}
                    name="gender"
                  >
                    <MenuItem value={"M"}>Male</MenuItem>
                    <MenuItem value={"F"}>Female</MenuItem>
                    <MenuItem value={"O"}>Other</MenuItem>
                  </Select>
                  {formData.gender === "" && (
                    <FormHelperText>Please select your gender</FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <LocalizationProvider
                  dateAdapter={AdapterDateFns}
                  locale={auLocale}
                >
                  <DatePicker
                    disableFuture
                    label="DOB dd/mm/yyyy"
                    openTo="year"
                    views={["year", "month", "day"]}
                    value={formData.dob}
                    maxDate={
                      new Date(
                        new Date().setFullYear(new Date().getFullYear() - 18)
                      )
                    }
                    onChange={handleOnDobChange}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12} sm={6}>
                {/* <InputLabel id="demo-simple-select-helper-label">Age</InputLabel> */}
                <Autocomplete
                  disablePortal
                  id="country-of-location"
                  options={allCountriesOptions}
                  value={handleCurrentCountryValue(allCountriesOptions)}
                  onChange={handleCountryChange}
                  getOptionLabel={(option) => option.name}
                  renderInput={(params) => (
                    <TextField {...params} label="Country" />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={!!validationErrors.users?.error_messages?.bio}
                  helperText={
                    (validationErrors.users.error_messages?.bio &&
                      `Bio ${validationErrors.users.error_messages.bio[0]}`) ||
                    (bioCharaceters > 0 &&
                      `Characeters count: ${bioCharaceters}`)
                  }
                  name="bio"
                  multiline
                  minRows={3}
                  fullWidth
                  id="edit-user-bio"
                  label="Bio (must be between 100 - 2000 characters)"
                  value={formData.bio}
                  onChange={handleOnChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  error={!!validationErrors.users?.error_messages?.username}
                  helperText={
                    validationErrors.users.error_messages?.username &&
                    `Username ${validationErrors.users.error_messages.username[0]}`
                  }
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
                  error={!!validationErrors.users?.error_messages?.email}
                  helperText={
                    validationErrors.users.error_messages?.email
                      ? `Email ${validationErrors.users.error_messages.email[0]}`
                      : false
                  }
                  required
                  fullWidth
                  id="edit-user-email"
                  label="Email Address"
                  name="email"
                  value={formData.email}
                  onChange={handleOnChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                {renderTopics()}
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
                      error={!!validationErrors.users?.error_messages?.password}
                      helperText={
                        validationErrors.users.error_messages?.password &&
                        `Password ${validationErrors.users.error_messages.password[0]}`
                      }
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
                      error={!!validationErrors.users?.error_messages?.password}
                      helperText={
                        validationErrors.users.error_messages?.password &&
                        `Password ${validationErrors.users.error_messages.password[0]}`
                      }
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
