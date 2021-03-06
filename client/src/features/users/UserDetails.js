import React, { useEffect, useState } from "react"
import { MessageForm } from "../messages/MessageForm"
import { AverageRating } from "../reviews/AverageRating"
import { ListingsList } from "../listings/ListingsList"
import { calculateAge } from "../../helper_functions"
import { useParams } from "react-router"
import {
  Grid,
  Box,
  Typography,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Divider,
  Paper,
} from "@mui/material"
import MaleRoundedIcon from "@mui/icons-material/MaleRounded"
import FemaleRoundedIcon from "@mui/icons-material/FemaleRounded"
import TransgenderRoundedIcon from "@mui/icons-material/TransgenderRounded"
import QuestionMarkRoundedIcon from "@mui/icons-material/QuestionMarkRounded"
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded"
import CakeOutlinedIcon from "@mui/icons-material/CakeOutlined"
import PublicRoundedIcon from "@mui/icons-material/PublicRounded"

export const UserDetails = ({ currentUser }) => {
  const { userId } = useParams()
  const [user, setUser] = useState(null)

  useEffect(() => {
    fetch(`/api/v1/users/${userId}`)
      .then((resp) => resp.json())
      .then((resp) => setUser(resp))
  }, [userId])

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

  const renderHeader = () => (
    <Box className="user-background" component={Paper}>
      <Box
        elevation={1}
        sx={{
          p: 12,
          mb: 3,
          textAlign: "center",
          width: "fit-content",
          margin: "auto",
        }}
      >
        <Box>
          <Typography
            component={Paper}
            variant="h4"
            sx={{
              color: "#334e6f",
              width: "fit-content",
              ml: "auto",
              mr: "auto",
              p: 1,
            }}
            gutterBottom
          >
            <b>{user.user_info.first_name || user.user_info.username}</b>{" "}
            {defineGenderIcon(user.user_info.gender, "x-large")}
          </Typography>
        </Box>
        <Avatar
          component={Paper}
          src={user.user_profile_picture}
          alt="profile"
          sx={{ margin: "auto", width: 250, height: 250 }}
        ></Avatar>
        <Box
          component={Paper}
          sx={{
            width: "fit-content",
            ml: "auto",
            mr: "auto",
            pt: 1,
            mt: 2,
          }}
        >
          <Typography>
            <AverageRating user={user} size="large" />
          </Typography>
        </Box>
      </Box>
    </Box>
  )

  const renderAbout = () => {
    return (
      <Box sx={{ textAlign: "center" }}>
        <Typography
          component="h2"
          variant="subtitle1"
          sx={{ fontSize: 24, color: "#334e6f", align: "center" }}
          gutterBottom
        >
          <b>About {user.user_info.first_name || user.user_info.username}</b>
        </Typography>
        <Box
          component={Paper}
          elevation={1}
          sx={{
            p: 2,
            mb: 3,
            display: "flex",
          }}
        >
          <Box sx={{ mt: "auto", mb: "auto" }}>
            <Avatar
              src={user.user_profile_picture}
              alt="profile"
              sx={{ width: 150, height: 150 }}
            ></Avatar>
          </Box>
          <Box sx={{ ml: 5 }}>{InsetDividers({ user })}</Box>
        </Box>
      </Box>
    )
  }

  const renderBio = () =>
    user.user_info.bio &&
    user.user_info.bio !== "" && (
      <>
        <Box sx={{ textAlign: "center" }}>
          <Typography
            component="h2"
            variant="subtitle1"
            sx={{ fontSize: 24, color: "#334e6f" }}
            gutterBottom
          >
            <b>Bio</b>
          </Typography>
        </Box>
        <Box
          component={Paper}
          elevation={1}
          sx={{
            p: 2,
            mb: 3,
            display: "flex",
            justifyContent: "space-between",
            textAlign: "justify",
          }}
        >
          <p style={{ wordBreak: "break-word" }}>{user.user_info.bio}</p>
        </Box>
      </>
    )

  const renderMessageForm = () =>
    currentUser?.current_user.id.toString() !== userId && (
      <Grid item xs={12} sm={6} md={3}>
        <Box
          sx={{
            my: 1,
            mx: 2,
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <Typography
            component="h2"
            variant="subtitle1"
            sx={{ fontSize: 24, color: "#334e6f" }}
            gutterBottom
          >
            <b>Get in touch</b>
          </Typography>
          {<MessageForm userReceiverId={userId} currentUser={currentUser} />}
        </Box>
      </Grid>
    )

  const renderUsersListings = () => (
    <>
      <Typography
        component="h2"
        variant="subtitle1"
        sx={{ fontSize: 24, color: "#334e6f", textAlign: "center" }}
        gutterBottom
      >
        <b>Listings</b>
      </Typography>
      <ListingsList />
    </>
  )

  return (
    user && (
      <Grid
        container
        spacing={2}
        component="main"
        id="user-details-layout"
        sx={{ minHeight: "100vh", width: "105vw", backgroundColor: "#f9f9f9" }}
      >
        <Grid item sx={{ mx: "auto" }} xs={12} elevation={3} circle="true">
          {renderHeader()}
        </Grid>
        <Grid
          container
          sx={{
            display: "flex",
            justifyContent: "center",
            minWidth: "100vw",
            backgroundColor: "#f9f9f9",
          }}
          elevation={3}
          circle="true"
          component="main"
        >
          <Grid item xs={12} sm={6} md={7} lg={5}>
            <Box
              sx={{
                my: 1,
                mx: 0,
              }}
            >
              {renderAbout()}
              {renderBio()}
            </Box>
          </Grid>
          {renderMessageForm()}
        </Grid>

        <Grid item sx={{ mx: "auto" }} xs={12} elevation={3} circle="true">
          {renderUsersListings()}
        </Grid>
      </Grid>
    )
  )
}

function InsetDividers({ user }) {
  return (
    <List
      sx={{
        width: "100%",
        maxWidth: 360,
        bgcolor: "background.paper",
        mt: "auto",
        mb: "auto",
      }}
    >
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <AccountCircleRoundedIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={user.user_info.first_name || user.user_info.username}
          secondary={
            (user.user_info.first_name && "is my name") ||
            (user.user_info.username && "is my username")
          }
        />
      </ListItem>
      {user.user_info.dob && user.user_info.dob !== "" && (
        <>
          <Divider variant="inset" component="li" />
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <CakeOutlinedIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={calculateAge(new Date(user.user_info.dob))}
              secondary="is my age"
            />
          </ListItem>
        </>
      )}
      {user.user_country_name && user.user_country_name !== "" && (
        <>
          <Divider variant="inset" component="li" />
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <PublicRoundedIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={user.user_country_name}
              secondary="is where I currently live"
            />
          </ListItem>
        </>
      )}
    </List>
  )
}
