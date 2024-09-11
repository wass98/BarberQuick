import React from 'react';
import './Modal.css';

const Modal = ({ appointment, time, day, onClose }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <center><h2>Appointment Details</h2></center><br/>
        <p>
          <strong>Name: </strong> {appointment.name}
        </p>
        <p>
          <strong>Time: </strong> {time}
        </p>
        <p>
          <strong>Day: </strong> {day}
        </p>
        <p>
          <strong>Services: </strong> {appointment.service}
        </p>
        <p>
          <strong>Price: </strong> {appointment.price} DT
        </p>
        <p>
          <strong>Duration: </strong> {appointment.avgTime} min
        </p>
        <p>
          <strong>Status: </strong> {appointment.status.toUpperCase()}
        </p>
        {/* Add more appointment details here */}
        <br/><br/>
        <center><button className="close-button" onClick={onClose}>
          Close
        </button></center>
      </div>
    </div>
  );
};

export default Modal;