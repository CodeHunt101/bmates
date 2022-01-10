import React, { useState } from "react"
import { Typography } from "@mui/material"
import { Modal, Box } from "@mui/material"
import { Button, Grid, TextField } from "@mui/material"
import { styled } from "@mui/material/styles"
import Rating from "@mui/material/Rating"
import FavoriteIcon from "@mui/icons-material/Favorite"
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder"

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
}
const StyledRating = styled(Rating)({
  "& .MuiRating-iconFilled": {
    color: "#ff6d75",
  },
  "& .MuiRating-iconHover": {
    color: "#ff3d47",
  },
})

export const ReviewReservation = ({ reservation, handleReview }) => {
  const [rating, setRating] = useState(reservation.review?.rating || null)
  const [message, setMessage] = useState("")

  const [openModal, setOpenModal] = useState(false)

  const handleOpenModal = (event, value) => {
    value && setOpenModal(true)
    setRating(value)
  }
  const handleCloseModal = () => setOpenModal(false)

  const handleOnMessageChange = (e) => {
    setMessage(e.target.value)
  }

  const handleOnSubmit = (e) => {
    e.preventDefault()
    console.log(e)
    fetch("api/v1/reviews", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        review: {
          user_id: reservation.reservation.user_receiver_id,
          reservation_id: reservation.reservation.id,
          message,
          rating,
        },
      }),
    })
      .then(() => handleReview(true))
      .then(() => handleCloseModal())
  }

  return (
    <>
      <Box
        sx={{
          "& > legend": { mt: 2 },
        }}
      >
        <StyledRating
          value={rating}
          precision={1}
          icon={<FavoriteIcon fontSize="inherit" />}
          emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
          readOnly={!!reservation.review?.rating}
          onChange={handleOpenModal}
        />
      </Box>
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box
          sx={{ ...style, width: 400 }}
          component="form"
          onSubmit={handleOnSubmit}
        >
          <Typography component="h3" variant="h5" id="modal-title" gutterBottom>
            Leave a review
          </Typography>
          <Grid item xs={12}>
            <TextField
              name="message"
              multiline
              minRows={3}
              fullWidth
              id="edit-user-bio"
              label="Review"
              value={message}
              onChange={handleOnMessageChange}
            />
          </Grid>
          <Button color="error" type="submit">
            Submit Review
          </Button>
        </Box>
      </Modal>
    </>
  )
}
