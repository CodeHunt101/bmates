import React from "react"
import { Container, Grid, Box, Typography, Button, Stack } from "@mui/material"
import Paper from "@mui/material/Paper"

export const Home = ({ currentUser }) => (
  <Container id="home" maxWidth="xl">
    <Grid
      item
      component={Paper}
      sx={{
        display: "flex",
        minHeight: "92.2vh",
        backgroundColor: "rgba(66,165,245,0.8)",
      }}
    >
      <Box
        sx={{
          margin: "auto",
          width: "50%",
          textAlign: "center",
          alignItems: "center",
          height: "20%",
          backgroundColor: "#e3f2fd",
          p: 4,
        }}
      >
        <Typography component="h1" variant="h3" gutterBottom>
          <b>Let's B mates!</b>
        </Typography>
        <Typography component="p" variant="body1" gutterBottom>
          Start meeting new people! Choose whether you want to see all our
          listings or all our users.
        </Typography>
        <Stack
          direction="row"
          spacing={2}
          justifyContent="center"
          sx={{ m: 5 }}
        >
          <Button className="search" variant="contained" href="/listings">
            <b>Listings</b>
          </Button>
          <Button className="search" variant="contained" href="/users">
            <b>Mates</b>
          </Button>
        </Stack>
      </Box>
    </Grid>
  </Container>
)
