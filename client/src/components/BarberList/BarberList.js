import React, { useState, useEffect } from 'react';
import { Drawer, FormControl, InputLabel, Select, MenuItem, Grid, IconButton, Hidden, TextField, Typography } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import axios from 'axios';
import Navbar from '../Home/Navbar/Navbar';
import BarberCard from './BarberCard';
import useStyles from './styles';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const BarberList = () => {
    const classes = useStyles();
    const [barbers, setBarbers] = useState([]);
    const [filteredBarbers, setFilteredBarbers] = useState([]);
    const [states, setStates] = useState([]);
    const [selectedState, setSelectedState] = useState('');
    const [searchTerm, setSearchTerm] = useState(''); // New state for search term
    const [mobileOpen, setMobileOpen] = useState(false);

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Check if screen size is mobile

    useEffect(() => {
        axios.get('http://localhost:5000/getbarbers').then((response) => {
            const { error, data } = response;
            if (error) {
                console.log(error);
            } else {
                setBarbers(data);
                setFilteredBarbers(data);
                const uniqueStates = [...new Set(data.map(barber => barber.state))];
                setStates(uniqueStates);
            }
        });
    }, []);

    // Function to filter barbers based on state and search term
    const filterBarbers = (barbers, state, term) => {
        return barbers.filter(barber => {
            const matchesState = state === '' || barber.state === state;
            const matchesTerm = 
                (barber.fname ? barber.fname.toLowerCase().includes(term.toLowerCase()) : false) ||
                (barber.lname ? barber.lname.toLowerCase().includes(term.toLowerCase()) : false) || 
                (barber.sname ? barber.sname.toLowerCase().includes(term.toLowerCase()) : false);
            return matchesState && matchesTerm;
        });
    };
    

    const handleStateChange = (e) => {
        setSelectedState(e.target.value);
        setFilteredBarbers(filterBarbers(barbers, e.target.value, searchTerm));
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setFilteredBarbers(filterBarbers(barbers, selectedState, e.target.value));
    };

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <div>
            <FormControl fullWidth className={classes.formControl}>
                <center><Typography variant='h5' style={{fontWeight: 'bold' }}>Filtre</Typography></center><br/><br/>
                <Typography>Filtrer par gouvernorat</Typography>
                <Select value={selectedState} onChange={handleStateChange}>
                    <MenuItem value=''><em>Tous</em></MenuItem>
                    {states.map((state) => <MenuItem key={state} value={state}>{state}</MenuItem>)}
                </Select>
            </FormControl>
            <TextField
                className={classes.searchInput}
                label="Rechercher"
                variant="outlined"
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="Chercher par nom ou salon"
            />
        </div>
    );

    return (
        <>
            <Navbar />
            <div className={classes.root}>
                {/* Drawer for Desktop */}
                <Hidden xsDown implementation="css">
                    <Drawer
                        variant="permanent"
                        className={classes.drawer}
                        classes={{ paper: classes.drawerPaper }}
                        open
                    >
                        {drawer}
                    </Drawer>
                </Hidden>

                {/* Drawer for Mobile */}
                <Hidden smUp>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        onClick={handleDrawerToggle}
                        className={classes.menuButton}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Drawer
                        variant="temporary"
                        anchor="left"
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        classes={{ paper: classes.drawerPaper }}
                        ModalProps={{ keepMounted: true }} // Better performance on mobile
                    >
                        {drawer}
                    </Drawer>
                </Hidden>

                {/* Main Content */}
                <main className={classes.content}>
                    <Grid container spacing={3}>
                        {filteredBarbers.map(barber => (
                            <Grid item xs={12} sm={6} md={4} key={barber._id}>
                                <BarberCard barber={barber} />
                            </Grid>
                        ))}
                    </Grid>
                </main>
            </div>
        </>
    );
};

export default BarberList;
