import React, { useState } from "react"
import { Footer } from "../../components/Footer"
import { MessagesTable } from "./MessagesTable"
import { MessagesBody } from "./MessagesBody"
import { MessageForm } from "./MessageForm"
import { Grid, Box } from "@mui/material"

export const Inbox = ({ currentUser }) => {
  const [messages, setMessages] = useState([])
  const [rowLocation, setRowLocation] = useState({ idx: "", page: "" })
  const [row, setRow] = useState({})

  const handleOnRowClick = (row, idx, page) => {
    fetch(`/api/v1/inbox/users/${row.sender_id}/listings/${row.listing_id}`)
      .then((resp) => resp.json())
      .then((resp) => {
        const messages = resp.messages.sort((a, b) => {
          const dateA = new Date(a.created_at)
          const dateB = new Date(b.created_at)
          return dateB - dateA
        })
        setMessages(messages)
        setRowLocation({ idx, page })
        setRow(row)
      })
  }

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
      <Grid item xs={12} sm={6} md={4}>
        <Box
          sx={{
            my: 6,
            mx: 2,
            alignItems: "center",
          }}
        >
          <MessagesTable
            currentUser={currentUser}
            handleOnRowClick={handleOnRowClick}
            rowLocation={rowLocation}
          />
        </Box>
        <Box>
          <MessageForm
            userReceiverId={row.sender_id}
            listingId={row.listing_id}
            currentUser={currentUser}
          />
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
          <MessagesBody messages={messages} currentUser={currentUser} />
        </Box>
      </Grid>
      <Footer />
    </Grid>
  )
}
