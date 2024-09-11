import React from 'react'
import './Hero.css'
import { Link } from 'react-router-dom'
 

const Hero = () => {
    return (
        <div className='hero' id='hero-navigate'>
            <div className='hero-text'>
                <h1 className='hero-h1'>Welcome to BarberQuick</h1>
                <div className='hero-para-div'>
                    <p className='hero-para'>
                        Stop wasting time waiting for your turn!
                        Get your next haircut as soon and easy as possible!
                    </p>
                </div>
                <Link to='/barberlist'>
                    <button className='hero-btn'>Book Now</button>
                </Link>
            </div>
        </div>
    )
}

export default Hero
