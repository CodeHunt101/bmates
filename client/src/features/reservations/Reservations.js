import React, { useState, useEffect } from "react"
import { Reservation } from "./Reservation"
import { useParams } from "react-router"
import Typography from "@mui/material/Typography"
import CssBaseline from "@mui/material/CssBaseline"
import Grid from "@mui/material/Grid"
import Box from "@mui/material/Box"
import Paper from "@mui/material/Paper"
import { createTheme, ThemeProvider } from "@mui/material/styles"

export const Reservations = ({ currentUser, fetchCurrentUser }) => {
  const [reservations, setReservations] = useState([])
  const [isReservationStatusChanged, setIsReservationStatusChanged] =
    useState(false)

  const handleStatusChange = (isStatusChanged) => {
    setIsReservationStatusChanged(isStatusChanged)
    setIsReservationStatusChanged(false)
  }

  const [isReservationReviewed, setIsReservationReviewed] = useState(false)
  const handleReview = (isReservationReviewed) => {
    setIsReservationReviewed(isReservationReviewed)
    setIsReservationReviewed(false)
  }

  const { userId } = useParams()
  useEffect(() => {
    // Updates reservation state on change of userId, logged user or change of reservation status
    ;(currentUser || userId) &&
      fetch(`/api/v1/users/${userId || currentUser.current_user.id}`)
        .then((resp) => resp.json())
        .then((resp) => setReservations(resp.reservations))
  }, [userId, currentUser, isReservationStatusChanged, isReservationReviewed])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => fetchCurrentUser && fetchCurrentUser(), [])

  const renderReservations = () => (
    <div className="reservations">
      <div>
        <Typography align="center" component="div" variant="inherit">
          <b>TO RECEIVE</b>
        </Typography>
        <div>
          {reservations.made_reservations &&
            reservations.made_reservations.map((r) => (
              <Reservation
                key={r.reservation.id}
                reservation={r}
                handleStatusChange={handleStatusChange}
                handleReview={handleReview}
              />
            ))}
        </div>
      </div>
      <div>
        <Typography align="center" component="div" variant="inherit">
          <b>TO PROVIDE</b>
        </Typography>
        <div>
          {reservations.received_reservations &&
            reservations.received_reservations.map((r) => (
              <Reservation
                key={r.reservation.id}
                reservation={r}
                handleStatusChange={handleStatusChange}
              />
            ))}
        </div>
      </div>
    </div>
  )
  const theme = createTheme()
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Grid
        item
        sx={{ mx: "auto" }}
        xs={12}
        sm={8}
        md={9}
        component={Paper}
        elevation={6}
        circle="true"
      >
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
            Reservations
          </Typography>
        </Box>
        {renderReservations()}
      </Grid>
    </ThemeProvider>
  )
}
