import React from 'react'
import './CP.css'
import Tabs from '../Tabs/Tabs'
import Navbar from '../Home/Navbar/Navbar'

const CP = () => {
    return (
        <div>
        <Navbar/>
        <div className='admin'>
            <div className='admin-container'>
                <div className='admin-tabs'>
                   <br/> <Tabs />
                </div>
            </div>   
        </div>
        </div>
    )
}

export default CP
