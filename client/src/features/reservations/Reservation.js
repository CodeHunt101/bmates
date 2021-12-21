import React from "react"
// import { useParams } from "react-router"
// import { getFullDate } from "../../helper_functions"

export const Reservation = ({reservation}) => {
  
  // const {reservationId} = useParams()
  const reservationInfo = () => (
    <>
      {/* <p>ID: {reservation.reservation.id}</p> */}
      <p><b>Listing:</b> {reservation.listing_info.title}</p>
      {reservation.user_provider_info && <p><b>User Provider:</b> {reservation.user_provider_info.username}</p>}
      {reservation.user_receiver_info && <p><b>User Receiver:</b> {reservation.user_receiver_info.username}</p>}
      <p><b>Status:</b> {reservation.reservation.status}</p>
      <p><b>Reservation Date:</b> {new Date(reservation.reservation.reservation_date).toDateString()}</p><br/>
    </>
  )
  
  // const renderReservation = () => {
  //   if (!reservationId || parseInt(reservationId) === reservation.reservation.id) {
  //     return ( 
  //       reservationInfo()
  //     )
  //   }
  // }
  
  return(
    <li className="reservation">
      {reservationInfo()}
    </li>
  )
}