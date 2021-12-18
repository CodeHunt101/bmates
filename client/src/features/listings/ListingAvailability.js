import React, {useState} from "react"
import Calendar from "react-calendar"

export const ListingAvailability = () => {
  
  const [selectedDate, setSelectedDate] = useState([])

  const tileClassName = ({date,view}) => {
    if (view === 'month') {
      if (selectedDate.find(dDate => dDate.toString() === date.toString())) {
        return 'selected'
      }
    }
  }

  
  return(
  <>
    <Calendar 
      tileClassName={tileClassName}
      onClickDay={(value, event) => {
        if (selectedDate.find(date=> date.toString() === value.toString())) {
          setSelectedDate(selectedDate.filter(date => date.toString() !== value.toString()))
        } 
        else {
          setSelectedDate([...selectedDate, value])
        }
      }}
    />
  </>)
}