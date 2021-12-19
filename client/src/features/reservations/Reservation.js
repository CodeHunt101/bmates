import React from "react"
import { useParams } from "react-router"
// import { getFullDate } from "../../helper_functions"

export const Reservation = ({reservation}) => {
  
  const {reservationId} = useParams()
  
  const reservationInfo = () => (
    <>
      <p>ID: {reservation.reservation.id}</p>
      <p>Listing: {reservation.listing_info.title}</p>
      <p>User: {reservation.user_provider_info.username}</p>
      <p>Status: {reservation.reservation.status}</p>
      <p>Reservation Date: {new Date(reservation.reservation.reservation_date).toString()}</p>
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
    <li className="reservation">
      {renderReservation()}
    </li>
  )
}