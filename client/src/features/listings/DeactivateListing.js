import React, { useState } from "react"
import DeleteIcon from "@mui/icons-material/Delete"
import { Modal, Box, IconButton, Button } from "@mui/material"

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
}

const ChildModal = ({ listing }) => {
  const [openChildModal, setOpenChildModal] = useState(false)
  const handleOpenChildModal = () => {
    const activeReservations = listing.reservations.filter(
      (listing) => listing.status === "pending" || listing.status === "accepted"
    )
    if (activeReservations.length > 0) {
      setOpenChildModal(true)
    } else {
      deactivateListing()
    }
  }

  const deactivateListing = () => {
    return fetch(`/api/v1/listings/${listing.listing.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        listing: {
          is_active: false,
        },
      }),
    }).then(() => window.location.reload())
  }

  const handleCloseChildModal = () => {
    setOpenChildModal(false)
  }

  return (
    <>
      <Button color="error" onClick={handleOpenChildModal}>
        Deactivate Listing
      </Button>
      <Modal
        hideBackdrop
        open={openChildModal}
        onClose={handleCloseChildModal}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: 200 }}>
          <h2 id="child-modal-title">Oops</h2>
          <p id="child-modal-description">
            Seems like this listing has some either pending on accepted
            reservations
          </p>
          <Button onClick={handleCloseChildModal}>Close</Button>
        </Box>
      </Modal>
    </>
  )
}

export const DeactivateListing = ({ listing }) => {
  const [openModal, setOpenModal] = useState(false)

  const handleOpenModal = () => setOpenModal(true)
  const handleCloseModal = () => setOpenModal(false)

  return (
    <>
      <IconButton aria-label="delete" onClick={handleOpenModal}>
        <DeleteIcon color="error" />
      </IconButton>
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 400 }}>
          <h2 id="parent-modal-title">
            Are you sure you want to deactivate this listing?
          </h2>
          <p id="parent-modal-description">This action cannot be undone.</p>
          <ChildModal listing={listing} />
        </Box>
      </Modal>
    </>
  )
}
