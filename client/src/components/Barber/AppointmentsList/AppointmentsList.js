import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import IconButton from '@material-ui/core/IconButton';
import { getSundays, makeDate } from '../../../time';
import { getCookie } from '../../../cookies';
import axios from 'axios';
import Row from './Row/Row';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(4),
    boxSizing: 'border-box',
  },
  navigationButtons: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: theme.spacing(2),
  },
  tableContainer: {
    overflowX: 'auto',
    marginTop: theme.spacing(2),
  },
  tableHeaderCell: {
    fontWeight: 'bold',
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  button: {
    margin: theme.spacing(1),
  },
}));

const AppointmentsList = () => {
  const classes = useStyles();
  const [thisSunday, setThisSunday] = useState('this');
  const [lastSunday, setLastSunday] = useState('last');
  const [weekstart, setWeekstart] = useState('');
  const [weekend, setWeekend] = useState('');
  const [appointments, setAppointments] = useState([]);
  const [barberID, setBarberID] = useState('');
  const [offset, setOffset] = useState(0);

  function parseDate(dateString) {
    const [day, month, year] = dateString.split('/');
    return new Date(year, month - 1, day);
  }

  function dateToString(date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  function addDays(date, days) {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  useEffect(() => {
    setBarberID(getCookie('id'));
  }, []);

  useEffect(() => {
    let sundays = getSundays();
    let week = getSundays(); // return {sunday: TimeInMS, nextSunday: TimeInMS}
    let weekinms = 1000 * 60 * 60 * 24 * 7;
    setThisSunday(makeDate(sundays.sunday));
    setLastSunday(makeDate(sundays.nextSunday));
    setWeekstart(makeDate(week.sunday + offset));
    setWeekend(makeDate(week.nextSunday + offset));

    axios
      .get(`http://localhost:5000/getappointments?barberID=${barberID}&status=Accepté`)
      .then((response) => {
        let { error } = response.data;
        if (error) {
          console.log(error);
        } else {
          let newAppointments = response.data.filter((obj) => {
            if (
              obj.timeInMS > week.sunday + offset &&
              obj.timeInMS < week.nextSunday + offset &&
              obj.barberID === barberID
            )
              return true;
            else return false;
          });
          setAppointments(newAppointments);
        }
      });
  }, [barberID, offset]);

  const handleNext = () => {
    setOffset(offset + 1000 * 60 * 60 * 24 * 7);
  };

  const handlePrevious = () => {
    setOffset(offset - 1000 * 60 * 60 * 24 * 7);
  };

  return (
    <div className={classes.container}>
      <Typography variant="h4" align="center">
        Calendrier
      </Typography>
      <div className={classes.navigationButtons}>
        <Button
          variant="contained"
          color="primary"
          onClick={handlePrevious}
          disabled={offset === 0}
          startIcon={<ArrowBackIcon />}
          className={classes.button}
        >
          Semaine Précédente
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleNext}
          disabled={offset === 604800 * 4000}
          endIcon={<ArrowForwardIcon />}
          className={classes.button}
        >
          Semaine Suivante
        </Button>
      </div>

      <Typography variant="h6" align="center">
        Les rendez-vous sont entre le {`${weekstart} et le ${weekend}`}
      </Typography>

      <Paper className={classes.tableContainer}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell className={classes.tableHeaderCell}></TableCell>
              <TableCell className={classes.tableHeaderCell}>
                Dimanche<br />{dateToString(parseDate(weekstart))}
              </TableCell>
              <TableCell className={classes.tableHeaderCell}>
                Lundi<br />{dateToString(addDays(parseDate(weekstart), 1))}
              </TableCell>
              <TableCell className={classes.tableHeaderCell}>
                Mardi<br />{dateToString(addDays(parseDate(weekstart), 2))}
              </TableCell>
              <TableCell className={classes.tableHeaderCell}>
                Mercredi<br />{dateToString(addDays(parseDate(weekstart), 3))}
              </TableCell>
              <TableCell className={classes.tableHeaderCell}>
                Jeudi<br />{dateToString(addDays(parseDate(weekstart), 4))}
              </TableCell>
              <TableCell className={classes.tableHeaderCell}>
                Vendredi<br />{dateToString(addDays(parseDate(weekstart), 5))}
              </TableCell>
              <TableCell className={classes.tableHeaderCell}>
                Samedi<br />{dateToString(addDays(parseDate(weekstart), 6))}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {['09:00', '09:45', '10:30', '11:15', '12:00', '12:45', '13:30', '14:15', '15:00', '15:45', '16:30', '17:15', '18:00', '18:45', '19:30', '20:15', '21:00'].map((time) => (
              <Row key={time} appointments={appointments.filter((obj) => obj.time === time)} time={time} />
            ))}
          </TableBody>
        </Table>
      </Paper>
    </div>
  );
};

export default AppointmentsList;
