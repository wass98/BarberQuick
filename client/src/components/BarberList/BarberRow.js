import React from 'react'
import './BarberList.css'
import {Link} from 'react-router-dom'



const BarberRow = ({barber}) => {

    return (
                    <div id='user-profile-info' className='user-profile-box'>
                        <div>
                            <div>
                                <h2>{barber.name}</h2>
                                <div className='profile-underline'></div>
                            </div>
                            
                            <div className='user-profile-info-div'>
                                <div>
                                    <p>State:</p>
                                    <span>{barber.state}</span>
                                </div>
                                <div>
                                    <p>Adress:</p>
                                    <span>{barber.adress}</span>
                                </div>
                                <div>
                                    <p>Services:</p>
                                    <span></span>
                                </div>
                                <div>
                                    <p>Rating:</p>
                                    <span></span>
                                </div>
                                <Link to={`/ap/${barber._id}`}>
                                    <button className='hero-btn'>Book Now</button>
                                </Link>
                            </div>
                        </div>
                    </div>
    )
}

export default BarberRow