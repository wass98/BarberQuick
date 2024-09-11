import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
// import { getCookie } from '../../../cookies';
import ServicePickRow from './ServicePickRow';
import { useParams, useHistory } from 'react-router-dom';
import Navbar from '../Home/Navbar/Navbar';

    

    const ServicePick = (props) => {
    const { barberID } = useParams();
    const [services, setServices] = useState([]);
    const [selectedServices, setSelectedServices] = useState([]);
    console.log('barberID:', barberID);

    useEffect(() => {
        axios
          .get(`http://localhost:5000/getservices2?barberID=${barberID}`)
          .then((response) => {
            let { error } = response.data;
            if (error) {
              console.log(error);
            } else {
              setServices(response.data);
            }
          });
      }, [barberID]);

      // console.log('SERVICES',services);

      const handleServiceSelect = (service) => {
        const isSelected = selectedServices.includes(service);
        if (isSelected) {
          setSelectedServices((prevServices) =>
            prevServices.filter((prevService) => prevService !== service)
          );
        } else {
          setSelectedServices((prevServices) => [...prevServices, service]);
        }
      };

      const history = useHistory();

  const handleNextClick = () => {
    const selectedServicesData = selectedServices.map((service) => ({
      name: service.name,
      price: service.price,
      duration: service.duration,
    }));

    const dataToSend = {
      barberID,
      services: selectedServicesData,
      totalPrice: selectedServices.reduce((acc, service) => acc + service.price, 0),
      totalDuration: selectedServices.reduce((acc, service) => acc + service.duration, 0),
    };

    history.push('/datepick', dataToSend);
  };

  return (
    <div>
            <Navbar/>
            <div className='appointment-container'>
                <div className='appointment-form'>
                  <center><h2>Pick Service</h2></center>
                  <table>
                    <thead>
                      <tr className="table-header">
                        <th>Service</th>
                        <th>Price</th>
                        <th>Duration</th>
                        <th>Select</th>
                      </tr>
                    </thead>
                    <tbody>
                      {services.map((service) => (
                        <ServicePickRow
                          key={service._id}
                          service={service}
                          handleServiceSelect={handleServiceSelect}
                          isSelected={selectedServices.includes(service)}
                        />
                      ))}
                    </tbody>
                  </table>
                      <br/>
                    <Link to='/barberlist'><button className='appointment-btn'>Back</button></Link>
                    <button className='appointment-btn-next' onClick={handleNextClick}>Next</button>
                  </div>
              </div>
          </div>

  );
};
export default ServicePick;
