import React, { useState, useEffect } from "react"
import { Reservation } from "./Reservation"
import { useParams } from "react-router"

export const Reservations = ({isMate}) => {
  const [reservations, setReservations] = useState([])
  
  const {userId} = useParams()
  useEffect(()=>{
      fetch('/reservations')
        .then(resp => resp.json())
        .then(resp => setReservations(resp.reservations))
  },[])

  const renderReservations = (userId) => (
    !isMate ?
      reservations.filter(r => userId ? r.reservation.member_id === parseInt(userId) : r.reservation)
      .map(r => <Reservation key={r.reservation.id} reservation={r}/>) 
    :
      reservations.filter(r => userId ? r.mate_info.id === parseInt(userId) : r.reservation)
      .map(r => <Reservation key={r.reservation.id} reservation={r}/>)
      
  )
  

  return(
    <>
      <h2>Reservations</h2>
      {renderReservations(userId)}
    </>
  )
}