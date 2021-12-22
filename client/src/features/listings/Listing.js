import React from "react"
import { useParams } from "react-router"
import { ListingDetails } from "./ListingDetails"
import { Link } from "react-router-dom"

export const Listing = ({ listing, userId, currentUser }) => {
  const { listingId } = useParams()

  const renderListing = () => {
    if ((!listingId && !userId) || (!listingId && userId)) {
      return (
        <>
          {/* TODO: render the featured image here */}
          <img href="" alt="" />
          <Link to={{pathname: `/listings/${listing.listing.id}`,state: {listing, currentUser}}}>
            <h3>{listing.listing.title}</h3>
          </Link>
        </>
      )
    } else if (
      listingId &&
      parseInt(listingId) === listing.listing.id &&
      !userId
    ) {
      return <ListingDetails listing={listing} currentUser={currentUser} />
    }
  }

  return <div className="listing">{renderListing()}</div>
}
