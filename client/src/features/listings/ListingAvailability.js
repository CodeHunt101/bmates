import React from "react"
import Calendar from "react-calendar"

export const ListingAvailability = ({tileClassName, handleOnClickDay}) => {
  
  return(
  <>
    <Calendar 
      tileClassName={tileClassName}
      onClickDay={handleOnClickDay}
    />
  </>)
}