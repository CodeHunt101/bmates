import React from "react"
import { DeactivateListing } from "./DeactivateListing"
import { AverageRating } from "../reviews/AverageRating"
import { Link, useHistory, useRouteMatch } from "react-router-dom"
import {
  Grid,
  Typography,
  Button,
  Card,
  CardMedia,
  CardContent,
  CardActions,
} from "@mui/material"
import { Avatar, Paper, Box } from "@mui/material"

export const ListingPreview = ({ listing }) => {
  const history = useHistory()
  const { url } = useRouteMatch()
  const handleOnClick = () => history.push(`/listings/${listing.listing.id}`)

  return (
    <Grid item xs={12} sm={6} md={3} lg={3}>
      <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
        {listing.listing_image !== null ? (
          <CardMedia
            onClick={handleOnClick}
            component="img"
            sx={{
              pt: "10%",
              cursor: "pointer",
            }}
            height="300px"
            image={listing.listing_image}
            alt="listingImage"
          />
        ) : (
          <Box sx={{ height: "300px", pt: "10%" }}>
            <Avatar
              component={Paper}
              src={listing.listing_image}
              alt="profile"
              sx={{ margin: "auto", width: 165, height: 165, mt: "20%" }}
            ></Avatar>
          </Box>
        )}
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography gutterBottom variant="h5" component="h2">
            {listing.listing.title}
          </Typography>
          <AverageRating listing={listing} size="medium" />
          {url !== "/my-listings" && (
            <Typography>
              By:{" "}
              <Link to={`/users/${listing.user_info.id}`}>
                {listing.user_info.username}
              </Link>
            </Typography>
          )}
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
