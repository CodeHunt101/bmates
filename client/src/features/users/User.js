import React from "react"
import { AverageRating } from "../reviews/AverageRating"
import Button from "@mui/material/Button"
import Card from "@mui/material/Card"
import CardActions from "@mui/material/CardActions"
import CardContent from "@mui/material/CardContent"
import CardMedia from "@mui/material/CardMedia"
import Typography from "@mui/material/Typography"
import MaleRoundedIcon from "@mui/icons-material/MaleRounded"
import FemaleRoundedIcon from "@mui/icons-material/FemaleRounded"
import TransgenderRoundedIcon from "@mui/icons-material/TransgenderRounded"
import QuestionMarkRoundedIcon from '@mui/icons-material/QuestionMarkRounded';

export const User = ({ user }) => {
  const defineGender = (gender) => {
    return {
      F: "female",
      M: "male",
      O: "person",
    }[gender]
  }

  const defineGenderIcon = (gender, fontSize) => {
    if (gender) {
      return {
        F: <FemaleRoundedIcon sx={{ color: "#f48fb1" }} fontSize={fontSize} />,
        M: <MaleRoundedIcon sx={{ color: "#42a5f5" }} fontSize={fontSize} />,
        O: <TransgenderRoundedIcon sx={{ color: "#7e57c2" }} fontSize={fontSize} />,
      }[gender]
    } else {
      return <QuestionMarkRoundedIcon sx={{ color: "#7e57c2" }} fontSize={fontSize} />
    }
   
  }

  const generateBioPreview = () => {
    const bio = user.user_info?.bio
    if (bio) {
      return bio.split(" ").slice(0, 25).join(" ") + "..."
    } else {
      return ""
    }
  }

  return (
    <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <CardMedia
        component="img"
        sx={{
          // 16:9
          pt: "10%",
          cursor: "pointer",
        }}
        height="300px"
        image={
          user.user_profile_picture === null
            ? `https://source.unsplash.com/random?${defineGender(
                user.user_info?.gender,
                "large"
              )}`
            : user.user_profile_picture
        }
        alt="listingImage"
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h5" component="h2">
          {user.user_info?.username} |{" "}
          {defineGenderIcon(user.user_info?.gender)}
        </Typography>
        <AverageRating user={user} size="medium" />
        <Typography>
          {user.user_info?.first_name ? "Name:" : "Username:"}{" "}
          <b>{user.user_info?.first_name || user.user_info?.username}</b>
        </Typography>
        <Typography>
          {generateBioPreview()}
        </Typography>
      </CardContent>
      <CardActions>
        <Button href={`/users/${user.user_info?.id}`} size="medium">
          View User Details
        </Button>
      </CardActions>
    </Card>
  )
}
