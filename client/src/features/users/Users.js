import React, { useState, useEffect } from "react"
import { User } from "./User"
import { SortAndFilterUsers } from "./SortAndFilterUsers"
import CssBaseline from "@mui/material/CssBaseline"
import Grid from "@mui/material/Grid"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Container from "@mui/material/Container"
import Link from "@mui/material/Link"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import Pagination from "@mui/material/Pagination"
import Paper from "@mui/material/Paper"
import { calculateAge } from "../../helper_functions"

const minDistance = 5

export const Users = () => {
  const [users, setUsers] = useState([])

  const fetchCountries = () => {
    fetch("/api/v1/countries")
      .then((resp) => resp.json())
      .then((countries) => {
        setAllCountriesOptions(countries.countries)
      })
  }

  const [page, setPage] = useState(1)
  const handleOnPageChange = (event, page) => setPage(page)

  const renderUsersOnPage = (page = 1) =>
    users.slice(page * 8 - 8, page * 8).map((user, idx) => (
      <Grid key={idx} item xs={12} sm={6} md={3}>
        <User key={user.user_info.id} user={user} />
      </Grid>
    ))

  // States & handlers for SortAndFilterUsers
  const [ageRange, setAgeRange] = useState([18, 130])

  const handleAgeChange = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return
    }

    if (activeThumb === 0) {
      setAgeRange([
        Math.min(newValue[0], ageRange[1] - minDistance),
        ageRange[1],
      ])
    } else {
      setAgeRange([
        ageRange[0],
        Math.max(newValue[1], ageRange[0] + minDistance),
      ])
    }
  }

  const [genders, setGenders] = useState({
    male: false,
    female: false,
    other: false,
  })

  const handleGendersCheck = (event, value) => {
    setGenders({
      ...genders,
      [event.target.name]: value,
    })
  }

  const [country, setCountry] = useState("")

  const handleCountryChange = (event, value) => {
    const selectedCountry = value?.id.toString() || ""
    setCountry(selectedCountry)
  }

  const [allCountriesOptions, setAllCountriesOptions] = useState([])

  useEffect(() => {
    fetchCountries()
  }, [])

  useEffect(() => {
    if (allCountriesOptions.length > 0) {
      fetch("/api/v1/users")
        .then((resp) => resp.json())
        .then((resp) => {
          const filteredByGender = resp.users.filter((user) => {
            return (
              (genders.female && user.user_info.gender === "F") ||
              (genders.male && user.user_info.gender === "M") ||
              (genders.other && user.user_info.gender === "O")
            )
          })
          const filteredByCountry = resp.users.filter((user) => {
            return country === "" ? user : country === user.user_info.country_id
          })

          const filteredByAgeRange = resp.users.filter((user) => {
            return (
              calculateAge(new Date(user.user_info.dob)) >= ageRange[0] &&
              calculateAge(new Date(user.user_info.dob)) <= ageRange[1]
            )
          })

          const filteredUsers = () => {
            if (filteredByGender.length === 0) {
              return resp.users
                .filter((user) => filteredByCountry.includes(user))
                .filter((user) => filteredByAgeRange.includes(user))
            } else {
              return filteredByGender
                .filter((user) => filteredByCountry.includes(user))
                .filter((user) => filteredByAgeRange.includes(user))
            }
          }

          filteredUsers().length === 0
            ? setUsers(resp.users)
            : setUsers(filteredUsers)
        })
    }
  }, [genders, country, allCountriesOptions, ageRange])

  const handleCurrentCountryValue = (allCountriesOptions) =>
    allCountriesOptions.find(
      (countryOption) => countryOption.id.toString() === country
    ) || null

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
        elevation={2}
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
            Users
          </Typography>
        </Box>
        <SortAndFilterUsers
          handleCurrentCountryValue={handleCurrentCountryValue}
          handleCountryChange={handleCountryChange}
          allCountriesOptions={allCountriesOptions}
          handleAgeChange={handleAgeChange}
          ageRange={ageRange}
          handleGendersCheck={handleGendersCheck}
        />
        {users && (
          <Container
            sx={{ display: "flex", justifyContent: "center" }}
            maxWidth="md"
          >
            <Pagination
              count={Math.ceil(users.length / 8)}
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
            {renderUsersOnPage(page)}
          </Grid>
        </Container>
      </Grid>
      {/* Footer */}
      <Box sx={{ p: 6 }} component="footer">
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
