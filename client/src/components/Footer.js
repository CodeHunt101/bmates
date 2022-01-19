import React from 'react'
import { Box, Typography } from '@mui/material'

export const Footer = () => (
  <Box sx={{ pt: 3, pb:3}} component="footer">
    <Typography component="h6" variant="h5" align="center" color="white" sx={{fontSize: '18px'}} gutterBottom>
      <b>You can contact me on:</b>
    </Typography>
    <Typography
      variant="subtitle1"
      align="center"
      color="text.secondary"
      component="div"
    >
      <a href="https://github.com/CodeHunt101" target="_blank" rel="noreferrer"><div className="icons8-github"></div></a>
      <a href="https://www.linkedin.com/in/harold-torres-marino/" target="_blank" rel="noreferrer">
        <div className="icons8-linkedin-circled"></div>
      </a>
      <a href="https://haroldtm55.medium.com/" target="_blank" rel="noreferrer">
        <div className="icons8-medium"></div>
      </a>
      <a href="https://twitter.com/CodeHunt101" target="_blank" rel="noreferrer">
        <div className="icons8-twitter-circled"></div>
      </a>
      <a href="mailto:haroldtm55@gmail.com" target="_blank" rel="noreferrer">
        <div className="icons8-gmail"></div>
      </a>
      <a href="https://wa.me/61401927123" target="_blank" rel="noreferrer">
        <div className="icons8-whatsapp"></div>
      </a>
      
    </Typography>
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
    >
      {/* <Link color="inherit" href="https://github.com/CodeHunt101">
        My GitHub profile
      </Link>{" "} */}
      
      {"."}
    </Typography>
  </Box>
)