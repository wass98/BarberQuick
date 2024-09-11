import React from 'react';
import './TableData.css';
import Modal from './Modal'; // Import the Modal component

const TableData = ({ appointments, time, day }) => {
  const [showModal, setShowModal] = React.useState(false);
  const [appointment, setAppointment] = React.useState({});

  const handleShowModal = (appointment) => {
    setAppointment(appointment);
    setShowModal(true);
  };

  return (
    <td>
      {appointments[0] ? (
        <span
          className="td-color"
          onClick={() => handleShowModal(appointments[0])}
        >
          <span className="td-flex-icons">
            <i className="fa fa-user" aria-hidden="true"></i>
            {appointments[0].name.charAt(0).toUpperCase() + appointments[0].name.slice(1)}
          </span>
        </span>
      ) : (
        <span className="td-empty">Empty</span>
      )}
      {showModal && (
        <Modal
          appointment={appointment}
          time={time}
          day={day}
          onClose={() => setShowModal(false)}
        />
      )}
    </td>
  );
};

export default TableData;