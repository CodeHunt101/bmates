import React from "react"
import { Link } from "react-router-dom"

export const ListingPreview = ({ listing }) => {

  const renderListingPreview = () => {
    return (
      <>
        {/* TODO: render the featured image here */}
        
        <img href="/hello.com" alt="listingImage" />
        <Link to={{pathname:`/listings/${listing.listing.id}`}}> 
          <h3>{listing.listing.title}</h3>
        </Link><br></br>
      </>
    )
  }

  return <div className="listing">{renderListingPreview()}</div>
}
