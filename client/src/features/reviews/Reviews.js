import React from "react";
import { Review } from "./Review";



export const Reviews = ({reviews}) => (
  reviews.map((review, idx) => <Review key={idx} review={review}/>)
)