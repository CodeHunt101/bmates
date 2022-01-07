import React, { useEffect, useState } from "react"
import { useParams } from "react-router"
import MaleRoundedIcon from "@mui/icons-material/MaleRounded"
import FemaleRoundedIcon from "@mui/icons-material/FemaleRounded"
import { Grid, Box, Typography } from "@mui/material"
import { ListingsList } from "../listings/ListingsList"
import Paper from "@mui/material/Paper"
import Avatar from "@mui/material/Avatar"
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Divider from '@mui/material/Divider';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import NumbersRoundedIcon from '@mui/icons-material/NumbersRounded';
import PublicRoundedIcon from '@mui/icons-material/PublicRounded';

function InsetDividers({user}) {
  return (
    <List
      sx={{
        width: '100%',
        maxWidth: 360,
        bgcolor: 'background.paper',
        mt: 'auto',
        mb: 'auto'
      }}
    >
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <AccountCircleRoundedIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={user.user_info.first_name || user.user_info.username} secondary={(user.user_info.first_name && "is my name") || (user.user_info.username && "is my username")} />
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <NumbersRoundedIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="AGE" secondary="is my age" />
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <PublicRoundedIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="COUNTRY OF BIRTH" secondary="is where I come from" />
      </ListItem>
    </List>
  );
}


export const UserDetails = () => {
  const { userId } = useParams()
  const [user, setUser] = useState(null)

  useEffect(() => {
    fetch(`/api/v1/users/${userId}`)
      .then((resp) => resp.json())
      .then((resp) => setUser(resp))
  }, [userId])

  return (
    user && (
      <Grid
        container
        position="absolute"
        spacing={2}
        component="main"
        id="user-details-layout"
        sx={{ minHeight: "100vh", backgroundColor: "#f9f9f9" }}
      >
        <Grid item sx={{ mx: "auto" }} xs={12} elevation={3} circle="true">
          <Box
            className="user-background"
            component={Paper}
            elevation={1}
            sx={{
              p: 12,
              mb: 3,
              textAlign: "center",
            }}
          >
            <Box >
              <Typography
                component={Paper}
                variant="h3"
                sx={{ color: "#334e6f",width: "fit-content", ml: "auto", mr: "auto", p:1}}
                gutterBottom
              >
                <b>{user.user_info.first_name || user.user_info.username}</b>{" "}
                {user.user_info.gender === "F" ? (
                  <FemaleRoundedIcon
                    sx={{ color: "#f48fb1" }}
                    fontSize="x-large"
                  />
                ) : (
                  <MaleRoundedIcon
                    sx={{ color: "#42a5f5" }}
                    fontSize="x-large" />
                )}
              </Typography>
            </Box>
            <Avatar
              component={Paper}
              src={user.user_profile_picture}
              alt="profile"
              sx={{ margin: "auto", width: 300, height: 300 }}
            ></Avatar>
          </Box>
        </Grid>
        <Grid
          item
          sx={{ mx: "auto", display: "flex", justifyContent: "space-evenly" }}
          xs={10}
          elevation={3}
          circle="true"
        >
          <Grid item xs={12} sm={8} md={7}>
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
                <Box sx={{mt: 'auto', mb: 'auto'}}>
                  <Avatar
                    src={user.user_profile_picture}
                    alt="profile"
                    sx={{ width: 150, height: 150 }}
                  ></Avatar>
                </Box>
                <Box sx={{ ml: 5 }}>
                  {InsetDividers({user})}
                </Box>
              </Box>
              <Typography
                component="h2"
                variant="subtitle1"
                sx={{ fontSize: 24, color: "#334e6f" }}
                gutterBottom
              >
                <b>Bio</b>
              </Typography>
              <Box
                component={Paper}
                elevation={1}
                sx={{
                  p: 2,
                  mb: 3,
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <p>{user.user_info.bio}</p>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4} md={3}>
            <Box
              sx={{
                my: 8,
                mx: 2,
                alignItems: "center",
              }}
            >
              GET IN TOUCH (Coming soon)
            </Box>
          </Grid>
        </Grid>

        <Grid item sx={{ mx: "auto" }} xs={10} elevation={3} circle="true">
          <Typography
            component="h2"
            variant="subtitle1"
            sx={{ fontSize: 24, color: "#334e6f", textAlign: "center" }}
            gutterBottom
          >
            <b>Listings</b>
          </Typography>

          <ListingsList />
        </Grid>
      </Grid>
    )
  )
}
