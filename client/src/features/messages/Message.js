import React from "react"
import { Typography, Box, Paper, Avatar } from "@mui/material"

export const Message = ({ message, currentUser }) => {
  const renderSenderUsername = () =>
    currentUser.current_user.id === message.sender_id
      ? "You"
      : findSender().sender_username

  const renderProfilePicture = () => (
    <Box sx={{ mr: 1.5, mb: 2 }}>
      <Avatar src={renderImageUrl()} alt="profile" size="small"></Avatar>
    </Box>
  )

  const messageDate = new Date(message.created_at)

  const renderImageUrl = () =>
    currentUser.current_user.id === message.sender_id
      ? currentUser.profile_picture_url
      : findSender()?.sender_profile_picture

  const renderMessageDateTime = () =>
    `${messageDate.toLocaleDateString()} at ${messageDate.toLocaleTimeString(
      "en-US",
      { hour: "2-digit", minute: "2-digit" }
    )}`

  const findSender = () =>
    currentUser.message_senders.find(
      (sender) => sender.sender_id === message.sender_id
    )
  return (
    <>
      <Box sx={{ display: "flex" }}>
        {renderProfilePicture()}
        <Typography
          component="h3"
          variant="h6"
          sx={{ color: "#334e6f" }}
          gutterBottom
        >
          <b>{renderSenderUsername()}</b>
        </Typography>
      </Box>
      <Box
        component={Paper}
        elevation={1}
        sx={{
          p: 2,
        }}
      >
        <Typography
          component="p"
          sx={{ color: "#878C9F", fontWeight: 500 }}
          variant="body1"
        >
          {message.content}
        </Typography>
      </Box>
      <Box
        sx={{
          p: 1,
          mb: 3,
          textAlign: "end",
        }}
      >
        <Typography
          component="small"
          sx={{ color: "#878C9F", fontWeight: 500 }}
          variant="caption"
        >
          {renderMessageDateTime()}
        </Typography>
      </Box>
    </>
  )
}
