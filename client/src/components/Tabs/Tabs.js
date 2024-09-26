import React, { useState } from 'react';
import {
  Drawer, List, ListItem, ListItemIcon, ListItemText, CssBaseline, Typography, IconButton, useMediaQuery, useTheme,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu'; // Hamburger menu icon
import DashboardIcon from '@material-ui/icons/Dashboard';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import RoomServiceIcon from '@material-ui/icons/RoomService';
import PagesIcon from '@material-ui/icons/Description';

import ServiceList from '../Barber/Services/ServiceList';
import AppointmentsList from '../Barber/AppointmentsList/AppointmentsList';
import AppReqList from '../Barber/AppointmentRequests/AppReqList';
import Dashboard from '../Barber/Dashboard/Dashboard';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    width: '100%',
    backgroundColor: '#f4f6f8', // Light background color for the entire component
    minHeight: '100vh', // Ensure it takes full viewport height
  },
  menuButton: {
    margin: theme.spacing(2),
    color: 'black',
    position: 'absolute',
    top: 60,
    left: 20,
    zIndex: 1,
  },
  drawer: {
    width: 240,
    flexShrink: 0,
  },
  drawerPaper: {
    width: 240,
    backgroundColor: '#18202c', // Custom background color for the drawer
    color: '#ffffff',
    marginTop: 60,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    marginLeft: 240, // Default for desktop, adjust if drawer is open
    transition: 'margin 0.3s',
    height: '100%',
    backgroundColor: '#e0e3e5', // Light grey background for the content area
  },
  toolbar: theme.mixins.toolbar,
  listItem: {
    '&:hover': {
      backgroundColor: '#303f9f', // Hover effect for menu items
    },
  },
  activeItem: {
    backgroundColor: '#3949ab', // Color for the selected item
  },
}));

function CPanel() {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [activeIndex, setActiveIndex] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);

  // List of items for sidenav with corresponding components
  const sections = [
    { text: 'Tableau de Bord', icon: <DashboardIcon />, component: <Dashboard /> },
    { text: 'Calendrier', icon: <CalendarTodayIcon />, component: <AppointmentsList /> },
    { text: 'Demandes de rendez-vous', icon: <RoomServiceIcon />, component: <AppReqList /> },
    { text: 'Services', icon: <PagesIcon />, component: <ServiceList /> },
  ];

  // Handle drawer toggle
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // Drawer content
  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <List>
        {sections.map((section, index) => (
          <ListItem
            button
            key={section.text}
            className={`${classes.listItem} ${activeIndex === index ? classes.activeItem : ''}`}
            onClick={() => {
              setActiveIndex(index);
              if (isMobile) setMobileOpen(false); // Close drawer on item click for mobile
            }}
          >
            <ListItemIcon style={{ color: '#ffffff' }}>{section.icon}</ListItemIcon>
            <ListItemText primary={section.text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <div className={classes.root}>
      <CssBaseline />

      {/* Hamburger Menu Icon (only in mobile version) */}
      {isMobile && (
        <IconButton
          className={classes.menuButton}
          onClick={handleDrawerToggle}
        >
          <MenuIcon />
        </IconButton>
      )}

      {/* Side Navigation (Drawer) */}
      <Drawer
        variant={isMobile ? "temporary" : "permanent"}
        open={isMobile ? mobileOpen : true}
        onClose={isMobile ? handleDrawerToggle : undefined}
        classes={{
          paper: classes.drawerPaper,
        }}
        ModalProps={{
          keepMounted: true,
        }}
      >
        {drawer}
      </Drawer>

      {/* Main Content - Render content based on the active index */}
      <main
        className={classes.content}
        style={{
          marginLeft: isMobile ? 0 : 240,
          width: isMobile ? '100%' : `calc(100% - 240px)`,
        }}
      >
        <div className={classes.toolbar} />
        <div>
          {sections[activeIndex].component}
        </div>
      </main>
    </div>
  );
}

export default CPanel;
