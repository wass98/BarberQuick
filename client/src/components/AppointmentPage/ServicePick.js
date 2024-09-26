import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useHistory, useParams } from 'react-router-dom';
import { Grid, Card, CardContent, Checkbox, Typography, Button } from '@material-ui/core';
import { Toaster, toast } from 'react-hot-toast';
import Navbar from '../Home/Navbar/Navbar';
import { makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import BG from '../../assets/appointment_bg.jpg';


const useStyles = makeStyles((theme) => ({
  appointmentContainer: {
    paddingTop: theme.spacing(10),
    minHeight: '100vh',
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.4)), url(${BG})`,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    padding: '0 10px',
    overflow: 'auto',
  },
  appointmentForm: {
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.4), 0 6px 20px 0 rgba(0, 0, 0, 0.4)',
    backgroundColor: 'rgb(255, 255, 255)',
    zIndex: 99,
    padding: theme.spacing(3),
    borderRadius: 10,
    width: '100%',
    maxWidth: '600px',
  },
  buttonContainer: {
    marginTop: theme.spacing(2),
  },
  button: {
    height: '40px',
    width: '100%',
    padding: '5px',
    margin: '10px 0',
    borderRadius: '15px',
    color: 'white',
    transition: 'ease-in-out all 0.3s',
    '&:hover': {
      cursor: 'pointer',
    },
  },
  backButton: {
    backgroundColor: 'rgb(68, 68, 68)',
    '&:hover': {
      backgroundColor: 'rgb(90, 90, 90)',
    },
  },
  nextButton: {
    backgroundColor: 'rgb(98, 156, 196)',
    '&:hover': {
      backgroundColor: 'rgb(141, 177, 201)',
    },
  },
}));



const ServicePick = () => {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));  // Detect mobile screens

  const { barberID } = useParams();
  const [services, setServices] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const history = useHistory();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/getservices2?barberID=${barberID}`)
      .then((response) => {
        const { error } = response.data;
        if (error) {
          console.log(error);
        } else {
          setServices(response.data);
        }
      });
  }, [barberID]);

  const handleServiceSelect = (service) => {
    const isSelected = selectedServices.includes(service);
    if (isSelected) {
      setSelectedServices((prevServices) => prevServices.filter((prevService) => prevService !== service));
    } else {
      setSelectedServices((prevServices) => [...prevServices, service]);
    }
  };

  const handleNextClick = () => {
    if (selectedServices.length === 0) {
      toast.error('Veuillez sélectionner au moins un service.');
      return;
    }

    const selectedServicesData = selectedServices.map((service) => ({
      name: service.name,
      price: service.price,
      duration: service.duration,
    }));

    const dataToSend = {
      barberID,
      services: selectedServicesData,
      totalPrice: selectedServices.reduce((acc, service) => acc + service.price, 0),
      totalDuration: selectedServices.reduce((acc, service) => acc + service.duration, 0),
    };

    history.push('/datepick', dataToSend);
  };

  return (
     <> <Navbar />
    <div className={classes.appointmentContainer}>
      <Toaster position="top-center" reverseOrder={false} />
      <div className={classes.appointmentForm}>
        <Typography variant={isMobile ? "h6" : "h5"} align="center">Choisir le service(s)</Typography>  {/* Adjust title size for mobile */}
        <Grid container spacing={1}>
          {services.map((service) => (
            <Grid item xs={12} sm={6} md={4} key={service._id}>
              <Card className={classes.serviceCard}>
                <CardContent>
                  <Typography variant="h6" style={{fontWeight:'bold'}} className={classes.serviceContent}>{service.name}</Typography>
                  <Typography variant="body2" className={classes.serviceContent}>{service.price} DT</Typography>
                  <Typography variant="body2" className={classes.serviceContent}>{service.duration} Min</Typography>
                  <Checkbox
                    checked={selectedServices.includes(service)}
                    onChange={() => handleServiceSelect(service)}
                    color="primary"
                  />
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        <div className={classes.buttonContainer}>
        <Button
  component={Link}
  to="/barberlist"
  variant="contained"
  className={`${classes.button} ${classes.backButton}`}
>
  Retourner
</Button>
<Button
  onClick={handleNextClick}
  variant="contained"
  className={`${classes.button} ${classes.nextButton}`}
>
  Suivant
</Button>
        </div>
      </div>
    </div>
    </>
  );
};

export default ServicePick;
