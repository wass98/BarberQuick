import React from 'react';
import { useEffect, useState } from 'react';
import { makeStyles, Card, CardContent, Typography, Grid } from '@material-ui/core';
import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import { getCookie } from '../../../cookies';
import axios from 'axios';
import { ArrowUpward, ArrowDownward, AttachMoney, Event, People, Star } from '@material-ui/icons';

// Custom Styles
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: '#f0f2f5',
    padding: theme.spacing(3),
  },
  card: {
    backgroundColor: '#fff',
    margin: theme.spacing(2),
    height: '100%',
    borderLeft: `5px solid ${theme.palette.primary.main}`,
    transition: '0.3s',
    '&:hover': {
      transform: 'scale(1.05)',
      boxShadow: theme.shadows[6],
    },
  },
  cardTitle: {
    fontSize: 14,
    display: 'flex',
    alignItems: 'center',
  },
  statNumber: {
    fontWeight: 'bold',
    fontSize: 24,
  },
  icon: {
    marginRight: theme.spacing(1),
  },
  changePositive: {
    color: theme.palette.success.main,
    display: 'flex',
    alignItems: 'center',
  },
  changeNegative: {
    color: theme.palette.error.main,
    display: 'flex',
    alignItems: 'center',
  },
  fullHeightCard: {
    height: '100%', // Ensures the larger card takes full height
  },
}));

const theme = createTheme({
  palette: {
    type: 'light',
    primary: { main: '#3f51b5' },
    secondary: { main: '#f50057' },
    success: { main: '#4caf50' },
    error: { main: '#f44336' },
  },
});

const StatCard = ({ title, value, change, icon }) => {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography className={classes.cardTitle} color="textSecondary">
          <span className={classes.icon}>{icon}</span>
          {title}
        </Typography>
        <Typography className={classes.statNumber}>{value}</Typography>
        <Typography
          className={change > 0 ? classes.changePositive : classes.changeNegative}
        >
          {change > 0 ? <ArrowUpward /> : <ArrowDownward />}
          {change > 0 ? `+${change}` : `${change}`} aujourd'hui
        </Typography>
      </CardContent>
    </Card>
  );
};

const Dashboard = () => {
  const classes = useStyles();
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalAppointments, setTotalAppointments] = useState(0);
  const [totalClients, setTotalClients] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);
  const barberID = getCookie('id');

  useEffect(() => {
    const fetchRevenue = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/revenue?barberID=${barberID}`);
        setTotalRevenue(response.data.totalRevenue);
      } catch (error) {
        console.error('Error fetching total revenue:', error);
      }
    };

    const fetchAppointments = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/appointments/count?barberID=${barberID}`);
        setTotalAppointments(response.data.totalAppointments);
      } catch (error) {
        console.error('Error fetching total appointments:', error);
      }
    };

    const fetchClients = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/clients/count?barberID=${barberID}`);
        setTotalClients(response.data.totalClients);
      } catch (error) {
        console.error('Error fetching total clients:', error);
      }
    };

    const fetchReviews = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/reviews/count?barberID=${barberID}`);
        setTotalReviews(response.data.totalReviews);
      } catch (error) {
        console.error('Error fetching total reviews:', error);
      }
    };

    fetchRevenue();
    fetchAppointments();
    fetchClients();
    fetchReviews();
  }, [barberID]);

  return (
    <ThemeProvider theme={theme}>
      <Typography variant="h4" align="center">
        Tableau de bord
      </Typography>
      <div className={classes.root}>
        <Grid container spacing={3}>
          {/* Left column with StatCards in a 2x2 grid for medium screens and above, single column for smaller screens */}
          <Grid item xs={12} md={6}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <StatCard title="Revenu total" value={`${totalRevenue} DT`} change={0} icon={<AttachMoney />} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <StatCard title="Total des rendez-vous" value={totalAppointments} change={0} icon={<Event />} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <StatCard title="Total de clients" value={totalClients} change={0} icon={<People />} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <StatCard title="Total des avis" value={totalReviews} change={0} icon={<Star />} />
              </Grid>
            </Grid>
          </Grid>

          {/* Right column with the Revenue card */}
          <Grid item xs={12} md={6}>
            <Card className={`${classes.card} ${classes.fullHeightCard}`}>
              <CardContent>
                <Typography variant="h6">Meilleurs clients:</Typography>
                {/* List of three best clients */}
                <Typography></Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    </ThemeProvider>
  );
};

export default Dashboard;
