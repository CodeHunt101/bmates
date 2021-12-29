import React, { useEffect, useState } from "react"
import { ListingPreview } from "../listings/ListingPreview"
import { useParams } from "react-router"
import MaleRoundedIcon from '@mui/icons-material/MaleRounded';
import FemaleRoundedIcon from '@mui/icons-material/FemaleRounded';

export const UserDetails = () => {
  const {userId} = useParams()
  const [user, setUser] = useState(null)
  
  useEffect(()=> {
    fetch(`/api/v1/users/${userId}`)
    .then(resp => resp.json())
    .then(resp => setUser(resp))
  },[userId])
  
  return(
    <>
      {
        user && (
          <>
        <div>
          <img src={user.profile_picture} alt="profile" width="200px"></img>
          <p>About <b>{user.user_info.username} | {user.user_info.gender === "F" ? <FemaleRoundedIcon fontSize="large"/> : <MaleRoundedIcon fontSize="large"/>}</b></p>
          <p>{user.user_info.first_name}</p>
          <p>{user.user_info.bio}</p>
        </div>
        <div>
          <h1>Listings</h1>
          <ul>
            {user.listings.length > 0 ? user.listings.map((listing) => (
              <ListingPreview
                key={listing.listing.id}
                listing={listing}
              />
            )) : `${user.user_info.username} doesn't have any listings`}
          </ul>
        </div></>)}
    </>
  )
}




