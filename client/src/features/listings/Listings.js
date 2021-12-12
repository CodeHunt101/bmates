import React, { useState, useEffect } from "react"
import { Listing } from "./Listing"
import { useParams } from "react-router"

export const Listings = () => {
  const [listings, setListings] = useState([])
  
  const {userId} = useParams()
  useEffect(()=>{
      fetch('/listings')
        .then(resp => resp.json())
        .then(resp => setListings(resp.listings))
  },[])

  const renderListings = (userId) => (
    listings.filter(listing => !!userId ? listing.listing.mate_id === parseInt(userId) : listing.listing)
    .map(listing => <Listing key={listing.listing.id} listing={listing}/>)
  )

  return(
    <>
      <h2>{userId ? "My Listings":"Listings"}</h2>
      {renderListings(userId)}
    </>
  )
}