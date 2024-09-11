import React, {useEffect, useState} from 'react'
import './WorkTime.css'
// import axios from 'axios'
import {getCookie} from '../../../cookies';


const WorkTime = () => {
    const [barberID, setBarberID] = useState('')

    useEffect(() =>{
        setBarberID(getCookie('id'))
    },[])
    console.log("BarberID",barberID)

    return (
        <div className='user-list'>
        <br/><br/>
        <br/>
            <table>
                <thead>
                    <tr className='table-header'>
                        <th></th>
                        <th>Day</th>
                        <th>Open</th>
                        <th>Close</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><input type='checkbox' /></td>
                        <td>Sunday</td>
                        <td><input type='text' /></td>
                        <td><input type='text' /></td>
                    </tr>
                    <tr>
                        <td><input type='checkbox' /></td>
                        <td>Monday</td>
                        <td><input type='text' /></td>
                        <td><input type='text' /></td>
                    </tr>
                    <tr>
                        <td><input type='checkbox' /></td>
                        <td>Tuesday</td>
                        <td><input type='text' /></td>
                        <td><input type='text' /></td>
                    </tr>
                    <tr>
                        <td><input type='checkbox' /></td>
                        <td>Wednesday</td>
                        <td><input type='text' /></td>
                        <td><input type='text' /></td>
                    </tr>
                    <tr>
                        <td><input type='checkbox' /></td>
                        <td>Thursday</td>
                        <td><input type='text' /></td>
                        <td><input type='text' /></td>
                    </tr>
                    <tr>
                        <td><input type='checkbox' /></td>
                        <td>Friday</td>
                        <td><input type='text' /></td>
                        <td><input type='text' /></td>
                    </tr>
                    <tr>
                        <td><input type='checkbox' /></td>
                        <td>Saturday</td>
                        <td><input type='text' /></td>
                        <td><input type='text' /></td>
                    </tr>
                </tbody>
            </table>    
        </div>

        
    )
}

export default WorkTime
