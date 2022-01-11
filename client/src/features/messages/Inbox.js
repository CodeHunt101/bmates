import React, {useState, useEffect} from "react";
import { Link, useParams } from "react-router-dom"
import {
  Grid,
  Paper,
  Box,
  Typography,
} from "@mui/material"
import {MessagesTable} from './MessagesTable'

export const Inbox = ({currentUser}) => {
  
  
  return (
    <Grid
      container
      position="absolute"
      spacing={2}
      component="main"
      sx={{
        display: "flex",
        justifyContent: "center",
        minWidth: "100vw",
        minHeight: "100vh",
        backgroundColor: "#f9f9f9",
      }}
    >
      <Grid
        item
        xs={12}
        sm={6}
        md={4}
        // sx={{ mx: "auto" }}
      >
        <Box
          sx={{
            my: 6,
            mx: 2,
            alignItems: "center",
          }}
        >
          <MessagesTable currentUser={currentUser}/>
        </Box>
      </Grid>
      <Grid item xs={12} sm={6} md={7}>
        <Box
          sx={{
            my: 3,
            mx: 2,
            alignItems: "center",
          }}
        >
          <Box
            component={Paper}
            elevation={1}
            sx={{
              p: 2,
              mb: 3,
            }}
          >
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography
                id="listing-title"
                sx={{ color: "#334e6f" }}
                component="h1"
                variant="h4"
                gutterBottom
              >
                <b>Text</b>{" "}
              </Typography>
            </Box>
            <Typography
              component="small"
              sx={{ color: "#334e6f" }}
              variant="body2"
              gutterBottom
            >
              By{" "}
            </Typography>
            <Typography
              component="small"
              sx={{ color: "teal" }}
              variant="body2"
              gutterBottom
            >
              <b>Text</b>
            </Typography>
            <Typography component="div" variant="body2" gutterBottom>
              Text
            </Typography>
          </Box>
          <Typography
            component="h2"
            variant="subtitle1"
            sx={{ fontSize: 24, color: "#334e6f" }}
            gutterBottom
          >
            <b>Text</b>
          </Typography>
          <Box
            component={Paper}
            elevation={1}
            sx={{
              p: 2,
              mb: 3,
            }}
          >
            <Typography
              component="p"
              sx={{ color: "#878C9F", fontWeight: 500 }}
              variant="body1"
            >
              Text
            </Typography>
          </Box>
          <Typography
            component="h2"
            variant="subtitle1"
            sx={{ fontSize: 24, color: "#334e6f" }}
            gutterBottom
          >
            <b>Text</b>
          </Typography>
          <Box
            component={Paper}
            elevation={1}
            sx={{
              p: 2,
              mb: 3,
            }}
          >
            {/* TODO: render the Gallery images here with some iteration*/}
            Text
          </Box>

          <Box
            sx={{
              p: 2,
            }}
          >
            Text
          </Box>
          <Typography
            component="h2"
            variant="subtitle1"
            sx={{ fontSize: 24, color: "#334e6f", mt:2 }}
            gutterBottom
          >
            <b>Text</b>
          </Typography>
          <Box>
            Text
          </Box>
        </Box>
      </Grid>
      
    </Grid>
  )
}