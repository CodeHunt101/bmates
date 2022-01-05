import React from "react"
import Button from "@mui/material/Button"
import Card from "@mui/material/Card"
import CardActions from "@mui/material/CardActions"
import CardContent from "@mui/material/CardContent"
import CardMedia from "@mui/material/CardMedia"
import Typography from "@mui/material/Typography"
import MaleRoundedIcon from "@mui/icons-material/MaleRounded"
import FemaleRoundedIcon from "@mui/icons-material/FemaleRounded"

export const User = ({ user }) => {
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
          user.profile_picture ||
          `https://source.unsplash.com/random?${
            user.user_info.gender === "F" ? "female" : "male"
          }`
        }
        alt="listingImage"
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h5" component="h2">
          {user.user_info.username} |{" "}
          {user.user_info.gender === "F" ? (
            <FemaleRoundedIcon fontSize="large" />
          ) : (
            <MaleRoundedIcon fontSize="large" />
          )}
        </Typography>
        <Typography>Name: {user.user_info.first_name}</Typography>
        <Typography>
          {user.user_info.bio.split(" ").slice(0, 25).join(" ") + "..."}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="medium">View User Details</Button>
      </CardActions>
    </Card>
  )
}
