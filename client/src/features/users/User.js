import React from "react"
import { useRouteMatch } from "react-router"
import { AverageRating } from "../reviews/AverageRating"
import MaleRoundedIcon from "@mui/icons-material/MaleRounded"
import FemaleRoundedIcon from "@mui/icons-material/FemaleRounded"
import TransgenderRoundedIcon from "@mui/icons-material/TransgenderRounded"
import QuestionMarkRoundedIcon from "@mui/icons-material/QuestionMarkRounded"
import {
  Avatar,
  Paper,
  Box,
  Grid,
  Button,
  Card,
  CardContent,
  CardActions,
  CardMedia,
  Typography,
} from "@mui/material"

export const User = ({ user }) => {
  const { path } = useRouteMatch()
  console.log(path)
  const defineGenderIcon = (gender, fontSize) => {
    if (gender) {
      return {
        F: <FemaleRoundedIcon sx={{ color: "#f48fb1" }} fontSize={fontSize} />,
        M: <MaleRoundedIcon sx={{ color: "#42a5f5" }} fontSize={fontSize} />,
        O: (
          <TransgenderRoundedIcon
            sx={{ color: "#7e57c2" }}
            fontSize={fontSize}
          />
        ),
      }[gender]
    } else {
      return (
        <QuestionMarkRoundedIcon
          sx={{ color: "#7e57c2" }}
          fontSize={fontSize}
        />
      )
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
    <Grid
      item
      xs={12}
      sm={path === "/listings/:listingId" ? 12 : 6}
      md={path === "/listings/:listingId" ? 12 : 3}
      lg={path === "/listings/:listingId" ? 12 : 3}
    >
      <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
        {user.user_profile_picture !== null ? (
          <CardMedia
            component="img"
            sx={{
              pt: "10%",
              cursor: "pointer",
            }}
            height="300px"
            image={user.user_profile_picture}
            alt="userImage"
          />
        ) : (
          <Box sx={{ height: "300px", pt: "10%" }}>
            <Avatar
              component={Paper}
              src={user.user_profile_picture}
              alt="profile"
              sx={{ margin: "auto", width: 165, height: 165, mt: "20%" }}
            ></Avatar>
          </Box>
        )}
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
          <Typography>{generateBioPreview()}</Typography>
        </CardContent>
        <CardActions>
          <Button href={`/users/${user.user_info?.id}`} size="medium">
            View User Details
          </Button>
        </CardActions>
      </Card>
    </Grid>
  )
}
