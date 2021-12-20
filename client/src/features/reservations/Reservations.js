import React, { useState, useEffect } from "react"
import { Reservation } from "./Reservation"
import { useParams } from "react-router"

export const Reservations = () => {
  const [reservations, setReservations] = useState([])

  const { userId } = useParams()
  
  useEffect(() => {
    fetch(`/api/v1/users/${userId}`)
      .then((resp) => resp.json())
      .then((resp) => setReservations(resp.reservations))
  }, [userId])

  const renderReservations = () => (
    <div>
      <h3>Made Reservations</h3>
      <ul>
        {reservations.made_reservations &&
          reservations.made_reservations.map((r) => (
            <Reservation key={r.reservation.id} reservation={r} />
          ))}
      </ul>
      <h3>Received Reservations</h3>
      <ul>
        {reservations.received_reservations &&
          reservations.received_reservations.map((r) => (
            <Reservation key={r.reservation.id} reservation={r} />
          ))}
      </ul>
    </div>
  )

  return (
    <>
      <h1>Reservations</h1>
      {renderReservations()}
    </>
  )
}
