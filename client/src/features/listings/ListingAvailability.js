import React from "react"
import Calendar from "react-calendar"

export const ListingAvailability = ({
  handleOnClickDay,
  availableDates,
  tileClassNameToAvailable,
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

  const handleTileClassNameToAvailable = ({ date, view }) => {
    if (tileClassNameToAvailable) {
      return tileClassNameToAvailable({ date, view })
    }
  }

  const addDays = (days) => {
    let result = new Date()
    result.setDate(result.getDate() + days)
    return result
  }

  return (
    <>
      <Calendar
        tileClassName={({ date, view }) => {
          return [
            handleTileClassNameToAvailable({ date, view }),
            handleTileClassNameToDisabled({ date, view }),
            handleTileClassNameToSelected({ date, view }),
          ]
        }}
        onClickDay={handleOnClickDay}
        minDate={addDays(1)}
      />
    </>
  )
}
