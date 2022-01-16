import React, { useState, useEffect } from "react"
import { User } from "./User"
import { SortAndFilterUsers } from "../customSearch/SortAndFilterUsers"
import Grid from "@mui/material/Grid"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Container from "@mui/material/Container"
import Link from "@mui/material/Link"
import Pagination from "@mui/material/Pagination"
import Paper from "@mui/material/Paper"
import { calculateAge } from "../../helper_functions"

const minDistance = 5

export const Users = () => {
  const [users, setUsers] = useState([])

  // Pagination state and handlers
  const [page, setPage] = useState(1)
  const handleOnPageChange = (event, page) => setPage(page)

  const renderUsersOnPage = (page = 1) =>
    users.slice(page * 8 - 8, page * 8).map((user, idx) => (
      <Grid key={idx} item xs={12} sm={6} md={3}>
        <User key={user.user_info.id} user={user} />
      </Grid>
    ))

  //Countries state & handlers
  const [country, setCountry] = useState("")

  const handleCountryChange = (event, value) => {
    const selectedCountry = value?.id.toString() || ""
    setCountry(selectedCountry)
  }

  const [allCountriesOptions, setAllCountriesOptions] = useState([])

  const fetchCountries = () => {
    fetch("/api/v1/countries")
      .then((resp) => resp.json())
      .then((countries) => {
        setAllCountriesOptions(countries.countries)
      })
  }

  useEffect(() => {
    fetchCountries()
  }, [])

  const handleCurrentCountryValue = (allCountriesOptions) =>
    allCountriesOptions.find(
      (countryOption) => countryOption.id.toString() === country
    ) || null

  // SortAndFilterUsers states & handlers
  const [sortParameters, setSortParameters] = useState({
    method: "modified",
    order: "descending",
  })

  const fetchUsers = () => {
    fetch("/api/v1/users")
      .then((resp) => resp.json())
      .then((resp) => {
        const sortedUsers = sortUsers(
          resp.users,
          sortParameters.method,
          sortParameters.order
        )
        setUsers(sortedUsers)
      })
  }

  useEffect(() => {
    fetchUsers()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSortParametersChange = (e) => {
    setSortParameters({
      ...sortParameters,
      [e.target.name]: e.target.value,
    })
  }

  const sortUsers = (usersResponse, method, order) => {
    const methodAttribute = {
      created: "created_at",
      modified: "updated_at",
      rating: "user_average_rating",
    }[method]

    if (["created", "modified"].includes(method)) {
      return usersResponse.sort((a, b) => {
        const dateA = new Date(a.user_info[methodAttribute])
        const dateB = new Date(b.user_info[methodAttribute])
        return order === "descending" ? dateB - dateA : dateA - dateB
      })
    }

    if (["rating"].includes(method)) {
      return usersResponse.sort((a, b) => {
        const ratingA = a[methodAttribute]
        const ratingB = b[methodAttribute]
        return order === "descending" ? ratingB - ratingA : ratingA - ratingB
      })
    }
  }

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

  const [filterMessage, setFilterMessage] = useState("")

  const filterUsers = (usersResponse) => {
    const filteredByGender = usersResponse.filter((user) => {
      return (
        (genders.female && user.user_info.gender === "F") ||
        (genders.male && user.user_info.gender === "M") ||
        (genders.other && user.user_info.gender === "O")
      )
    })
    const filteredByCountry = usersResponse.filter((user) => {
      return country === "" ? user : country === user.user_info.country_id
    })

    const filteredByAgeRange = usersResponse.filter((user) => {
      return (
        calculateAge(new Date(user.user_info.dob)) >= ageRange[0] &&
        calculateAge(new Date(user.user_info.dob)) <= ageRange[1]
      )
    })

    const filteredUsers = () => {
      if (filteredByGender.length === 0) {
        return usersResponse
          .filter((user) => filteredByCountry.includes(user))
          .filter((user) => filteredByAgeRange.includes(user))
      } else {
        return filteredByGender
          .filter((user) => filteredByCountry.includes(user))
          .filter((user) => filteredByAgeRange.includes(user))
      }
    }

    if (filteredUsers().length === 0) {
      setUsers(usersResponse)
      setFilterMessage("error")
    } else {
      setUsers(filteredUsers)
      setFilterMessage("success")
    }
  }

  const handleOnSubmit = (e) => {
    e.preventDefault()
    fetch("/api/v1/users")
      .then((resp) => resp.json())
      .then((resp) => {
        const sortedUsers = sortUsers(
          resp.users,
          sortParameters.method,
          sortParameters.order
        )
        // filterUsers(resp.users)
        filterUsers(sortedUsers)
      })
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
            Sorry, we couldn't find mates that match your filter criteria, but
            there you have all mates:
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
          <b>We found the following mates that satisfy your filter criteria:</b>
        </Typography>
      )
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

  return (
    <>
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
            variant="h3"
            align="center"
            color="white"
            sx={{backgroundColor: '#1976d2', width: 'fit-content', margin: "auto", borderRadius: '25px', p:2}}
            gutterBottom
          >
            <b>Mates</b>
          </Typography>
        </Box>
        <SortAndFilterUsers
          handleCurrentCountryValue={handleCurrentCountryValue}
          handleCountryChange={handleCountryChange}
          allCountriesOptions={allCountriesOptions}
          handleAgeChange={handleAgeChange}
          ageRange={ageRange}
          handleGendersCheck={handleGendersCheck}
          handleOnSubmit={handleOnSubmit}
          handleSortParametersChange={handleSortParametersChange}
          sortParameters={sortParameters}
        />
        {renderFilterMessage()}
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
      <Box sx={{ pt: 3, pb:3 }} component="footer">
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
    </>
  )
}

