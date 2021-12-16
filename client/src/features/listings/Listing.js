import React from "react"
import { useParams } from "react-router"
import { Link } from "react-router-dom"

export const Listing = ({listing, userId}) => {
  
  const {listingId} = useParams()
  
  const listingGeneral = () => (
    <>
    {/* TODO: render the featured image here */}
      <img href="" alt=""/>
      <h3>{listing.listing.title}</h3>
    </>
  )

  const listingDetail = () => (
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
  
  const renderListing = () => {
    if ((!listingId && !userId) || (!listingId && userId)) {
      return listingGeneral()
    } 
    else if (listingId && parseInt(listingId) === listing.listing.id && !userId) {
        return listingDetail()
    }
  }
  
  return (
    <div className="listing">
      {renderListing()}
    </div>
  )
}