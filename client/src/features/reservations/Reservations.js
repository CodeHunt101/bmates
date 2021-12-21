import React, { useState, useEffect } from "react"
import { Reservation } from "./Reservation"
import { useParams } from "react-router"

export const Reservations = ({ currentUser, fetchCurrentUser }) => {
  const [reservations, setReservations] = useState([])

  const { userId } = useParams()
  useEffect(() => {
    (currentUser || userId) &&
      fetch(`/api/v1/users/${userId || currentUser.id}`)
        .then((resp) => resp.json())
        .then((resp) => setReservations(resp.reservations))
  }, [userId, currentUser])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => fetchCurrentUser && fetchCurrentUser(), [])

  const renderReservations = () => (
    <div className="reservations">
      <div>
        <h3>Made Reservations</h3>
        <ul>
          {reservations.made_reservations &&
            reservations.made_reservations.map((r) => (
              <Reservation key={r.reservation.id} reservation={r} />
            ))}
        </ul>
      </div>
      <div>
        <h3>Received Reservations</h3>
        <ul>
          {reservations.received_reservations &&
            reservations.received_reservations.map((r) => (
              <Reservation key={r.reservation.id} reservation={r} />
            ))}
        </ul>
      </div>
    </div>
  )

  return (
    <>
      <h1>Reservations</h1>
      {renderReservations()}
    </>
  )
}
