import React from "react"
import { Link } from "react-router-dom"
import { ListingAvailability } from "./ListingAvailability"

export const ListingDetails = ({listing}) => {
  
  const tileClassNameToReserved = ({date, view}) => {
    if (view === "month") {
      if (listing.available_dates.find(dDate => new Date(dDate.available_date).toString() === date.toString())) {
        return 'not-to-disable'
      } else {
        return 'to-disable'
      }
    }
  }

  return (
  <>
    <h1 id="listing-title">{listing.listing.title}</h1> by {listing.user_provider_info.username}
    <p>{listing.listing.description}</p>
    <div>
      <h3>Gallery</h3>
      {/* TODO: render the Gallery images here with some iteration*/}
    </div>
    <div>
      <div>Hosted by:</div>
      <div>{listing.user_provider_info.username}</div>
      <div><img href="" alt=""/></div>
      {/* TODO: work the details for user profile component */}
      <Link to={`/users/${listing.listing.user_provider_id}`}>View Profile</Link>
    </div>
    <div>
      <div>Topics</div>
      <ul>{listing.topics.map(t=><li key={t.id}>{t.name}</li>)}</ul>
    </div>
    <div>
      <div>Make a reservation:</div>
      {/* TODO: build a new reservation form component */}
      <ListingAvailability availableDates={listing.available_dates} tileClassNameToReserved={tileClassNameToReserved}/>
    </div>
  </>)
}