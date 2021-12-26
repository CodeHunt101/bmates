import React, { useState, useEffect } from "react"
import { ListingPreview } from "./ListingPreview"
import { useParams, useRouteMatch } from "react-router"

export const ListingsList = ({ currentUser }) => {
  
  const [listings, setListings] = useState(null)
  const { path } = useRouteMatch()
  const { userId, listingId } = useParams()
  
  useEffect(() => {
      
      path === "/listings" &&
        fetch("/api/v1/listings")
          .then((resp) => resp.json())
          .then((resp) => setListings(resp.listings))
      
      path === "/my-listings" &&
        fetch(`/api/v1/current_user`)
          .then((resp) => resp.json())
          .then((resp) => setListings(resp.listings))
      
      path === "/users/:userId/listings" &&
        fetch(`/api/v1/users/${userId}`)
          .then((resp) => resp.json())
          .then((resp) => setListings(resp.listings))
    
  }, [currentUser, listingId, path, userId])
  
  const renderListings = () => {
    if (listings) {
      return listings.map((listing) => (
          <ListingPreview
            key={listing.listing.id}
            listing={listing}
            currentUser={currentUser}
          />
        ))
      
    }
  }

  return (
    <>
      <h2>{path === "/dashboard/my-listings" ? "My Listings" : "Listings"}</h2>
      {renderListings()}
    </>
  )
}
