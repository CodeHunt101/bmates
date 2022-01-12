import React, { useState } from "react"
import { Box, FormControl, Button, TextField } from "@mui/material"
import Paper from "@mui/material/Paper"



export const MessageForm = ({userReceiverId, listing, listingId}) => {
  
  const [message, setMessage] = useState('')

  const handleOnMessageChange = (e) => {
    setMessage(e.target.value)
  }
  
  const listingIdToPost = () => {
    if (listing) {
      return listing.listing.id
    } 
    else if (listingId) {
      return listingId
    } else return null
  }
  
  const handleOnMessageSubmit = (e,v) => {
    e.preventDefault()
    fetch(`/api/v1/messages`,         {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: {
          receiver_id: userReceiverId || listing.user_info.id,
          content: message,
          listing_id: listingIdToPost()
        },
      }),
    })
    setMessage('')
  }
  
  return (
    <Box
      component={Paper}
      elevation={1}
      sx={{
        p: 2,
        mb: 3,
      }}
    >
        <Box
          component="form"
          onSubmit={handleOnMessageSubmit}
        >
          <FormControl sx={{width: '-webkit-fill-available'}}>
            <TextField
              name="bio"
              required
              multiline
              minRows={6}
              fullWidth
              id="edit-user-bio"
              label="Message"
              value={message}
              onChange={handleOnMessageChange}
            />
            <Button 
              type="submit"
              variant="contained"
              sx={{ mt: 3, mb: 2 }}>Submit</Button>
          </FormControl>
      </Box>
    </Box>
  )
}