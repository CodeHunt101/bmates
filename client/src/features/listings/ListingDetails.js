import React, {useState, useEffect} from "react"
import { Link, useParams } from "react-router-dom"
import { ReservationForm } from "../reservations/ReservationForm"

export const ListingDetails = ({currentUser}) => {

  const [listing, setListing] = useState(null)

  const {listingId} = useParams()

  useEffect(()=> {
    fetch(`/api/v1/listings/${listingId}`)
      .then((resp) => resp.json())
      .then((resp) => {
        setListing(resp.listing)})
  },[currentUser, listingId])

  console.log(listing)
  
  const renderListingDetails = () => (
    listing && (
      <>
        <h1 id="listing-title">{listing.listing.title}</h1> by {listing.user_provider_info.username}
        <Link to={{pathname: `/listings/${listing.listing.id}/edit`, state: {listing}}}>
          Edit Listing
        </Link>
        <p>{listing.listing.description}</p>
        <div>
          <h3>Gallery</h3>
          {/* TODO: render the Gallery images here with some iteration*/}
        </div>
        <div>
          <div>Hosted by:</div>
          <div>{listing.user_provider_info.username}</div>
          <div><img href="" alt=""/></div>
          {/* TODO: work the details for user profile component */}
          <Link to={`/users/${listing.listing.user_provider_id}`}>View Profile</Link>
        </div>
        <div>
          <div>Topics</div>
          <ul>{listing.topics.map(t=><li key={t.id}>{t.name}</li>)}</ul>
        </div>
        <div>
          <div>Make a reservation:</div>
          {/* TODO: build a new reservation form component */}
          <ReservationForm listing={listing} currentUser={currentUser}/>
        </div>
      </>
    )
  )

return (
  <>
    {renderListingDetails()}
  </>)
}
