import React from "react"

export const Listing = ({listing}) => {
  
  return(
    <div class="listing">
      <h3>{listing.title}</h3>
      <p>{listing.description}</p>
    </div>
  )
}