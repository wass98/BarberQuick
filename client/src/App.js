import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from './components/Home/Home'
import Register from './components/Register/Register'
import RegisterB from './components/Register/RegisterB'
import Login from './components/Login/Login'
import UserProfile from './components/UserProfile/UserProfile'
import { ProtectedRoute } from './protected.route'
import {  BarberRoute } from './barber.route'
import BarberProfile from './components/BarberProfile/BarberProfile';
import CP from './components/Barber/CP'
import BarberList from './components/BarberList/BarberList';
import ServicePick from './components/AppointmentPage/ServicePick';
import DatePick from './components/AppointmentPage/DatePick';
import Confirm from './components/AppointmentPage/Confirm'

// import Appointment from './components/Appointment/Appointment'
// import BP from './components/BarberProfile/BarberProfile2';
// import {  AdminRoute } from './admin.route'
// import Admin from './components/Admin/Admin'


import './App.css';
// import { components } from 'react-select/dist/react-select.cjs.prod';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>

          {/* <AdminRoute component={Admin} path='/admin'/> */}
          <BarberRoute component={CP} path='/cpanel'/>
          <Route path='/' exact component={Home} />
          <Route path='/register' component={Register} />
          <Route path='/registerb' component={RegisterB} />
          <Route path='/login' component={Login} />

          <ProtectedRoute component={ServicePick} path='/ap/:barberID' />
          <ProtectedRoute component={DatePick} path='/datepick' />
          <ProtectedRoute component={Confirm} path='/confirm' />
          <ProtectedRoute component={BarberList} path='/barberlist' />
          <ProtectedRoute component={UserProfile} path='/profile' />
          <BarberRoute component={BarberProfile} path='/bprofile' />
          {/* <ProtectedRoute component={BP} path='/barber-profile' /> */}
          {/* <BarberRoute component={CP} path='/' /> */}
          {/* <ProtectedRoute component={Appointment} path='/appointment' /> */}
          <Route path='*' component={() => '404 PAGE NOT FOUND'} />

        </Switch>
      </Router>
    </div>
  );
}

export default App;
