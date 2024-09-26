import React, { useState } from 'react';
import './Appointment.css';
import Navbar from '../Home/Navbar/Navbar';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
import { useLocation, useHistory } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';

const Confirm = () => {
    const history = useHistory();
    const [error, setError] = useState();
    const location = useLocation();
    const appointmentData = location.state;

    console.log(appointmentData);
    const makeAppointment = async () => {
        try {
            const response = await axios.post('http://localhost:5000/appointment', appointmentData);
            if (response.data.error) {
                toast.error(response.data.error);
                setTimeout(() => {
                    history.push({ pathname: '/userapp' });
                  }, 2000);
            } else {
                toast.success(response.data.message);
                setTimeout(() => {
                    history.push({ pathname: '/userapp' });
                  }, 2000);
            }
        } catch (error) {
            toast.error("Erreur!");
            setTimeout(() => {
                history.push({ pathname: '/userapp' });
              }, 2000);
            
        }
    };
    
    return (
        <div>
            <Navbar />
            <Toaster position="top-center" reverseOrder={false} />
            <div className='appointment-container'>
                <div className='appointment-form'>
                    <h1>Confirmer le Rendez-vous</h1>
                    <div className='appointment-inner-container'>
                        <h2>Rendez-vous sera fixé pour:</h2>
                        <div className='appointment-details'>
                            <div className='appointment-detail'>
                                <span>Date:</span>
                                <span>{appointmentData.date}</span>
                            </div>
                            <div className='appointment-detail'>
                                <span>Heure:</span>
                                <span>{appointmentData.time}</span>
                            </div>
                            <div className='appointment-detail'>
                                <span>Service(s):</span>
                                <span>{appointmentData.service}</span>
                            </div>
                            <div className='appointment-detail'>
                                <span>Prix:</span>
                                <span>{appointmentData.price} DT</span>
                            </div>
                            <div className='appointment-detail'>
                                <span>Durée estimée:</span>
                                <span>{appointmentData.avgTime} min</span>
                            </div>
                            <div className='appointment-detail'>
                                <span>Mobile:</span>
                                <span>{appointmentData.phone}</span>
                            </div>
                        </div>
                    </div>
                    <div id='make-btn' className='appointment-inner-container'>
                        <button className='appointment-btn' onClick={() => history.goBack()}>Retourner</button>
                        <button onClick={makeAppointment} className='appointment-btn-next'>Confirmer</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Confirm;
