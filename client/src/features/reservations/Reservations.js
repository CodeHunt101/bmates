import React, { useState, useEffect } from "react"
import { Reservation } from "./Reservation"
import { useParams } from "react-router"

export const Reservations = ({ currentUser, fetchCurrentUser }) => {
  const [reservations, setReservations] = useState([])
  const [isReservationCancelled, setIsReservationCancelled] = useState(false)

  const handleCancellation = (isCancelled) =>
    setIsReservationCancelled(isCancelled)

  const { userId } = useParams()
  useEffect(() => {
    (currentUser || userId) &&
      fetch(`/api/v1/users/${userId || currentUser.current_user.id}`)
        .then((resp) => resp.json())
        .then((resp) => setReservations(resp.reservations))
  }, [userId, currentUser, isReservationCancelled])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => fetchCurrentUser && fetchCurrentUser(), [])

  const renderReservations = () => (
    <div className="reservations">
      <div>
        <h3>Made Reservations</h3>
        <div>
          {reservations.made_reservations &&
            reservations.made_reservations.map((r) => (
              <Reservation
                key={r.reservation.id}
                reservation={r}
                handleCancellation={handleCancellation}
              />
            ))}
        </div>
      </div>
      <div>
        <h3>Received Reservations</h3>
        <div>
          {reservations.received_reservations &&
            reservations.received_reservations.map((r) => (
              <Reservation key={r.reservation.id} reservation={r} />
            ))}
        </div>
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
