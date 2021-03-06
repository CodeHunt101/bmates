import React, { useState, useEffect } from "react"
import { AverageRating } from "../reviews/AverageRating"
import { ReservationForm } from "../reservations/ReservationForm"
import { MessageForm } from "../messages/MessageForm"
import { User } from "../users/User"
import { useParams } from "react-router-dom"
import { Reviews } from "../reviews/Reviews"
import { Footer } from "../../components/Footer"
import {
  Grid,
  Paper,
  Box,
  Typography,
  CardMedia,
  Chip,
  IconButton,
  Link,
} from "@mui/material"
import EditRoundedIcon from "@mui/icons-material/Edit"

export const ListingDetails = ({ currentUser }) => {
  const [listing, setListing] = useState({
    listing_average_rating: null,
    listing_reviews: [],
  })

  const { listingId } = useParams()

  useEffect(() => {
    fetch(`/api/v1/listings/${listingId}`)
      .then((resp) => resp.json())
      .then((resp) => {
        setListing(resp.listing)
      })
  }, [currentUser, listingId])

  const renderLinkToEditListing = () =>
    currentUser &&
    listing?.user_info?.id === currentUser?.current_user.id && (
      <Link href={`/listings/${listing.listing?.id}/edit`}>
        <IconButton aria-label="delete">
          <EditRoundedIcon color="warning" />
        </IconButton>
      </Link>
    )

  const renderReservationsForm = () => (
    <>
      <Typography
        component="h2"
        variant="subtitle1"
        sx={{ fontSize: 24, color: "#334e6f" }}
        gutterBottom
      >
        {currentUser &&
        listing?.user_info?.id === currentUser?.current_user.id ? (
          <b>My Listing Availability</b>
        ) : (
          <b>Make reservations</b>
        )}
      </Typography>
      <ReservationForm listing={listing} currentUser={currentUser} />
    </>
  )

  const renderMessageForm = () =>
    currentUser &&
    listing?.user_info?.id !== currentUser?.current_user.id && (
      <Box
        sx={{
          my: 1,
          mx: 2,
          alignItems: "center",
        }}
      >
        <Typography
          component="h2"
          variant="subtitle1"
          sx={{ fontSize: 24, color: "#334e6f" }}
          gutterBottom
        >
          <b>Listing enquiries</b>
        </Typography>
        <MessageForm listing={listing} currentUser={currentUser} />
      </Box>
    )

  return (
    <Grid
      container
      position="absolute"
      spacing={2}
      component="main"
      sx={{
        display: "flex",
        justifyContent: "center",
        minWidth: "100vw",
        minHeight: "100vh",
        backgroundColor: "#f9f9f9",
      }}
    >
      <Grid item xs={12} sm={6} md={7}>
        <Box
          sx={{
            my: 8,
            mx: 2,
            alignItems: "center",
          }}
        >
          <Box
            component={Paper}
            elevation={1}
            sx={{
              p: 2,
              mb: 3,
            }}
          >
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography
                id="listing-title"
                sx={{ color: "#334e6f" }}
                component="h1"
                variant="h4"
                gutterBottom
              >
                <b>{listing.listing?.title}</b>{" "}
                <AverageRating listing={listing} size="large" />
              </Typography>
              {renderLinkToEditListing()}
            </Box>
            <Typography
              component="small"
              sx={{ color: "#334e6f" }}
              variant="body2"
              gutterBottom
            >
              By{" "}
            </Typography>
            <Typography
              component="small"
              sx={{ color: "teal" }}
              variant="body2"
              gutterBottom
            >
              <b>{listing.user_info?.username}</b>
            </Typography>
          </Box>
          <Typography
            component="h2"
            variant="subtitle1"
            sx={{ fontSize: 24, color: "#334e6f" }}
            gutterBottom
          >
            <b>What I can offer</b>
          </Typography>
          <Box
            component={Paper}
            elevation={1}
            sx={{
              p: 2,
              mb: 3,
            }}
          >
            <Typography
              component="p"
              sx={{
                color: "#878C9F",
                fontWeight: 500,
                wordBreak: "break-word",
              }}
              variant="body1"
            >
              {listing.listing?.description}
            </Typography>
          </Box>
          {listing.listing_image !== null && (
            <>
              <Typography
                component="h2"
                variant="subtitle1"
                sx={{ fontSize: 24, color: "#334e6f" }}
                gutterBottom
              >
                <b>Featured Image</b>
              </Typography>
              <Box
                component={Paper}
                elevation={1}
                sx={{
                  p: 2,
                  mb: 3,
                }}
              >
                <CardMedia
                  component="img"
                  sx={{
                    cursor: "pointer",
                  }}
                  height="300px"
                  image={listing.listing_image}
                  alt="listingImage"
                />
              </Box>
            </>
          )}
          <Box
            sx={{
              p: 2,
            }}
          >
            {listing.topics?.map((t) => (
              <Chip
                key={t.id}
                color="primary"
                sx={{ m: 1, fontSize: 15 }}
                label={t.name}
              />
            ))}
          </Box>
          <Typography
            component="h2"
            variant="subtitle1"
            sx={{ fontSize: 24, color: "#334e6f", mt: 2 }}
            gutterBottom
          >
            <b>Reviews</b>
          </Typography>
          <Box>
            <Reviews reviews={listing.listing_reviews} />
          </Box>
        </Box>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Box
          sx={{
            my: 6,
            mx: 2,
            alignItems: "center",
          }}
        >
          {renderReservationsForm()}
          {renderMessageForm()}
          <Typography
            component="h2"
            variant="subtitle1"
            sx={{ fontSize: 24, color: "#334e6f" }}
            gutterBottom
          >
            <b>More about the author</b>
          </Typography>
          <User user={listing} />
        </Box>
      </Grid>
      <Footer />
    </Grid>
  )
}
