import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
  Grid,
  IconButton,
} from '@material-ui/core';
import { Close as CloseIcon } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { Toaster , toast } from 'react-hot-toast';

// Custom styles for the buttons
const useStyles = makeStyles((theme) => ({
  terminéButton: {
    backgroundColor: '#FFA500', // Orange color
    color: '#fff',
    '&:hover': {
      backgroundColor: '#FF8C00', // Darker orange on hover
    },
  },
  signalerButton: {
    backgroundColor: '#f44336', // Red color
    color: '#fff',
    '&:hover': {
      backgroundColor: '#d32f2f', // Darker red on hover
    },
  },
}));

const Modal = ({ appointment, onClose, onAppointmentUpdate }) => {
  const classes = useStyles(); // Access to custom styles

  const handleTerminéClick = async () => {
    try {
      await axios.put(`http://localhost:5000/status/${appointment._id}`);
  
        toast.success("Mis à jours avec succées!")
        setTimeout(()=>{
        onClose();
        window.location.reload()
      },2000)
    } catch (error) {
      console.error('Error updating appointment status:', error);
      // Handle error appropriately (e.g., show a toast notification)
    }
  };
  
  const handleSignalerClick = async () => {
    try {
      await axios.put(`http://localhost:5000/report/${appointment.userID}`);
  
      setTimeout(()=>{
        toast.success("Signalée avec succées!")
        onClose();
        window.location.reload()
      },2000)
    } catch (error) {
      console.error('Error updating user report count:', error);
      // Handle error appropriately (e.g., show a toast notification)
    }
  };
  
  return (
    <><Toaster
  position="top-center"
  reverseOrder={false}
/>
    <Dialog open onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle disableTypography>
        <Grid container justifyContent="space-between" alignItems="center">
          <Typography variant="h6">Détails du rendez-vous</Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Grid>
      </DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant="body1">
              <strong>Client:</strong> {appointment.cname}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body1">
              <strong>Mobile:</strong> {appointment.cphone}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body1">
              <strong>Date et Heure:</strong> {appointment.date} à {appointment.time}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body1">
              <strong>Services:</strong> {appointment.service}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body1">
              <strong>Prix:</strong> {appointment.price} DT
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body1">
              <strong>Durée estimée:</strong> {appointment.avgTime} min
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body1">
              <strong>Statut:</strong> {appointment.status}
            </Typography>
          </Grid>
          {/* Add more appointment details here */}
        </Grid>
        
        {/* Centered Action Buttons */}
        
      </DialogContent>
      <DialogActions>
      <Grid container justifyContent="center" spacing={2} style={{ marginTop: 20 }}>
        {appointment.status === "Accepté" && (
          <>
            <Grid item>
              <Button
                className={classes.terminéButton}
                variant="contained"
                onClick={handleTerminéClick}
              >
                Terminé
              </Button>
            </Grid>
            <Grid item>
              <Button
                className={classes.signalerButton}
                variant="contained"
                onClick={handleSignalerClick}
              >
                Signaler
              </Button>
            </Grid>
          </>
        )}
      </Grid>

      </DialogActions>
    </Dialog></>
  );
};

export default Modal;
