import React, {useEffect, useState} from 'react'
import './AppointmentsList.css'
import Row from './Row/Row'
import axios from 'axios'
import {getSundays, makeDate} from '../../../time'
import {Link} from 'react-router-dom'
import { getCookie } from '../../../cookies'

const AppointmentsList = () => {
    const [thisSunday, setThisSunday] = useState('this')
    const [lastSunday, setLastSunday] = useState('last')
    const [appointments, setAppointments] = useState([])
    const [barberID, setBarberID] = useState('');


    useEffect(() => {
        setBarberID(getCookie('id'));
      }, []);

      useEffect(()=>{
        console.log('Appointments list rendred')
    
        let sundays = getSundays()
        setThisSunday(makeDate(sundays.sunday))
        setLastSunday(makeDate(sundays.nextSunday))
    
        axios.get(`http://localhost:5000/getappointments?barberID=${barberID}&status=accepted`).then((response) => {
            console.log(response.data)
      
            let { error } = response.data
            if (error) {
              console.log(error)
            } else {
              let newAppointments = response.data.filter((obj) => {
                if (obj.timeInMS > sundays.sunday && obj.timeInMS < sundays.nextSunday && obj.barberID === barberID) return true
                else return false
              })
              console.log('newAppointments: ', newAppointments)
              setAppointments(newAppointments)
            }
          })
        }, [barberID])

        console.log("barber",barberID)


    return (
        <div className='appointments-list'>
            <div>
                <h1>Control Panel</h1>
                <div className='admin-profile-links-container'>
                    <Link to='/' className='admin-profile-link'>
                        Home 
                    </Link>
                    /
                    <Link to='/bprofile' className='admin-profile-link'>
                        Profile 
                    </Link>
                </div>
            </div>
            
            <h3>The appointments are between {`${thisSunday} and ${lastSunday}`}</h3>
        
            <table>
                <thead>
                    <tr className='table-header'>
                        <td id='td-white'></td>
                        <th>Sunday</th>
                        <th>Monday</th>
                        <th>Tuesday</th>
                        <th>Wednesday</th>
                        <th>Thursday</th>
                        <th>Friday</th>
                        <th>Saturday</th>
                    </tr>
                </thead>
                <tbody>
                    <Row appointments={appointments.filter(obj=> obj.time === '09:00')}
                    time='09:00' />
                    <Row appointments={appointments.filter(obj=> obj.time === '09:45')}
                    time='09:45' />
                    <Row appointments={appointments.filter(obj=> obj.time === '10:30')}
                    time='10:30' />
                    <Row appointments={appointments.filter(obj=> obj.time === '11:15')}
                    time='11:15' />
                    <Row appointments={appointments.filter(obj=> obj.time === '12:00')}
                    time='12:00' />
                    <Row appointments={appointments.filter(obj=> obj.time === '12:45')}
                    time='12:45' />
                    <Row appointments={appointments.filter(obj=> obj.time === '13:30')}
                    time='13:30' />
                    <Row appointments={appointments.filter(obj=> obj.time === '14:15')}
                    time='14:15' />
                    <Row appointments={appointments.filter(obj=> obj.time === '15:00')}
                    time='15:00' />
                    <Row appointments={appointments.filter(obj=> obj.time === '15:45')}
                    time='15:45' />
                    <Row appointments={appointments.filter(obj=> obj.time === '16:30')}
                    time='16:30' />
                    <Row appointments={appointments.filter(obj=> obj.time === '17:15')}
                    time='17:15' />
                    <Row appointments={appointments.filter(obj=> obj.time === '18:00')}
                    time='18:00' />
                </tbody>
            </table>   
        </div>
    )
}

export default AppointmentsList

