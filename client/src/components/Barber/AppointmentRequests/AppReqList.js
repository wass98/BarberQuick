import React, { useEffect, useState, useCallback } from 'react';
import './AppReqList.css';
import axios from 'axios';
import AppReqRow from './AppReqRow';
import { getCookie } from '../../../cookies';

const AppReqList = () => {
  const [appReq, setappReq] = useState([]);
  const [barberID, setBarberID] = useState('');
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    setBarberID(getCookie('id'));
  }, []);

  console.log("barberID", barberID)

  useEffect(() => {
    console.log('appointment req list rendred');
    axios
      .get(`http://localhost:5000/getappointmentreq?barberID=${barberID}`)
      .then((response) => {
        let { error } = response.data;
        if (error) {
          console.log(error);
        } else {
          console.log('all the services: ', response.data);
          const pendingAppointments = response.data.filter((appointment) => appointment.status === 'pending');
          setappReq(pendingAppointments);
        }
      });
  }, [barberID, update]);

  const handleUpdate = useCallback((updatedAppointments) => {
    setappReq(updatedAppointments);
  }, []);

  return (
    <div className='user-list'>
      {/* <h2>Add service:</h2><hr/> */}
      <br />
      <hr />
      <br />

      <table>
        <thead>
          <tr className='table-header'>
            <th>Name</th>
            <th>Date</th>
            <th>Service</th>
            <th>Price</th>
            <th>Duration</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
        {appReq.map((req) => (
          <AppReqRow
            key={req._id}
            req={req}
            handleUpdate={(updatedReq) => {
              const updatedAppointments = appReq.map((appointment) =>
                appointment._id === updatedReq._id ? updatedReq : appointment
              );
              handleUpdate(updatedAppointments);
            }}
          />
        ))}
        </tbody>
      </table>
    </div>
  );
};

export default AppReqList;