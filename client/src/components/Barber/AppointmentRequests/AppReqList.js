import React, { useEffect, useState, useCallback } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, CircularProgress } from '@material-ui/core';
import axios from 'axios';
import AppReqRow from './AppReqRow';
import { getCookie } from '../../../cookies';

const AppReqList = () => {
  const [appReq, setAppReq] = useState([]);
  const [barberID, setBarberID] = useState('');
  const [update, setUpdate] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setBarberID(getCookie('id'));
  }, []);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5000/getappointmentreq?barberID=${barberID}`)
      .then((response) => {
        let { error } = response.data;
        if (error) {
          console.log(error);
        } else {
          const pendingAppointments = response.data.filter((appointment) => appointment.status === 'En attente');
          setAppReq(pendingAppointments);
        }
      })
      .finally(() => setLoading(false));
  }, [barberID, update]);

  const handleUpdate = useCallback((updatedAppointments) => {
    setAppReq(updatedAppointments);
  }, []);

  return (
    <div>
      <br/><br/>
      <Typography variant="h4" gutterBottom>
      Demandes de rendez-vous
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Client</TableCell>
                <TableCell>Date et heure</TableCell>
                <TableCell>Service</TableCell>
                <TableCell>Prix</TableCell>
                <TableCell>Durée moyenne</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {appReq.map((req) => (
                <AppReqRow
                  key={req._id}
                  req={req}
                  handleUpdate={(updatedReq) => {
                    const updatedAppointments = appReq.map((appointment) =>
                      appointment._id === updatedReq._id ? updatedReq : appointment
                    );
                    handleUpdate(updatedAppointments);
                  }}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};

export default AppReqList;
