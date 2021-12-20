import React from "react"
import { useParams } from "react-router"
import { ListingDetails } from "./ListingDetails"

export const Listing = ({listing, userId, currentUser}) => {
  
  const {listingId} = useParams()
  
  const renderListing = () => {
    if ((!listingId && !userId) || (!listingId && userId)) {
      return ( <>
        {/* TODO: render the featured image here */}
          <img href="" alt=""/>
          <h3>{listing.listing.title}</h3>
        </>
        )
    } 
    else if (listingId && parseInt(listingId) === listing.listing.id && !userId) {
        return <ListingDetails listing={listing} currentUser={currentUser} />
    }
  }
  
  return (
    <div className="listing">
      {renderListing()}
    </div>
  )
}