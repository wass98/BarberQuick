import React, {useState, useEffect} from 'react'
import './Appointment.css'
import Navbar from '../Home/Navbar/Navbar'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from 'react-select';
import {getCookie} from '../../cookies'  //import {getCookie, checkCookie} from '../../cookies'
import {fullTime} from '../../time'
// import axios from 'axios'
// import { Link } from 'react-router-dom';
import ErrorMsg from '../ErrorMsg/ErrorMsg'
import { useLocation, useHistory } from 'react-router-dom';

const DatePick = (props) => {
    const [startDate, setStartDate] = useState(new Date())
    const [userTime, setUserTime] = useState('00:00')
    const [userDate, setUserDate] = useState('')
    const [phone, setPhone] = useState('')
    const [dayOfWeek, setDayOfWeek] = useState('')
    const [time, setTime] = useState(0)
    const [error, setError] = useState('')
    const location = useLocation();
    const { barberID, services } = location.state;

    const combinedServices = services.reduce((acc, service) => {
        acc.name += (acc.name ? ', ' : '') + service.name;
        acc.price = (acc.price || 0) + parseInt(service.price);
        acc.duration = (acc.duration || 0) + parseInt(service.duration);
        return acc;
      }, {});
      

    
    // console.log('hello',services)
    let serviceName = combinedServices.name.slice(9)
    let totalPrice = combinedServices.price
    let totalDuration = combinedServices.duration

    // console.log('name', serviceName);
    // console.log('price',totalPrice);
    // console.log('time', totalDuration);



    const currentTime = new Date();
    const currentHour = currentTime.getHours();
    const currentMinute = currentTime.getMinutes();
    
    const options2 = [
      { value: '09:00', label: '09:00' },
      { value: '09:45', label: '09:45' },
      { value: '10:30', label: '10:30' },
      { value: '11:15', label: '11:15' },
      { value: '12:00', label: '12:00' },
      { value: '12:45', label: '12:45' },
      { value: '13:30', label: '13:30' },
      { value: '14:15', label: '14:15' },
      { value: '15:00', label: '15:00' },
      { value: '15:45', label: '15:45' },
      { value: '16:30', label: '16:30' },
      { value: '17:15', label: '17:15' },
      { value: '18:00', label: '18:00' },
    ].filter((option) => {
      const optionHour = parseInt(option.value.split(':')[0]);
      const optionMinute = parseInt(option.value.split(':')[1]);
    
      if (optionHour < currentHour) {
        return false;
      } else if (optionHour === currentHour && optionMinute < currentMinute) {
        return false;
      }
    
      return true;
    });
    
    const [updatedOptions, setUpdatedOptions] = useState(options2);

    useEffect(() =>{
        let p = getCookie('phone')
        if(p !== '')
            setPhone(p)
        // let makeAppointment = document.querySelector('#make-btn')
        // let changeAppointment = document.querySelector('#change-btn')
        // let phoneInput = document.querySelector('#appo-phone')


    },[])

    // if(phone.length >= 6 && userTime !== '' && userDate!== '')  {
    //     let x = document.querySelector('.appointment-data')
    //     x.classList.add('appointment-data-show')
    // }

    // const changeAppointment = async() =>{

    //     let appointmentData = {}
    //     const obj = fullTime(dayOfWeek)
    //     appointmentData.userID = getCookie('id')
    //     appointmentData.key = userDate+userTime
    //     appointmentData.name = getCookie('name')
    //     appointmentData.date = userDate
    //     appointmentData.time = userTime
    //     appointmentData.day = obj.day
    //     appointmentData.timeInMS = time

    //     let response = await axios.post('http://localhost:5000/changeappointment', appointmentData)
    //     let { error } = response.data
    //     if(error){
    //         console.log(error)
    //         setError(error)
    //         setTimeout( ()=>{
    //             setError('')
    //         },6000)
    //     }else{
    //         console.log(response.data)
    //         alert('change')
    //     }
       
    // }

    
        let appointmentData = {}
        const obj = fullTime(dayOfWeek)
        appointmentData.barberID = barberID
        appointmentData.userID = getCookie('id')
        appointmentData.name = getCookie('name')
        appointmentData.date = userDate
        appointmentData.time = userTime
        appointmentData.phone = phone
        appointmentData.day = obj.day
        appointmentData.service = serviceName
        appointmentData.price = totalPrice
        appointmentData.avgTime = totalDuration
        appointmentData.timeInMS = time
       
 
    const handleTimeChange = selectedOption => {
        console.log('selectedOption: ',selectedOption)
        setUserTime( selectedOption.value );
        console.log(`time option selected:`, selectedOption.value);


      };

    const handleChange = date => {
        console.log(`date option selected:`, date);
  
        let tmp = `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`
        setTime(new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime())
        setUserDate(tmp)
        setStartDate(date)
        setDayOfWeek(date.getDay())
      };

      const history = useHistory();

  const handleNextClick = () => {
    history.push('/confirm', appointmentData);
  };
    
    return (
        <div>
            <Navbar/>
            <div className='appointment-container'>
                <div className='appointment-form'>
                    <h1>Pick Date and Time</h1>
                    <div className='appointment-inner-container'>
                        {error !== '' ?  <ErrorMsg info={error}/>
                        
                        : ''}
                        <p>Please choose date:<span className='red-astrix'>*</span></p>
                        <DatePicker
                            selected={startDate}
                            onChange={handleChange}
                            withPortal
                            className='date-picker'
                            dateFormat='dd/MM/yyyy'
                            minDate={new Date()}
                        />
                    </div>
                    <div className='appointment-inner-container'>
                        <p>Please choose time:<span className='red-astrix'>*</span></p>
                        <Select
                            value={updatedOptions.filter((option) => {
                                return option.value === userTime
                              })}       
                            onChange={handleTimeChange}
                            options={options2}
                            className='time-picker' 
                        />
                    </div>

                    <div id='appo-phone' className='appointment-inner-container'>
                        <p>Lets be in touch: <span className='red-astrix'>*</span></p>
                        <input type="tel" className='phone-input' placeholder='phone...' 
                        value={phone ? phone : 'phone...'}
                        onChange={(e)=>setPhone(e.target.value)}/>
                    </div>
                    <div id='make-btn' className='appointment-inner-container'>
                        <button className='appointment-btn' onClick={() => history.goBack()}>Back</button>
                        <button className='appointment-btn-next' onClick={handleNextClick}>Next</button>
                    </div>
                </div>
            </div> 
        </div>
    )
}

export default DatePick
