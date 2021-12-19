import React from "react"
import Calendar from "react-calendar"

export const ListingAvailability = ({tileClassNameToAvailable, handleOnClickDay, availableDates, tileClassNameToReserved}) => {
  
  const handleTileClassNames = ({date, view}) => {
    if (tileClassNameToAvailable) {
      return tileClassNameToAvailable({date, view})
    } 
    else {
      if (availableDates) {
        return tileClassNameToReserved({date, view})
      }
    }
  }
  
  // TODO: figure out disabling all dates except for specified ones
  // const tileDisabled = ({date,view}) => {
  //   if (availableDates) {
  //     if (view === 'month') {
  //       const datesToDisable = availableDates.find(dDate => {
  //         const availableDate = new Date(dDate.available_date)
  //         return availableDate.toString() !== date.toString()
  //       })
  //       return datesToDisable
  //     }
  //   }
  // }


  return(
  <>
    <Calendar 
      tileClassName={handleTileClassNames}
      onClickDay={handleOnClickDay}
      // tileDisabled={tileDisabled}
    />
  </>)
}