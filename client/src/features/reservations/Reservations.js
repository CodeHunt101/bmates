import React, { useState, useEffect } from "react"
import { Footer } from "../../components/Footer"
import { Reservation } from "./Reservation"
import { useParams } from "react-router"
import { Typography, Grid, Box, Paper } from "@mui/material"

export const Reservations = ({ currentUser, fetchCurrentUser }) => {
  const [reservations, setReservations] = useState({
    made_reservations: [],
    received_reservations: [],
  })
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
          {reservations.made_reservations.map((r) => (
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
          {reservations.received_reservations.map((r) => (
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

  return (
    <>
      <Grid
        item
        sx={{ mx: "auto" }}
        xs={12}
        sm={10}
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
            color="white"
            sx={{
              backgroundColor: "#1976d2",
              width: "fit-content",
              margin: "auto",
              borderRadius: "25px",
              p: 1.5,
            }}
            gutterBottom
          >
            Reservations
          </Typography>
        </Box>
        {renderReservations()}
      </Grid>
      <Footer />
    </>
  )
}
