import React from "react"
import Button from "@mui/material/Button"

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
    <>
      {/* <p>ID: {reservation.reservation.id}</p> */}
      <p>
        <b>Listing:</b> {reservation.listing_info.title}
      </p>
      {reservation.user_provider_info && (
        <p>
          <b>User Provider:</b> {reservation.user_provider_info.username}
        </p>
      )}
      {reservation.user_receiver_info && (
        <p>
          <b>User Receiver:</b> {reservation.user_receiver_info.username}
        </p>
      )}
      <p>
        <b>Status:</b> {reservation.reservation.status}
      </p>
      <p>
        <b>Reservation Date:</b>{" "}
        {new Date(reservation.reservation.reservation_date).toDateString()}
      </p>
      {reservation.user_provider_info &&
        reservation.reservation.status !== "cancelled" && (
          <>
            <Button onClick={handleOnCancellationClick}>
              Cancel Reservation
            </Button>{" "}
            <br />
          </>
        )}
    </>
  )

  return <li className="reservation">{reservationInfo()}</li>
}
