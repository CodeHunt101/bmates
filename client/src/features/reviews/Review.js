import React from "react";
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { Rating } from "@mui/material"
import FavoriteIcon from "@mui/icons-material/Favorite"
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder"


export const Review = ({review}) => {
  return (
  <>
    <ListItem alignItems="flex-start">
      <ListItemAvatar>
        <Avatar 
          alt="Remy Sharp" 
          src={review.user_profile_picture === null?
            `https://source.unsplash.com/random?${
              review.user_info?.gender === "F" ? "female" : "male"
            }`: review.user_profile_picture} 
        />
      </ListItemAvatar>
      <ListItemText
        primary={
        <Rating
          sx={{color: "#ff6d75"}}
          value={review.rating}
          precision={0.5}
          icon={<FavoriteIcon fontSize="inherit" />}
          emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
          size="small"
          readOnly
        />}
        secondary={
          <>
            <Typography
              sx={{ display: 'inline' }}
              component="span"
              variant="body1"
              color="text.primary"
            >
              {review.message}
            </Typography>
            {` — by ${review.user_info.username}`}
          </>
        }
      />
    </ListItem>
    <Divider variant="inset" component="div" />
  </>
  )
}