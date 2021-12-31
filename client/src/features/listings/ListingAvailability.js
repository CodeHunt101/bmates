import React from "react"
import Calendar from "react-calendar"

export const ListingAvailability = ({
  handleOnClickDay,
  availableDates,
  tileClassNameToDisabled,
  tileClassNameToSelected,
}) => {
  const handleTileClassNameToDisabled = ({ date, view }) => {
    if (availableDates) {
      return tileClassNameToDisabled({ date, view })
    }
  }

  const handleTileClassNameToSelected = ({ date, view }) => {
    if (tileClassNameToSelected) {
      return tileClassNameToSelected({ date, view })
    }
  }

  return (
    <>
      <Calendar
        tileClassName={({ date, view }) => {
          return [
            handleTileClassNameToDisabled({ date, view }),
            handleTileClassNameToSelected({ date, view }),
          ]
        }}
        onClickDay={handleOnClickDay}
        minDate={new Date()}
      />
    </>
  )
}
