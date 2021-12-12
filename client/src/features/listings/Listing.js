import React from "react"
import { useParams } from "react-router"

export const Listing = ({listing}) => {
  
  const {listingId} = useParams()
  
  const renderListing = () => {
    if (!listingId) {
      return ( 
      <>
        <h3>{listing.listing.title}</h3>
        <p>{listing.listing.description}</p>
        <p>Mate: {listing.mate_info.username}</p>
      </>)
    } else {
      if (parseInt(listingId) === listing.id) {
        return (
          <>
          <h3>{listing.title}</h3>
          <p>{listing.description}</p>
        </>
        )
      }
    }
  }
  
  return(
    <div className="listing">
      {renderListing()}
    </div>
  )
}