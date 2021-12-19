import React, { useState, useEffect } from "react"
import { Reservation } from "./Reservation"
import { useParams } from "react-router"

export const Reservations = ({isProvider}) => {
  const [reservations, setReservations] = useState([])
  
  const {userId} = useParams()
  useEffect(()=>{
      fetch('/api/v1/reservations')
        .then(resp => resp.json())
        .then(resp => setReservations(resp.reservations))
  },[])

  const renderReservations = (userId) => (
    !isProvider ?
      reservations.filter(r => userId ? r.reservation.user_receiver_id === parseInt(userId) : r.reservation)
      .map(r => <Reservation key={r.reservation.id} reservation={r}/>) 
    :
      reservations.filter(r => userId ? r.user_provider_info.id === parseInt(userId) : r.reservation)
      .map(r => <Reservation key={r.reservation.id} reservation={r}/>)
      
  )

  return(
    <>
      <h2>Reservations</h2>
      <ul>{renderReservations(userId)}</ul>
    </>
  )
}