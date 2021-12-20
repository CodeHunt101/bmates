import React, {useState, useEffect} from "react"
import { ListingAvailability } from "../listings/ListingAvailability"
import { getFullDate } from "../../helper_functions"
import { Redirect } from "react-router"

export const ReservationForm = ({listing, currentUser}) => {
  
  const [createdReservations, setCreatedReservations] = useState(false)
  const [formData, setFormData] = useState({
    selectedDates: [],
    userReceiverId: ""
  })
  
  
  // const fetchCurrentUser = () => {
  //   fetch('/api/v1/users')
  //   .then(resp => resp.json())
  //   .then(users => setFormData({
  //     ...formData,
  //     userReceiverId: users.current_user.id  
  //   }))
  // }
  
  // useEffect(()=> {
  //   fetchCurrentUser()
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // },[])
  
  
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
            user_receiver_id: currentUser.id,
            status: "pending",
            reservation_date: selectedDate
          }
        })
      }).then(()=>setCreatedReservations(true))
    })
  }

  if (createdReservations) {
    return <Redirect push to={`/users/${currentUser.id}/reservations`} />
  }

  
  return (
    <form onSubmit={handleOnSubmit}>
      <ListingAvailability availableDates={listing.available_dates} tileClassNameToReserved={tileClassNameToReserved} handleOnClickDay={handleOnClickDay}/>
      <button type="submit">Submit Reservations</button>
    </form>
  )
}