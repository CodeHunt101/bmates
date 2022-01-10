import React from "react"
import { Link, useHistory, useRouteMatch, useParams } from "react-router-dom"
import Button from "@mui/material/Button"
import Card from "@mui/material/Card"
import CardActions from "@mui/material/CardActions"
import CardContent from "@mui/material/CardContent"
import CardMedia from "@mui/material/CardMedia"
import Typography from "@mui/material/Typography"
import Grid from "@mui/material/Grid"
import { DeactivateListing } from "./DeactivateListing"
import { AverageRating } from "../reviews/AverageRating"

export const ListingPreview = ({ listing }) => {
  const history = useHistory()
  const { url, path } = useRouteMatch()
  const {userId} = useParams()
  const handleOnClick = () => history.push(`/listings/${listing.listing.id}`)
  
  return (
    <Grid item xs={12} sm={6} md={3}>
      <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
        <CardMedia
          onClick={handleOnClick}
          component="img"
          sx={{
            pt: "10%",
            cursor: "pointer",
          }}
          height="300px"
          image={
            listing.listing_image === null
              ? "https://source.unsplash.com/random"
              : listing.listing_image
          }
          alt="listingImage"
        />
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography gutterBottom variant="h5" component="h2">
            {listing.listing.title} 
          </Typography>
          <AverageRating listing={listing} size="medium"/>
          {url !== "/my-listings"  && (
          <Typography>
            By:{" "}
            <Link to={`/users/${listing.user_info.id}`}>
              {listing.user_info.username}
            </Link>
          </Typography>)}
        </CardContent>
        <CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
          <Button href={`/listings/${listing.listing.id}`} size="medium">
            View Listing
          </Button>
          {url === "/my-listings" && <DeactivateListing listing={listing} />}
        </CardActions>
      </Card>
    </Grid>
  )
}
