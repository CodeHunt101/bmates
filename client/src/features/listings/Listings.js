import React, { useState, useEffect } from "react"
import { Listing } from "./Listing"
import { useParams } from "react-router"

export const Listings = ({
    currentUser,
    areAllListingsNeeded,
    fetchCurrentUser,
  }) => {
  
  const [listings, setListings] = useState(null)

  const { userId, listingId } = useParams()

  useEffect(() => {
    if (currentUser) {
      areAllListingsNeeded &&
        !userId &&
        fetch("/api/v1/listings")
          .then((resp) => resp.json())
          .then((resp) => setListings(resp.listings))

      !areAllListingsNeeded &&
        !userId &&
        !listingId &&
        fetch(`/api/v1/users/${currentUser.id}`)
          .then((resp) => resp.json())
          .then((resp) => setListings(resp.listings))

      userId &&
        fetch(`/api/v1/users/${userId}`)
          .then((resp) => resp.json())
          .then((resp) => setListings(resp.listings))

      listingId &&
        fetch(`/api/v1/listings/${listingId}`)
          .then((resp) => resp.json())
          .then((resp) => setListings(resp.listing))
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => fetchCurrentUser && fetchCurrentUser(), [])

  const renderListings = (userId) => {
    if (listings) {


      return listingId ? (
        <Listing
          key={listings.listing.id}
          listing={listings}
          userId={userId}
          currentUser={currentUser}
        />
      ) : (
        listings.map((listing) => (
          <Listing
            key={listing.listing.id}
            listing={listing}
            userId={userId}
            currentUser={currentUser}
          />
        ))
      )
    }
  }

  return (
    <>
      <h2>{userId ? "My Listings" : "Listings"}</h2>
      {renderListings(userId)}
    </>
  )
}
