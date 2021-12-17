import React from "react"
import { useParams } from "react-router"

export const Reservation = ({reservation}) => {
  
  const {reservationId} = useParams()
  
  const reservationInfo = () => (
    <>
      <p>ID:{reservation.reservation.id}</p>
      <p>Status: {reservation.reservation.status}</p>
      <p>Check-in: {new Date(reservation.reservation.checkin).toString()}</p>
      <p>Check-out: {new Date(reservation.reservation.checkout).toString()}</p>
    </>
  )
  
  const renderReservation = () => {
    if (!reservationId || parseInt(reservationId) === reservation.reservation.id) {
      return ( 
        reservationInfo()
      )
    }
  }
  
  return(
    <div className="reservation">
      {renderReservation()}
    </div>
  )
}