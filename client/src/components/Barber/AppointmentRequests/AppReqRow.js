import React from 'react';
import { TableRow, TableCell, Button } from '@material-ui/core';
import axios from 'axios';

const AppReqRow = ({ req, handleUpdate }) => {
  const handleAccept = async () => {
    try {
      const response = await axios.put(`http://localhost:5000/updateappointment`, {
        id: req._id,
        status: 'Accepté',
      });
      handleUpdate({ ...req, status: 'Accepté' });
      window.location.reload()
    } catch (error) {
      console.error(error);
    }
  };

  const handleDecline = async () => {
    try {
      const response = await axios.put(`http://localhost:5000/updateappointment`, {
        id: req._id,
        status: 'Refusé',
      });
      handleUpdate({ ...req, status: 'Refusé' });
      window.location.reload()
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <TableRow>
      <TableCell>{req.cname}</TableCell>
      <TableCell>{` ${req.date} à ${req.time}`}</TableCell>
      <TableCell>{req.service}</TableCell>
      <TableCell>{req.price} DT</TableCell>
      <TableCell>{req.avgTime} minutes</TableCell>
      <TableCell>
        <Button
          onClick={handleAccept}
          variant="contained"
          color="primary"
          style={{ marginRight: '8px' }}
        >
          Accepter
        </Button>
        <Button
          onClick={handleDecline}
          variant="contained"
          color="secondary"
        >
          Refuser
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default AppReqRow;
