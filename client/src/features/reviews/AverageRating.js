import { Rating } from "@mui/material"
import FavoriteIcon from "@mui/icons-material/Favorite"
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder"

export const AverageRating = ({listing, user, size}) => (
  <Rating
    sx={{color: "#ff6d75"}}
    value={listing ? listing.listing_average_rating : user.user_average_rating}
    precision={0.5}
    icon={<FavoriteIcon fontSize="inherit" />}
    emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
    size={size}
    readOnly
  />
)