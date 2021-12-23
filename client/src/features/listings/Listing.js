import React from "react"
import { useLocation, useParams } from "react-router"
import { ListingDetails } from "./ListingDetails"
import { Link, useRouteMatch } from "react-router-dom"

export const Listing = ({ listing, currentUser}) => {
  const { listingId } = useParams()
  // console.log(useLocation())
  const renderListing = () => {
    if (!listingId ) {
      return (
        <>
          {/* TODO: render the featured image here */}
          
          <img href="/hello.com" alt="listingImage" />
          <Link to={`/listings/${listing.listing.id}`}> 
            <h3>{listing.listing.title}</h3>
          </Link><br></br>
        </>
      )
    } 
    else {
      return <ListingDetails listing={listing} currentUser={currentUser} />
    }
  }

  return <div className="listing">{renderListing()}</div>
}
