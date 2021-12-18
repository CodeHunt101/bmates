import React, { useState, useEffect } from "react"
import { ListingAvailability } from "./ListingAvailability"
import { Redirect } from "react-router"

export const ListingForm = ({currentUser}) => {
  const [createdListing, setCreatedListing] = useState(null)
  
  const [formData, setFormData] = useState({
    listingType: "",
    title: "",
    description: "",
    topics: [],
    selectedDates: []
  })

  const handleOnChange = (e) => (
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  )

  const handleCheckBoxChange = (e) => {
    if (e.target.checked) {
      const selectedTopics = [...formData.topics, e.target.value]
      setFormData({
        ...formData,
        topics: selectedTopics
      })
    }
    else {
      const selectedTopics = formData.topics.filter(t => t !== e.target.value)
      setFormData({
        ...formData,
        topics: selectedTopics
      })
    }
  }
  
  const handleOnSubmit = (e) => {
    // This creates a new listing and immediately appends available dates
    e.preventDefault()
    fetch("/api/v1/listings/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        listing: {
          listing_type: formData.listingType,
          title: formData.title,
          description: formData.description,
          topic_ids: formData.topics,
          user_provider_id: currentUser.id
        }
      })
    })
    .then(resp => resp.json())
    .then(createdListing => {
      formData.selectedDates.forEach(selectedDate => {
        fetch("/api/v1/available_dates", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            available_date: {
              available_date: selectedDate,
              listing_id: createdListing.listing.id
            }
          })
        })
      })

      setCreatedListing(createdListing)
    })
    
  }

  const [allTopicOptions, setAllTopicOptions] = useState([])
  useEffect(()=> {
    fetch("/api/v1/topics")
      .then(resp => resp.json())
      .then(topics => {
        setAllTopicOptions(topics.topics)
        })
  },[])
  
  const renderTopics = () => (
    allTopicOptions.map(t => (
      <div key={t.id}>
        <input  type="checkbox" name="topics" value={t.id} onChange={handleCheckBoxChange} />
        <label>{t.name}</label>
      </div>
    ))
  )

  const tileClassName = ({date,view}) => {
    if (view === 'month') {
      if (formData.selectedDates.find(dDate => dDate.toString() === date.toString())) {
        return 'selected'
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

  if (createdListing) {
    return <Redirect push to={`/listings/${createdListing.listing.id}`} />
  }

  return (
    <section>
      <h2>New Listing</h2>
      <form onSubmit={handleOnSubmit}>
        <label>Listing Type:</label>
        <select name="listingType" value={formData.listingType} onChange={handleOnChange}>
          <option value=""></option>
          <option value="Mate">Mate</option>
        </select>
       
        <label>Title:</label>
        <input
          name="title"
          value={formData.title}
          onChange={handleOnChange}
        />
        <label>Description:</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleOnChange}
        />
        <label>Topics:</label>
        {renderTopics()}
        <ListingAvailability tileClassName={tileClassName} handleOnClickDay={handleOnClickDay}/>
        <button type="submit">
          Create Listing
        </button>
      </form>
    </section>
  )  
}
