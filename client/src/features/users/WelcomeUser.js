import React from "react"
import Typography from "@mui/material/Typography"

export const WelcomeUser = ({ currentUser }) => {
  return (
    <>
      {currentUser && (
        <Typography component="div" variant="inherit">
          Hi,{" "}
          <b>
            {currentUser.current_user.first_name ||
              currentUser.current_user.username}
          </b>
        </Typography>
      )}
    </>
  )
}
