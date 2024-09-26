import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableData from '../TableData/TableData';

const useStyles = makeStyles((theme) => ({
  leftHeaderCell: {
    fontWeight: 'bold',
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.common.white,
    textAlign: 'center',
    padding: theme.spacing(1),
  },
  dataCell: {
    padding: theme.spacing(1),
    textAlign: 'center',
    verticalAlign: 'middle',
    minWidth: 100,
  },
}));

const Row = ({ appointments, time }) => {
  const classes = useStyles();

  return (
    <TableRow>
      {/* Time Cell */}
      <TableCell className={classes.leftHeaderCell}>{time}</TableCell>
      
      {/* Table Data for Each Day */}
      {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
        <TableCell key={day} className={classes.dataCell}>
          <TableData
            appointments={appointments.filter((obj) => obj.day === day)}
            time={time}
            day={day}
          />
        </TableCell>
      ))}
    </TableRow>
  );
};

export default Row;
