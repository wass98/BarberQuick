import React, { useEffect, useState } from 'react';
import {
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  IconButton,
  Typography,
  InputBase,
  Toolbar,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from '@material-ui/core';
import { getCookie } from '../../cookies';
import { Search, Delete, Visibility } from '@material-ui/icons';
import useStyles from './UserAppointmentStyles';
import Navbar from '../Home/Navbar/Navbar';
import axios from 'axios';
import { Link } from 'react-router-dom';

const UserAppointment = () => {
  const classes = useStyles();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedAppointmentId, setSelectedAppointmentId] = useState(null);
  const [openFeedbackModal, setOpenFeedbackModal] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [note, setNote] = useState(5); // Default note value
  const [selectedAppointmentDetails, setSelectedAppointmentDetails] = useState(null);
  const [openDetailsModal, setOpenDetailsModal] = useState(false);
  const [submittedFeedback, setSubmittedFeedback] = useState({});

  const userID = getCookie('id');

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get('http://localhost:5000/userappointment', {
          params: { id: userID }
        });

        if (Array.isArray(response.data)) {
          setAppointments(response.data);
        } else if (response.data && typeof response.data === 'object') {
          setAppointments([response.data]);
        } else {
          setError('Invalid data format from the server');
        }
      } catch (err) {
        console.error("Axios Error:", err.response ? err.response.data : err.message);
        setError('Failed to fetch appointments.');
      } finally {
        setLoading(false);
      }
    };
    fetchAppointments();
  }, [userID]);

  const handleOpenDetailsModal = (appointment) => {
    setSelectedAppointmentDetails(appointment);
    setOpenDetailsModal(true);
  };
  
  const handleCloseDetailsModal = () => {
    setOpenDetailsModal(false);
    setSelectedAppointmentDetails(null);
  };
  

  const handleClickOpen = (appointmentId) => {
    setSelectedAppointmentId(appointmentId);
    setOpenDialog(true);
  };
  
  const handleClose = () => {
    setOpenDialog(false);
    setSelectedAppointmentId(null);
  };

  const handleDelete = async () => {
    if (!selectedAppointmentId) {
      console.error('Appointment ID is undefined');
      return;
    }

    try {
      await axios.delete(`http://localhost:5000/userappointmentdel/${selectedAppointmentId}`);
      setAppointments((prevAppointments) =>
        prevAppointments.filter((appointment) => appointment._id !== selectedAppointmentId)
      );
      handleClose(); // Close the dialog after deletion
      window.location.reload();
    } catch (err) {
      console.error('Failed to delete appointment:', err.response ? err.response.data : err.message);
    }
  };

  const handleOpenFeedbackModal = (appointmentId) => {
    setSelectedAppointmentId(appointmentId); // Set the selected appointment ID
    setOpenFeedbackModal(true);
  };
  

  const handleCloseFeedbackModal = () => {
    setOpenFeedbackModal(false);
    setFeedback('');
    setNote(5); // Reset to default
  };

  const handleSubmitFeedback = async () => {
    try {
      // Make the API call to submit the feedback
      const response = await axios.put(
        `http://localhost:5000/userappointment/feedback/${selectedAppointmentId}`,
        { note, feedback }
      );
  
      // Mark the feedback as submitted for the specific appointment
      setSubmittedFeedback((prev) => ({
        ...prev,
        [selectedAppointmentId]: true, // Use the appointment ID to track submission status
      }));
  
      handleCloseFeedbackModal();
      window.location.reload();
    } catch (err) {
      console.error('Failed to submit feedback:', err.response ? err.response.data : err.message);
    }
  };
  
  

  

  if (loading) {
    return <Typography variant="h6">Loading...</Typography>;
  }

  if (error) {
    return <Typography variant="h6" color="error">{error}</Typography>;
  }

  return (
    <>
      <Navbar />
      <div className={classes.root}>
        <Container className={classes.cardContainer} style={{ marginTop: '60px' }}>
          <Typography variant="h4" gutterBottom>
            Réservations
          </Typography>
          <Toolbar className={classes.searchContainer}>
            <div className={classes.search}>
              <Search />
              <InputBase placeholder="Rechercher..." inputProps={{ 'aria-label': 'search' }} />
            </div>
            <Link to="/barberlist">
              <Button variant="contained" className={classes.addButton}>
                + Réservez
              </Button>
            </Link>
          </Toolbar>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="appointments table">
              <TableHead>
                <TableRow>
                  <TableCell className={classes.tableHeader}>Coiffeur</TableCell>
                  <TableCell className={classes.tableHeader}>Salon</TableCell>
                  <TableCell className={classes.tableHeader}>Mobile</TableCell>
                  <TableCell className={classes.tableHeader}>Date et Heure</TableCell>
                  <TableCell className={classes.tableHeader}>Status</TableCell>
                  <TableCell className={classes.tableHeader}>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {appointments.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell>{row.bname}</TableCell>
                    <TableCell>{row.sname}</TableCell>
                    <TableCell>{row.bphone}</TableCell>
                    <TableCell>{`${row.date} à ${row.time}`}</TableCell>
                    <TableCell>
                      <Button
                        variant="outlined"
                        className={classes.statusButton}
                        style={{
                          borderColor:
                            row.status === 'Refusé'
                              ? '#f44336'
                              : row.status === 'Expiré'
                              ? '#f44336'
                              : row.status === 'Accepté'
                              ? '#4CAF50'
                              : row.status === 'En attente'
                              ? '#FFC107'
                              : row.status === 'Terminé'
                              ? '#A66302'
                              : '#4CAF50',
                          color:
                            row.status === 'Refusé'
                              ? '#f44336'
                              : row.status === 'Expiré'
                              ? '#f44336'
                              : row.status === 'Accepté'
                              ? '#4CAF50'
                              : row.status === 'En attente'
                              ? '#FFC107'
                              : row.status === 'Terminé'
                              ? '#A66302'
                              : '#4CAF50',
                        }}
                      >
                        {row.status}
                      </Button>
                    </TableCell>
                    <TableCell className={classes.actionButtons}>
                    <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={() => handleOpenFeedbackModal(row.id)}
                    disabled={row.status !== 'Terminé' || !!row.evaluation.note || !!row.evaluation.feedback} 
                    >
                    {row.evaluation.note || row.evaluation.feedback ? 'Évalué' : 'Évaluer'}
                    </Button>


                      {row.status === 'En attente' && (
                        <IconButton color="secondary" onClick={() => handleClickOpen(row.id)}>
                          <Delete />
                        </IconButton>
                      )}
                        <IconButton onClick={() => handleOpenDetailsModal(row)}>
                            <Visibility />
                        </IconButton>

                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDialog} onClose={handleClose}>
        <DialogTitle>Confirmer la suppression</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Êtes-vous sûr de vouloir supprimer cette réservation ? Cette action est irréversible.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Annuler
          </Button>
          <Button onClick={handleDelete} color="secondary">
            Supprimer
          </Button>
        </DialogActions>
      </Dialog>

      {/* Feedback Modal */}
      <Dialog open={openFeedbackModal} onClose={handleCloseFeedbackModal}>
        <DialogTitle>Évaluer la réservation</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Donnez votre avis sur cette réservation.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Feedback"
            type="text"
            fullWidth
            multiline
            rows={4}
            value={feedback}
            variant='outlined'
            onChange={(e) => setFeedback(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Note (1 à 10)"
            type="range"
            inputProps={{ min: 1, max: 10, step: 1 }}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            style={{ width: '100%' }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseFeedbackModal} color="primary">
            Annuler
          </Button>
          <Button onClick={handleSubmitFeedback} color="secondary">
            Soumettre
          </Button>
        </DialogActions>
      </Dialog>
        {/* Appointment Details Modal */}
                <Dialog open={openDetailsModal} onClose={handleCloseDetailsModal} maxWidth="sm" fullWidth>
                <DialogTitle>Détails de la réservation</DialogTitle>
                <DialogContent>
                    {selectedAppointmentDetails && (
                    <div style={{ padding: '16px' }}>
                        <Typography variant="h6" gutterBottom>
                        Informations sur la réservation
                        </Typography>
                        <Typography variant="body1"><strong>Coiffeur:</strong> {selectedAppointmentDetails.bname}</Typography>
                        <Typography variant="body1"><strong>Salon:</strong> {selectedAppointmentDetails.sname}</Typography>
                        <Typography variant="body1"><strong>Mobile:</strong> {selectedAppointmentDetails.bphone}</Typography>
                        <Typography variant="body1"><strong>Services:</strong> {selectedAppointmentDetails.service}</Typography>
                        <Typography variant="body1"><strong>Prix:</strong> {selectedAppointmentDetails.price} DT</Typography>
                        <Typography variant="body1"><strong>Durée estimée:</strong> {selectedAppointmentDetails.avgTime} minutes</Typography>
                        {/* Add more details as needed */}
                    </div>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDetailsModal} color="primary">
                    Fermer
                    </Button>
                </DialogActions>
                </Dialog>


    </>
  );
};

export default UserAppointment;
