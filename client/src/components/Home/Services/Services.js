import React from 'react';
import { Container, Grid, Typography, Box, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import logo from '../../../assets/logo.png'; 
import hair_cut from '../../../assets/hair_cut.jpg'; 
import beardShave from '../../../assets/beard_shave.jpg'; 
import pic3 from '../../../assets/pic3.jpg';

const useStyles = makeStyles((theme) => ({
    services: {
        backgroundColor: '#f4f4f4',
        paddingTop: theme.spacing(10),
        paddingBottom: theme.spacing(10),
    },
    logo: {
        height: 120,
        width: 120,
        marginBottom: theme.spacing(3),
    },
    title: {
        color: '#333',
        fontWeight: 700,
        marginBottom: theme.spacing(4),
    },
    description: {
        color: '#666',
        fontSize: '1.2rem',
        marginBottom: theme.spacing(2),
        maxWidth: '800px',
        margin: 'auto',
        lineHeight: 1.6,
    },
    gridContainer: {
        marginTop: theme.spacing(6),
    },
    serviceBox: {
        textAlign: 'center',
        padding: theme.spacing(3),
        backgroundColor: 'white',
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
        borderRadius: '12px',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        '&:hover': {
            transform: 'scale(1.05)',
            boxShadow: '0 8px 30px rgba(0, 0, 0, 0.15)',
        },
    },
    serviceImg: {
        borderRadius: '50%',
        height: 200,
        width: 200,
        transition: 'all 0.3s ease',
        marginBottom: theme.spacing(3),
        '&:hover': {
            transform: 'scale(1.1)',
        },
    },
    serviceTitle: {
        color: '#333',
        fontWeight: 600,
        marginBottom: theme.spacing(1),
    },
    serviceDescription: {
        color: '#666',
        fontSize: '1rem',
        lineHeight: 1.5,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));

const Services = () => {
    const classes = useStyles();

    return (
        <div className={classes.services} id="what-we-do">
            <Container>
                {/* Top Section with Logo and Description */}
                <Box textAlign="center">
                    <img
                        src={logo}
                        alt="App Logo"
                        className={classes.logo}
                    />
                    <Typography variant="h4" className={classes.title}>
                        Connect. Book. Get Styled.
                    </Typography>
                    <Typography variant="body1" className={classes.description}>
                        Welcome to the future of barber-client interactions. Our platform connects top barbers with clients seamlessly, offering an intuitive booking experience. Get styled without hassle, at your convenience!
                    </Typography>
                </Box>

                {/* Grid for Services */}
                <Grid container spacing={6} className={classes.gridContainer} justify="center">

                    {/* Service 1 */}
                    <Grid item xs={12} sm={6} md={4}>
                        <Paper className={classes.serviceBox}>
                            <img
                                src={hair_cut}
                                alt="Find a Barber"
                                className={classes.serviceImg}
                            />
                            <Typography variant="h5" className={classes.serviceTitle}>
                                Professional Barbers
                            </Typography>
                            <Typography variant="body1" className={classes.serviceDescription}>
                                Find highly skilled barbers in your area with verified reviews and profiles. Look sharp, feel sharper.
                            </Typography>
                        </Paper>
                    </Grid>

                    {/* Service 2 */}
                    <Grid item xs={12} sm={6} md={4}>
                        <Paper className={classes.serviceBox}>
                            <img
                                src={beardShave}
                                alt="Seamless Booking"
                                className={classes.serviceImg}
                            />
                            <Typography variant="h5" className={classes.serviceTitle}>
                                Quick Bookings
                            </Typography>
                            <Typography variant="body1" className={classes.serviceDescription}>
                                No more waiting. Book an appointment in seconds with just a few taps and get styled at your convenience.
                            </Typography>
                        </Paper>
                    </Grid>

                    {/* Service 3 */}
                    <Grid item xs={12} sm={6} md={4}>
                        <Paper className={classes.serviceBox}>
                            <img
                                src={pic3}
                                alt="Easy Connect"
                                className={classes.serviceImg}
                            />
                            <Typography variant="h5" className={classes.serviceTitle}>
                                Easy Connections
                            </Typography>
                            <Typography variant="body1" className={classes.serviceDescription}>
                                Connect with your favorite barbers, schedule regular appointments, and always stay in style.
                            </Typography>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
};

export default Services;
