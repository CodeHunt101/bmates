import React, { useState, useEffect } from "react"
import { ListingAvailability } from "./ListingAvailability"
import { Redirect } from "react-router"
import { useParams, useLocation, useRouteMatch } from "react-router"
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';

export const ListingForm = ({currentUser}) => {
  const location = useLocation()
  const {path} = useRouteMatch()
  const {listingId} = useParams()
  
  const [submittedListing, setSubmittedListing] = useState(null)
  
  const [formData, setFormData] = useState({
    listingType: "",
    title: "",
    description: "",
    topics: [],
    selectedDates: []
  })

  useEffect(()=> {
    if (location && location.state) {
      const {listing} = location.state
      setFormData({
        listingType: listing.listing.listing_type,
        title: listing.listing.title,
        description: listing.listing.description,
        topics: listing.topics.map(t=>t.id.toString()),
        selectedDates: listing.available_dates.map(item=>new Date(item.available_date))
      })
    }
  },[location])
  

  const handleOnChange = (e) => (
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  )

  const handleCheckBoxChange = (event,values) => {
    const selectedTopics = values.map(value => value.id.toString())
    setFormData({
      ...formData,
      topics: selectedTopics
    })
  }
  
  const handleOnSubmit = (e) => {
    // This creates a new listing and immediately appends available dates
    e.preventDefault()
    const fetchListings = (method) => {
      fetch(method === "POST" ? "/api/v1/listings":`/api/v1/listings/${listingId}`, {
        method: method,
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
      .then(submittedListing => {
        formData.selectedDates.forEach(selectedDate => {
          fetch("/api/v1/available_dates", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              available_date: {
                available_date: selectedDate,
                listing_id: submittedListing.listing.id
              }
            })
          })
        })
  
        setSubmittedListing(submittedListing)
      })
    }
    path === '/listings/new' ? fetchListings('POST'): fetchListings('PATCH')
    
  }

  const [allTopicOptions, setAllTopicOptions] = useState([])
  useEffect(()=> {
    fetch("/api/v1/topics")
      .then(resp => resp.json())
      .then(topics => {
        setAllTopicOptions(topics.topics)
        })
  },[])
  
  const handleDefaultValues = (allTopicOptions) => (
    allTopicOptions.filter(topic => (
      formData.topics.includes(topic.id.toString())
    ))
  )

  const renderTopics = () => (
    allTopicOptions && <Stack spacing={3} sx={{ width: 500 }}>
      <Autocomplete
        onChange={handleCheckBoxChange}
        value={handleDefaultValues(allTopicOptions)}
        multiple
        id="tags-standard"
        options={allTopicOptions}
        getOptionLabel={(option) => option.name}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="standard"
            label="Select Topics"
            placeholder="Topics"
          />
        )}
      />
    </Stack>
  )

  const tileClassNameToAvailable = ({date,view}) => {
    if (view === 'month') {
      if (formData.selectedDates.find(dDate => dDate.toString() === date.toString())) {
        return 'available'
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

  if (submittedListing) {
    return <Redirect push to={{pathname:`/listings/${submittedListing.listing.id}`}} />
  }

  return (
    <section>
      <h2>{location.pathname==='/listings/new' ? "New Listing": "Edit Listing"}</h2>
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
        <ListingAvailability tileClassNameToAvailable={tileClassNameToAvailable} handleOnClickDay={handleOnClickDay}/>
        <button type="submit">
          Submit
        </button>
      </form>
    </section>
  )  
}
