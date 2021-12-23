import React, { useState, useEffect } from "react"
import { Listing } from "./Listing"
import { useParams, useRouteMatch } from "react-router"

export const Listings = ({ currentUser, fetchCurrentUser }) => {
  
  const [listings, setListings] = useState(null)
  const { path } = useRouteMatch()
  console.log(currentUser)
  // console.log("path==="+path)
  // debugger

  const { userId, listingId } = useParams()
  
  useEffect(() => {
    // debugger
    // if (currentUser) {
      
      path === "/listings" &&
        fetch("/api/v1/listings")
          .then((resp) => resp.json())
          .then((resp) => setListings(resp.listings))
      
      path === "/dashboard/my-listings" &&
        fetch(`/api/v1/current_user`)
          .then((resp) => resp.json())
          .then((resp) => setListings(resp.listings))
      
      path === "/users/:userId/listings" &&
        fetch(`/api/v1/users/${userId}`)
          .then((resp) => resp.json())
          .then((resp) => setListings(resp.listings))
      
      path === "/listings/:listingId" &&
        fetch(`/api/v1/listings/${listingId}`)
          .then((resp) => resp.json())
          .then((resp) => {
            setListings(resp.listing)})
          // .then((resp) => setListings([resp.listing]))
    // }
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  // useEffect(() => fetchCurrentUser && fetchCurrentUser(), [path])

  
  const renderListings = () => {
    // console.log(listings)
    if (listings) {
      return listingId ? (
        <Listing
          key={listings.listing.id}
          listing={listings}
          currentUser={currentUser}
        />
      ) : (
        listings.map((listing) => (
          <Listing
            key={listing.listing.id}
            listing={listing}
            currentUser={currentUser}
          />
        ))
      )
    }
  }

  // const renderListings = () => {
  //   if (listings) {
  //     // debugger
  //     if (path === "/listings/:listingId") {
  //       return <Listing
  //           key={listings.listing.id}
  //           listing={listings}
  //           currentUser={currentUser}
  //         />
  //     }
      
  //     else {
  //       return listings.map((listing) => (
  //         <Listing
  //           key={listing.listing.id}
  //           listing={listing}
  //           currentUser={currentUser}
  //         />
  //       ))
  //     }
  //   }
  // }

  // const renderListings = () => {
    
  //   if (listings) {

      
  //       return listings.map((listing) => (
  //         <Listing
  //           key={listing.listing.id}
  //           listing={listing}
  //           currentUser={currentUser}
  //         />
  //       ))
      
  //   }
  // }

  return (
    <>
      <h2>{path === "/dashboard/my-listings" ? "My Listings" : "Listings"}</h2>
      {renderListings()}
    </>
  )
}
