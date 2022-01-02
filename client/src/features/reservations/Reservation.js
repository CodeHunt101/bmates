import React from "react"
import Button from "@mui/material/Button"
import Box from "@mui/material/Box"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import CardMedia from "@mui/material/CardMedia"
import Typography from "@mui/material/Typography"
import Avatar from "@mui/material/Avatar"
import { Link } from "@mui/material"

export const Reservation = ({ reservation, handleCancellation }) => {
  const handleOnCancellationClick = () => {
    // PATCHes and changes the status of a reservation to cancelled
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

  return (
  <div className="reservation">
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
            <Link href={`/users/${reservation.user_provider_info.id}`} underline='none'>
              <Avatar
                sx={{ margin: "auto" }}
                alt={reservation.user_provider_info.username}
                src={`${reservation.user_provider_profile_pictture}`}
              />
            </Link>
          )}
          {reservation.user_receiver_info && (
            <Link href={`/users/${reservation.user_receiver_info.id}`} underline='none'>
              <Avatar
                sx={{ margin: "auto" }}
                alt={reservation.user_receiver_info.username}
                src={`${reservation.user_receiver_profile_pictture}`}
              />
            </Link>
          )}

          <Link href={`/listings/${reservation.listing_info.id}`}>
            <Typography component="div" variant="subtitle1">
              <b>{reservation.listing_info.title}</b>
            </Typography>
          </Link>
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
        </Box>
      </Box>
      <CardMedia
        component="img"
        sx={{ width: 151 }}
        image="https://source.unsplash.com/random?activity"
        alt="Reservation"
      />
    </Card>
  </div>
  )
}
