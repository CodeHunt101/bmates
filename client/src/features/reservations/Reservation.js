import React from "react"
import Button from "@mui/material/Button"
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';


export const Reservation = ({ reservation, handleCancellation }) => {
  // const theme = useTheme();
  
  const handleOnCancellationClick = () => {
    fetch(`/api/v1/reservations/${reservation.reservation.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        reservation: {
          status: "cancelled",
        },
      }),
    }).then(() => handleCancellation(true))
  }

  const reservationInfo = () => (
    <Card sx={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      marginBottom: '10%',
      width: '500px',
      height: '200px' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="h6">
            {reservation.listing_info.title}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
            {reservation.user_provider_info && (
                <><b>User Provider:</b> {reservation.user_provider_info.username}</>
            )}
            {reservation.user_receiver_info && (
                <><b>User Receiver:</b> {reservation.user_receiver_info.username}</>
            )}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
          { reservation.reservation.status}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
            {new Date(reservation.reservation.reservation_date).toDateString()}
          </Typography>
        </CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
          {reservation.user_provider_info &&
          reservation.reservation.status !== "closed" && reservation.reservation.status !== "cancelled" && (
            <>
              <Button onClick={handleOnCancellationClick}>
                Cancel Reservation
              </Button>
              <br />
            </>
          )}
          {/* <IconButton aria-label="previous">
            {theme.direction === 'rtl' ? <SkipNextIcon /> : <SkipPreviousIcon />}
          </IconButton>
          <IconButton aria-label="play/pause">
            <PlayArrowIcon sx={{ height: 38, width: 38 }} />
          </IconButton>
          <IconButton aria-label="next">
            {theme.direction === 'rtl' ? <SkipPreviousIcon /> : <SkipNextIcon />}
          </IconButton> */}
        </Box>
      </Box>
      <CardMedia
        component="img"
        sx={{ width: 151 }}
        image="https://source.unsplash.com/random?activity"
        alt="Reservation"
      />
    </Card>
  );

  return <div className="reservation">{reservationInfo()}</div>
}


// const reservationInfo = () => (
//   <>
//     {/* <p>ID: {reservation.reservation.id}</p> */}
//     <p>
//       <b>Listing:</b> {reservation.listing_info.title}
//     </p>
//     <Avatar
//       alt="reservation"
//       src="https://source.unsplash.com/random?activity"
//       sx={{ width: 56*4, height: 56*4 }} />
    
//     {reservation.user_provider_info && (
//       <p>
//         <b>User Provider:</b> {reservation.user_provider_info.username}
//       </p>
//     )}
//     {reservation.user_receiver_info && (
//       <p>
//         <b>User Receiver:</b> {reservation.user_receiver_info.username}
//       </p>
//     )}
//     <p>
//       <b>Status:</b> {reservation.reservation.status}
//     </p>
//     <p>
//       <b>Reservation Date:</b>{" "}
//       {new Date(reservation.reservation.reservation_date).toDateString()}
//     </p>
//     {reservation.user_provider_info &&
//       reservation.reservation.status !== "closed" && reservation.reservation.status !== "cancelled" && (
//         <>
//           <Button onClick={handleOnCancellationClick}>
//             Cancel Reservation
//           </Button>
//           <br />
//         </>
//       )}
//   </>
// )