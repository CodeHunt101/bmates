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
    listings.filter(listing => !!userId ? listing.mate_id === parseInt(userId) : listing)
    .map(listing => <Listing key={listing.id} listing={listing}/>)
  )

  return(
    <>
      <h2>Listings</h2>
      {renderListings(userId)}
    </>
  )
}