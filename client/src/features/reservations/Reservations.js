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

  // useEffect(()=>{
  //   fetch(`/api/v1/users/${userId}`)
  //     .then(resp => resp.json())
  //     .then(resp => setReservations(resp.reservations))
  // },[])

  const renderReservations = (userId) => (
    !isProvider ?
      reservations.filter(r => userId ? r.reservation.user_receiver_id === parseInt(userId) : r.reservation)
      .map(r => <Reservation key={r.reservation.id} reservation={r}/>) 
    :
      reservations.filter(r => userId ? r.user_provider_info.id === parseInt(userId) : r.reservation)
      .map(r => <Reservation key={r.reservation.id} reservation={r}/>)
  )

  // const renderReservations = () => (
  //   <div>
  //     <h3>Made Reservations</h3>
  //      <ul>
  //         {reservations.made_reservations.map(r => <Reservation key={r.id} reservation={r}/>)}
  //     </ul>
  //   </div>
  // )

  return(
    <>
      <h2>Reservations</h2>
      {renderReservations(userId)}
    </>
  )
}