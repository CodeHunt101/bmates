import React from "react"
import { useParams } from "react-router"

export const Reservation = ({reservation}) => {
  
  const {reservationId} = useParams()
  
  const renderReservation = () => {
    // TODO: Simplfy
    if (!reservationId) {
      return ( 
        <>
          <p>Status: {reservation.reservation.status}</p>
          <p>Check-in: {new Date(reservation.reservation.checkin).toString()}</p>
          <p>Check-out: {new Date(reservation.reservation.checkout).toString()}</p>
        </>
      )
    } else {
      if (parseInt(reservationId) === reservation.reservation.id) {
        return (
          <>
            <p>Status: {reservation.reservation.status}</p>
            <p>Check-in: {new Date(reservation.reservation.checkin).toString()}</p>
            <p>Check-out: {new Date(reservation.reservation.checkout).toString()}</p>
          </>
        )
      }
    }
  }
  
  return(
    <div className="reservation">
      {renderReservation()}
    </div>
  )
}