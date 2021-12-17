import React from "react"
import { Link } from "react-router-dom"

export const ListingDetails = ({listing}) => (
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
      <div>Make a reservation:</div>
      {/* TODO: build a new reservation form component */}
    </div>
  </>
)