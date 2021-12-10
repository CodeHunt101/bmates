import React, { useState, useEffect } from "react"
import { Listing } from "./Listing"

export const Listings = () => {
  const [listings, setListings] = useState([])
  
  useEffect(()=>{
      fetch('/listings')
        .then(resp => resp.json())
        .then(resp => setListings(resp.listings))
  },[])
  

  return(
    <>
      <h2>Listings</h2>
      {listings.map(listing => <Listing key={listing.id} listing={listing}/>)}
    </>
  )
}