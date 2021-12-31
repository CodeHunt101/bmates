import React from "react"
import Button from "@mui/material/Button"
import Box from "@mui/material/Box"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import CardMedia from "@mui/material/CardMedia"
import Typography from "@mui/material/Typography"
import Avatar from "@mui/material/Avatar"

export const Reservation = ({ reservation, handleCancellation }) => {
  const handleOnCancellationClick = () => {
    fetch(`/api/v1/reservations/${reservation.reservation.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        reservation: {
          status: "cancelled",
        },
      }),
    }).then(() => handleCancellation(true))
  }

  const reservationInfo = () => (
    <Card
      sx={{
        display: "flex",
        justifyContent: "space-between",
        marginBottom: "10%",
        width: "370px",
        height: "270px",
        margin: 1,
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <CardContent sx={{ flex: "1 0 auto" }}>
          {reservation.user_provider_info && (
            <>
              <Avatar
                sx={{ margin: "auto" }}
                alt={reservation.user_provider_info.username}
                src={`${reservation.user_provider_profile_pictture}`}
              />
            </>
          )}
          {reservation.user_receiver_info && (
            <>
              <Avatar
                sx={{ margin: "auto" }}
                alt={reservation.user_receiver_info.username}
                src={`${reservation.user_receiver_profile_pictture}`}
              />
            </>
          )}

          <Typography component="div" variant="subtitle1">
            <b>{reservation.listing_info.title}</b>
          </Typography>
          <Typography
            sx={{ marginBottom: "5%" }}
            variant="subtitle2"
            color="text.secondary"
            component="div"
          >
            {reservation.user_provider_info && (
              <>
                From: <b>{reservation.user_provider_info.username}</b>
              </>
            )}
            {reservation.user_receiver_info && (
              <>
                To: <b>{reservation.user_receiver_info.username}</b>
              </>
            )}
          </Typography>
          <Typography variant="subtitle1" component="div">
            <b>
              {new Date(
                reservation.reservation.reservation_date
              ).toDateString()}
            </b>
          </Typography>
          <Typography variant="button" component="div">
            {
              {
                pending: "Pending Approval",
                accepted: "Accepted",
                declined: "Declined",
                closed: "Closed",
                cancelled: "Cancelled",
                expired: "Expired",
              }[`${reservation.reservation.status}`]
            }
          </Typography>
        </CardContent>
        <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}>
          {reservation.user_provider_info &&
            reservation.reservation.status !== "closed" &&
            reservation.reservation.status !== "cancelled" && (
              <>
                <Button onClick={handleOnCancellationClick}>
                  Cancel Reservation
                </Button>
                <br />
              </>
            )}
          {/* <IconButton aria-label="previous">
            {theme.direction === 'rtl' ? <SkipNextIcon /> : <SkipPreviousIcon />}
          </IconButton>
          <IconButton aria-label="play/pause">
            <PlayArrowIcon sx={{ height: 38, width: 38 }} />
          </IconButton>
          <IconButton aria-label="next">
            {theme.direction === 'rtl' ? <SkipPreviousIcon /> : <SkipNextIcon />}
          </IconButton> */}
        </Box>
      </Box>
      <CardMedia
        component="img"
        sx={{ width: 151 }}
        image="https://source.unsplash.com/random?activity"
        alt="Reservation"
      />
    </Card>
  )

  return <div className="reservation">{reservationInfo()}</div>
}
