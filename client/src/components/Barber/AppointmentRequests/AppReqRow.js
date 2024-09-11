import React from 'react'
import './AppReqRow.css'
import axios from 'axios'

const AppReqRow = ({req, handleUpdate}) => {
    console.log('appReq row rendred')



    const handleAccept = async () => {
      try {
        const response = await axios.put(`http://localhost:5000/updateappointment`, {
          id: req._id,
          status: 'accepted',
        });
        console.log(response.data);
        handleUpdate({ ...req, status: 'accepted' }); // Update the appReq state
      } catch (error) {
        console.error(error);
      }
    };
  
    const handleDecline = async () => {
      try {
        const response = await axios.put(`http://localhost:5000/updateappointment`, {
          id: req._id,
          status: 'declined',
        });
        console.log(response.data);
        handleUpdate({ ...req, status: 'declined' }); // Update the appReq state
      } catch (error) {
        console.error(error);
      }
    };

    return (

        <tr className='table-row'>
            <td>{req.name}</td>
            <td> {req.day}, {req.date} - {req.time}</td>
            <td>{req.service}</td>
            <td>{req.price}</td>
            <td>{req.avgTime}</td>
            <td className='bg-action-white'>
            <button onClick={handleAccept} className='btn-icon btn-green-color'>
                Accept
            </button>
            <button onClick={handleDecline} className='btn-icon btn-red-color'>
                Decline
            </button>
            </td>  
        </tr>           
    )
}

export default AppReqRow
