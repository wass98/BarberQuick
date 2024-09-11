import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
// import PhoneIcon from '@material-ui/icons/Phone';
// import PersonPinIcon from '@material-ui/icons/PersonPin';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

// import UserList from '../Admin/UsersList/UsersList'
import ServiceList from '../Barber/Services/ServiceList';
import AppointmentsList from '../Barber/AppointmentsList/AppointmentsList'
import AppReqList from '../Barber/AppointmentRequests/AppReqList';
import './Tabs.css'
import WorkTime from '../Barber/WorkingTime/WorkTime'


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-prevent-tabpanel-${index}`}
      aria-labelledby={`scrollable-prevent-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-prevent-tab-${index}`,
    'aria-controls': `scrollable-prevent-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
   
  },
  indicator: {
    backgroundColor:'#FFF',

  },
}));

export default function ScrollableTabsButtonPrevent() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="absolute">
        <Tabs
          TabIndicatorProps={{style: {backgroundColor: "#4FBAE4"}}}
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="off"
          aria-label="scrollable prevent tabs example"
          className='tabs'
        >
          {/* <Tab label="Dashboard" {...a11yProps(1)} /> */}
          <Tab label="Appointment List" {...a11yProps(0)} />
          <Tab label="Appointment requests" {...a11yProps(2)} />
          <Tab label="Services List" {...a11yProps(3)} />
          <Tab label="Working time" {...a11yProps(4)} />


        </Tabs>
      </AppBar>
      {/* <TabPanel className='tab-panel' value={value} index={0}>
        <center><h1>Dashboard</h1></center>
      </TabPanel> */}
      <TabPanel value={value} index={0}>
       <AppointmentsList/>
      </TabPanel>
      <TabPanel className='tab-panel' value={value} index={1}>
        <center><h1>Appointment requests</h1></center>
        <AppReqList />
      </TabPanel>
      <TabPanel className='tab-panel' value={value} index={2}>
        <center><h1>Services List</h1></center>
        <ServiceList/>
      </TabPanel>
      <TabPanel className='tab-panel' value={value} index={3}>
        <center><h1>Working Time</h1></center>
        <WorkTime />
      </TabPanel>
    </div>
  );
}











// import React from 'react';
// import PropTypes from 'prop-types';
// import { makeStyles } from '@material-ui/core/styles';
// import AppBar from '@material-ui/core/AppBar';
// import Tabs from '@material-ui/core/Tabs';
// import Tab from '@material-ui/core/Tab';
// import Typography from '@material-ui/core/Typography';
// import Box from '@material-ui/core/Box';

// import UserList from '../Admin/UsersList/UsersList'
// import AppointmentsList from '../Admin/AppointmentsList/AppointmentsList'

// function TabPanel(props) {
//   const { children, value, index, ...other } = props;

//   return (
//     <div
//       role="tabpanel"
//       hidden={value !== index}
//       id={`simple-tabpanel-${index}`}
//       aria-labelledby={`simple-tab-${index}`}
//       {...other}
//     >
//       {value === index && (
//         <Box p={3}>
//           <Typography>{children}</Typography>
//         </Box>
//       )}
//     </div>
//   );
// }

// TabPanel.propTypes = {
//   children: PropTypes.node,
//   index: PropTypes.any.isRequired,
//   value: PropTypes.any.isRequired,
// };

// function a11yProps(index) {
//   return {
//     id: `simple-tab-${index}`,
//     'aria-controls': `simple-tabpanel-${index}`,
//   };
// }

// const useStyles = makeStyles((theme) => ({
//   root: {
//     flexGrow: 1,
//     backgroundColor: theme.palette.background.paper,
//   },
// }));

// export default function SimpleTabs() {
//   const classes = useStyles();
//   const [value, setValue] = React.useState(0);

//   const handleChange = (event, newValue) => {
//     setValue(newValue);
//   };

//   return (
//     <div className={classes.root}>
//       <AppBar position="static">
//         <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
//           <Tab label="Item One" {...a11yProps(0)} />
//           <Tab label="Item Two" {...a11yProps(1)} />
//           <Tab label="Item Three" {...a11yProps(2)} />
//         </Tabs>
//       </AppBar>
//       <TabPanel value={value} index={0}>
//         <AppointmentsList/>
//       </TabPanel>
//       <TabPanel value={value} index={1}>
//         <UserList/>
//       </TabPanel>
//       <TabPanel value={value} index={2}>
//         Item Three
//       </TabPanel>
//     </div>
//   );
// }
