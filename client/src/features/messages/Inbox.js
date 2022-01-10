import React, {useState, useEffect} from "react";
import { Link, useParams } from "react-router-dom"
import {
  Grid,
  Paper,
  Box,
  Typography,
} from "@mui/material"

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

const columns = [
  { id: 'username', label: 'Username', minWidth: "fit-content" },
  { id: 'received_on', label: 'Received', minWidth: "fit-content" },
  {
    id: 'listing',
    label: 'Listing',
    minWidth: "fit-content",
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
];

function createData(username, received_on, listing) {
  const date_received_on = new Date(received_on)
  return { username, received_on: date_received_on.toLocaleString() , listing };
}

// const rows = [
//   createData('India', 'IN', 1324171354, 3287263),
//   createData('China', 'CN', 1403500365, 9596961),
//   createData('Italy', 'IT', 60483973, 301340),
//   createData('United States', 'US', 327167434, 9833520),
//   createData('Canada', 'CA', 37602103, 9984670),
//   createData('Australia', 'AU', 25475400, 7692024),
//   createData('Germany', 'DE', 83019200, 357578),
//   createData('Ireland', 'IE', 4857000, 70273),
//   createData('Mexico', 'MX', 126577691, 1972550),
//   createData('Japan', 'JP', 126317000, 377973),
//   createData('France', 'FR', 67022000, 640679),
//   createData('United Kingdom', 'GB', 67545757, 242495),
//   createData('Russia', 'RU', 146793744, 17098246),
//   createData('Nigeria', 'NG', 200962417, 923768),
//   createData('Brazil', 'BR', 210147125, 8515767),
// ];



export function StickyHeadTable({currentUser}) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  
  const rows = currentUser && currentUser.message_senders.map(sender => createData(sender.sender_username, sender.last_received_on, sender.listing_title))

  return (
    currentUser && <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
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
  );
}

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
          <StickyHeadTable currentUser={currentUser}/>
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
            <b>What I can offer</b>
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