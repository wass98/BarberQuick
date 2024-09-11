import React, {useState} from 'react'
import './Appointment.css'
import Navbar from '../Home/Navbar/Navbar'
import "react-datepicker/dist/react-datepicker.css";
// import {fullTime} from '../../time'
import axios from 'axios'
import { useLocation, useHistory } from 'react-router-dom';
// import ErrorMsg from '../ErrorMsg/ErrorMsg';
//import {getCookie, checkCookie} from '../../cookies'

const Confirm = () => {
    
    const history = useHistory();
    const [error, setError]=useState()
    const location = useLocation();
    const appointmentData = location.state;

    console.log(appointmentData);
    const makeAppointment = async () => {
        try {
          const response = await axios.post('http://localhost:5000/appointment', appointmentData);
          if (response.data.error) {
            setError(response.data.error);
            setTimeout(() => {
              setError('');
            }, 6000);
          } else {
            alert(response.data);
            history.push({ pathname: '/profile' });
          }
        } catch (error) {
          console.error(error);
          setError('An error occurred while making the appointment');
        }
      };
      console.log(error)
    
    return (
        <div>
            <Navbar/>
            <div className='appointment-container'>
                <div className='appointment-form'>
                    <h1>Confirm Appointment</h1>
                    <div className='appointment-inner-container'>

                        
                    
                    
                    <div >
                        <h3>Appointment will be set for:</h3><br/>
                        {/* <p>Date:  <span></span></p>
                        <p>Day: <span></span></p>
                        <p>Time: <span></span></p>
                        <p>Service(s): <span></span></p>
                        <p>Price: <span></span></p>
                        <p>Average time: <span></span></p>
                        <p>Phone number: <span></span></p> */}
                        <center><table>
                            <tr>
                                <td>Date:</td>
                                <th align='left'>{appointmentData.date}</th>
                            </tr>
                            <tr>
                                <td>Day:</td>
                                <th align='left'>{appointmentData.day}</th>
                            </tr>
                            <tr>
                                <td>Time:</td>
                                <th align='left'>{appointmentData.time}</th>
                            </tr>
                            <tr>
                                <td>Service(s):</td>
                                <th align='left'>{appointmentData.service}</th>
                            </tr>
                            <tr>
                                <td>Price:</td>
                                <th align='left'>{appointmentData.price} DT</th>
                            </tr>
                            <tr>
                                <td>Average duration:</td>
                                <th align='left'>{appointmentData.avgTime} min</th>
                            </tr>
                            <tr>
                                <td>Phone number:</td>
                                <th align='left'>{appointmentData.phone}</th>
                            </tr>
                        </table></center>
                    </div>
                    <div id='make-btn' className='appointment-inner-container'>
                        <button className='appointment-btn' onClick={() => history.goBack()}>Back</button>
                        <button onClick={makeAppointment} className='appointment-btn-next'>Confirm</button>
                    </div>
                </div>
            </div> 
        </div>
    </div>
    )
}

export default Confirm
