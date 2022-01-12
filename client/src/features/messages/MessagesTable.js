import React, { useState } from "react"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TablePagination from "@mui/material/TablePagination"
import TableRow from "@mui/material/TableRow"
import Paper from "@mui/material/Paper"

const columns = [
  { id: "username", label: "Username", minWidth: "fit-content" },
  { id: "received_on", label: "Last received on", minWidth: "fit-content" },
  {
    id: "listing_title",
    label: "Listing",
    minWidth: "fit-content",
  },
]

function createData(
  message_id,
  sender_id,
  username,
  received_on,
  listing_id,
  listing_title
) {
  const date_received_on = new Date(received_on)
  return {
    message_id,
    sender_id,
    username,
    received_on: date_received_on.toLocaleString(),
    listing_id,
    listing_title,
  }
}

export const MessagesTable = ({ currentUser, handleOnRowClick, rowIdx }) => {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  const rows =
    currentUser &&
    currentUser.message_senders
      .sort((a, b) => {
        const dateA = new Date(a.last_received_on)
        const dateB = new Date(b.last_received_on)
        return dateB - dateA
      })
      .map((sender) =>
        createData(
          sender.message_id,
          sender.sender_id,
          sender.sender_username,
          sender.last_received_on,
          sender.listing_id,
          sender.listing_title
        )
      )

  const renderTableHeaders = () =>
    columns.map((column) => (
      <TableCell key={column.id} style={{ minWidth: column.minWidth }}>
        {column.label}
      </TableCell>
    ))

  const renderColumns = (row) =>
    columns.map((column) => {
      return <TableCell key={column.id}>{row[column.id]}</TableCell>
    })

  const renderPaginatedRows = () =>
    rows
      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
      .map((row, idx) => {
        return (
          <TableRow
            hover
            sx={{
              cursor: "pointer",
              backgroundColor: idx === rowIdx && "#bbdefb",
            }}
            role="checkbox"
            tabIndex={-1}
            key={row.message_id}
            onClick={() => handleOnRowClick(row, idx)}
          >
            {renderColumns(row)}
          </TableRow>
        )
      })

  return (
    currentUser && (
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>{renderTableHeaders()}</TableRow>
            </TableHead>
            <TableBody>{renderPaginatedRows()}</TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    )
  )
}
