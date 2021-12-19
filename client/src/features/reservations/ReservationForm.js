import React, {useState, useEffect} from "react"
import { ListingAvailability } from "../listings/ListingAvailability"
// import { Redirect } from "react-router"

export const ReservationForm = ({listing, currentUser}) => {
  
  // const [createdReservation, setCreatedReservation] = useState(null)
  const [formData, setFormData] = useState({
    selectedDates: [],
    userReceiverId: ""
  })
  
  
  const fetchCurrentUser = () => {
    fetch('/api/v1/users')
    .then(resp => resp.json())
    .then(users => setFormData({
      ...formData,
      userReceiverId: users.current_user.id  
    }))
  }
  
  useEffect(()=> {
    fetchCurrentUser()
  },[])
  
  const getFullDate = (rawDate) => {
    const date = typeof(rawDate) === "string" ? new Date(rawDate) : rawDate
    const day = date.getDate()
    const month = date.getMonth() + 1
    const year = date.getFullYear()

    return day + "/" + month + "/" + year
 
  }
  
  const tileClassNameToReserved = ({date, view}) => {
    if (view === "month") {
      if (listing.available_dates.find(dDate => getFullDate(dDate.available_date) === getFullDate(date))) {
        return 'not-to-disable'
      } else {
        return 'to-disable'
      }
    }
  }

  const handleOnClickDay = (value, event) => {
    if (formData.selectedDates.find(date=> date.toString() === value.toString())) {
      setFormData({
        ...formData,
        selectedDates: formData.selectedDates.filter(date => date.toString() !== value.toString())
      })
    } 
    else {
      setFormData({
        ...formData,
        selectedDates: [...formData.selectedDates, value]
      })
    }
  }

  const handleOnSubmit = (e) => {
    e.preventDefault()
    formData.selectedDates.forEach(selectedDate => {
      fetch("/api/v1/reservations", {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          reservation: {
            listing_id: listing.listing.id,
            user_receiver_id: formData.userReceiverId,
            status: "pending",
            reservation_date: selectedDate
          }
        })
      })
    })
    
  }
  
  return (
    <form onSubmit={handleOnSubmit}>
      <ListingAvailability availableDates={listing.available_dates} tileClassNameToReserved={tileClassNameToReserved} handleOnClickDay={handleOnClickDay}/>
      <button type="submit">Submit Reservations</button>
    </form>
  )
}