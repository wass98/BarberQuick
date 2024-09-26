import React from 'react'
import Hero from './Hero/Hero'
import Navbar from './Navbar/Navbar'
import Footer from './Footer/Footer'
import Services from './Services/Services'
import Contact from './Contact/Contact'
// import Hours from './Hours/Hours'

import './Home.css'

const Home = () => {
    return (
        <div>
            <Navbar/>
            <Hero/>
            <Services/>
            {/* <Hours/>       */}
            <Contact />

        </div>
    )
}

export default Home
