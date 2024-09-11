import React, {useEffect, useState} from 'react'
import './ServiceList.css'
import axios from 'axios'
import ServiceRow from './ServiceRow'
import {getCookie} from '../../../cookies';


const ServiceList = () => {
    const [services, setServices] = useState([]);
    const [barberID, setBarberID] = useState('');
    const [newService, setNewService] = useState({
        name: '',
        description: '',
        price: '',
        duration: '',
      });

    useEffect(() =>{
        setBarberID(getCookie('id'))
        console.log('upload user profile')
    },[])

    useEffect(()=>{
        console.log('services list rendred')
        axios.get(`http://localhost:5000/getservices2?barberID=${barberID}`).then((response) => {

        
            let {error} = response.data
            if(error){
                console.log(error)
            }
            else{
                console.log('all the services: ',response.data)
                setServices(response.data)
            }
        })
    },[barberID])

    
    const addService = async () => {
      if(newService.name==='' || newService.description==='' || newService.price==='' || newService.duration==='')
         return alert("Pease fill service details")
      else{
        try {
          const response = await axios.post(`http://localhost:5000/addservice`, {
            barberID,
            ...newService,
          });
          console.log('Server response:', response.data);
          const newServiceData = response.data;
          console.log('New service data:', newServiceData);
          setServices([...services, newServiceData]);
          console.log('Updated services state:', services);
          setNewService({
            name: '',
            description: '',
            price: '',
            duration: '',
          });
        } catch (error) {
          console.error(error);
        }
      }};

      const handleInputChange = (event) => {
        const { name, value } = event.target;
        setNewService((prevService) => ({ ...prevService, [name]: value }));
      };

    
    const deleteService = async (serviceID) => {
        try {
          await axios.delete(`http://localhost:5000/deleteservice/${serviceID}`);
          // Update the services state to remove the deleted service
          setServices(services.filter((service) => service._id !== serviceID));
        } catch (error) {
          console.error(error);
        }
      };


    return (
        <div className='user-list'>
            <h2>Add service:</h2><hr/>
            <form>
        <div className='input-container'>
          <label>
            Name:
            <input
              type='text'
              name='name'
              placeholder=''
              value={newService.name}
              onChange={handleInputChange}
              className='input-field'
            />
          </label>
        </div>
        <div className='input-container'>
          <label>
            Description:
            <input
              type='text'
              name='description'
              value={newService.description}
              onChange={handleInputChange}
              className='input-field'
            />
          </label>
        </div>
        <div className='input-container'>
          <label>
            Price:
            <input
              type='number'
              name='price'
              value={newService.price}
              onChange={handleInputChange}
              className='input-field'
            />
          </label>
        </div>
        <div className='input-container'>
          <label>
            Duration:
            <input
              type='number'
              name='duration'
              value={newService.duration}
              onChange={handleInputChange}
              className='input-field'
            />
          </label>
        </div>
        <button type='button' onClick={addService} className='add-button'>
          Add Service
        </button>
      </form>
            <hr/><br/>
            <h2>Services list:</h2>
            
            <table>
                <thead>
                    <tr className='table-header'>
                        <th>Name</th>
                        <th>Details</th>
                        <th>Price</th>
                        <th>Duration</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {services.map((service) => <ServiceRow deleteService={deleteService} service={service}/>)}
                </tbody>
            </table>    
        </div>

        
    )
}

export default ServiceList
