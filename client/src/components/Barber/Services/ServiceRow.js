import React from 'react';
import { TableRow, TableCell, IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

const ServiceRow = ({ service, deleteService }) => {
  return (
    <TableRow>
      <TableCell>{service.name}</TableCell>
      <TableCell>{service.description}</TableCell>
      <TableCell>{service.price} DT</TableCell>
      <TableCell>{service.duration} minutes</TableCell>
      <TableCell>
        <IconButton
          aria-label="delete"
          color="secondary"
          onClick={() => deleteService(service._id)}
        >
          <DeleteIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

export default ServiceRow;
