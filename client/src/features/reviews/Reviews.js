import React from "react"
import { Review } from "./Review"
import { Typography } from "@mui/material"

export const Reviews = ({ reviews }) =>
  reviews.length > 0 ? (
    reviews.map((review, idx) => <Review key={idx} review={review} />)
  ) : (
    <Typography component="p" variant="body1">
      This listing hasn't received any reviews yet
    </Typography>
  )
