import React, { useState } from "react"
import { ListingAvailability } from "../listings/ListingAvailability"
import { getFullDate } from "../../helper_functions"
import { Redirect } from "react-router"
import { Button } from "@mui/material"

export const ReservationForm = ({ listing, currentUser }) => {
  const [createdReservations, setCreatedReservations] = useState(false)
  const [formData, setFormData] = useState({
    selectedDates: [],
  })

  const tileClassNameToDisabled = ({ date, view }) => {
    // Looks up through the available dates. If they match with a calendar date, the className of the day tile is set to not to disable.
    if (view === "month") {
      if (
        listing.available_dates.find(
          (dDate) => getFullDate(dDate.available_date) === getFullDate(date)
        )
      ) {
        return "not-to-disable"
      } else {
        return "to-disable"
      }
    }
  }

  const tileClassNameToSelected = ({ date, view }) => {
    // Looks up through the selected dates. If they match with a calendar date, the className of the day tile is set to selected. 
    if (view === "month") {
      if (
        formData.selectedDates.find(
          (dDate) => dDate.toString() === date.toString()
        )
      ) {
        return "selected"
      }
    }
  }

  const handleOnClickDay = (value, event) => {
    // If new selectedDate is already on the selectedDates state, it's removed from the state, otherwise it's appended.
    if (
      formData.selectedDates.find(
        (date) => date.toString() === value.toString()
      )
    ) {
      setFormData({
        ...formData,
        selectedDates: formData.selectedDates.filter(
          (date) => date.toString() !== value.toString()
        ),
      })
    } else {
      setFormData({
        ...formData,
        selectedDates: [...formData.selectedDates, value],
      })
    }
  }

  const handleOnSubmit = (e) => {
    // POSTs each selected date to the server as a reservation date
    e.preventDefault()
    const promises = formData.selectedDates.map((selectedDate) => {
      return fetch("/api/v1/reservations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          reservation: {
            listing_id: listing.listing.id,
            user_receiver_id: currentUser.current_user.id,
            status: "pending",
            reservation_date: selectedDate,
          },
        }),
      })
    })
    Promise.all(promises).then(() => setCreatedReservations(true))
  }

  if (createdReservations) {
    return (
      <Redirect
        push
        to={`/users/${currentUser.current_user.id}/reservations`}
      />
    )
  }

  return (
    <form onSubmit={handleOnSubmit}>
      <ListingAvailability
        availableDates={listing.available_dates}
        tileClassNameToDisabled={tileClassNameToDisabled}
        handleOnClickDay={handleOnClickDay}
        tileClassNameToSelected={tileClassNameToSelected}
      />
      <Button type="submit"
              
              variant="contained"
              sx={{ mt: 3, mb: 2 }}>Submit</Button>
    </form>
  )
}
