import React, { useEffect, useState } from 'react';
import { Grid, TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@material-ui/core';
import axios from 'axios';
import { getCookie } from '../../../cookies';
import ServiceRow from './ServiceRow';
import { makeStyles } from '@material-ui/core/styles';
import { Toaster , toast } from 'react-hot-toast';

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(3),
    marginTop: theme.spacing(4),
  },
  form: {
    marginBottom: theme.spacing(4),
  },
  button: {
    marginTop: theme.spacing(2),
  },
  tableHeader: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
}));

const ServiceList = () => {
  const classes = useStyles();
  const [services, setServices] = useState([]);
  const [barberID, setBarberID] = useState('');
  const [newService, setNewService] = useState({
    name: '',
    description: '',
    price: '',
    duration: '',
  });

  useEffect(() => {
    setBarberID(getCookie('id'));
    console.log('upload user profile');
  }, []);

  useEffect(() => {
    console.log('services list rendered');
    if (barberID) {
      axios.get(`http://localhost:5000/getservices2?barberID=${barberID}`).then((response) => {
        const { error } = response.data;
        if (error) {
          console.log(error);
        } else {
          setServices(response.data);
        }
      });
    }
  }, [barberID]);

  const addService = async () => {
    const { name, description, price, duration } = newService;
    if (!name || !description || !price || !duration) {
      return toast.error('Veuillez remplir tous les détails du service');
    }

    try {
      const response = await axios.post('http://localhost:5000/addservice', {
        barberID,
        ...newService,
      });
      const newServiceData = response.data;
      setServices((prevServices) => [...prevServices, newServiceData]);
      setNewService({
        name: '',
        description: '',
        price: '',
        duration: '',
      });
      window.location.reload()
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewService((prevService) => ({ ...prevService, [name]: value }));
  };

  const deleteService = async (serviceID) => {
    try {
      await axios.delete(`http://localhost:5000/deleteservice/${serviceID}`);
      setServices((prevServices) => prevServices.filter((service) => service._id !== serviceID));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <><Toaster
    position="top-center"
    reverseOrder={false}
  />
    <Grid container direction="column" className={classes.container}>
    <Typography variant="h4" align="center">
        Services
      </Typography>
      <h2>Ajouter Service:</h2>
      <Grid item className={classes.form}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Nom du Service"
              fullWidth
              name="name"
              value={newService.name}
              onChange={handleInputChange}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Description"
              fullWidth
              name="description"
              value={newService.description}
              onChange={handleInputChange}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Prix (DT)"
              type="number"
              fullWidth
              name="price"
              value={newService.price}
              onChange={handleInputChange}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Durée (minutes)"
              type="number"
              fullWidth
              name="duration"
              value={newService.duration}
              onChange={handleInputChange}
              variant="outlined"
            />
          </Grid>
        </Grid>
        <Button
          variant="contained"
          color="primary"
          onClick={addService}
          className={classes.button}
        >
          Ajouter Service
        </Button>
      </Grid>

      <h2>Liste de Services:</h2>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className={classes.tableHeader}>Nom</TableCell>
              <TableCell className={classes.tableHeader}>Description</TableCell>
              <TableCell className={classes.tableHeader}>Prix</TableCell>
              <TableCell className={classes.tableHeader}>Durée</TableCell>
              <TableCell className={classes.tableHeader}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {services.map((service) => (
              <ServiceRow
                key={service._id}
                service={service}
                deleteService={deleteService}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Grid></>
  );
};

export default ServiceList;
