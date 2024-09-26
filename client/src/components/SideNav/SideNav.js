import React, {useState, useEffect} from 'react'
import './SideNav.css'
import { Link } from 'react-router-dom';
import {checkCookie, getCookie, deleteCookie} from '../../cookies'
// import {time, fullTime} from '../../time'

const SideNav = () => {

    // const [day, setDay] = useState('sun')
    // const [workTime, setWorkTime] = useState('')
    const [name, setName] = useState('')
    const [isBarber, setIsBarber] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);


    useEffect(()=>{
        let loginAndReg = document.querySelector('.side-log-reg')
        let helloUser = document.querySelector('.side-logout')
        
        setName(getCookie('name'))
        setIsBarber(getCookie('barber') === 'true');
        setIsLoggedIn(checkCookie('status'));

        if(checkCookie('status')){
            console.log('user logged')
            helloUser.style.display = 'flex'
            loginAndReg.style.display = 'none'
        }else{
            console.log('user not logged')
            helloUser.style.display = 'none'
            loginAndReg.style.display = 'flex'
        }
    },[])

    const logout = () =>{
        console.log('user logout')
        deleteCookie('name')
        deleteCookie('id')
        deleteCookie('status')
        deleteCookie('barber')
        window.location.replace('/')
    }

    // const dayOfWeek = (num) =>{
    //     let obj = fullTime(num)
    //     setDay(obj.day)
    //     setWorkTime(obj.workTime)
    // }

    return (
        <div className='side-navbar'><center>
            <h1 className=''>Hello, {name} </h1>
            <ul className='side-navbar-ul'>
                    <li className=''>
                        <i className="fa fa-home" aria-hidden="true"></i>
                        <a href="./#hero-navigate" className='links'>Home</a>
                    </li>
                    {/* <li className=''>
                        <i className="fa fa-camera" aria-hidden="true"></i>
                        <a href="./#what-we-do" className='links'>Service</a> 
                    </li>
                    <li className=''>
                        <i className="fa fa-money" aria-hidden="true"></i>
                        <a href="./#hours-navigate" className='links'> Hours</a>
                    </li> */}
                    {
                        isLoggedIn && (
                            (isBarber ? (
                                <li className='nav-items'>
                                    <Link className='links' to='/cpanel'>
                                        Control Panel
                                    </Link>
                                </li>
                            ) : (
                                <li className='nav-items'>
                                    <Link className='links' to='/barberlist'>
                                        Barbers List
                                    </Link>
                                </li>
                            ))
                        )
                    }
                    {
                        isLoggedIn && (
                            (isBarber ? (
                                <li className='nav-items'>
                                    <Link className='links' to='/bprofile'>
                                        Profile
                                    </Link>
                                </li>
                            ) : (
                                <li className='nav-items'>
                                    <Link className='links' to='/profile'>
                                        Profile
                                    </Link>
                                </li>
                            ))
                        )
                    }
                </ul>
                <div className='side-logout'>       
                    <button className='side-btn' onClick={logout}>Logout</button>
                </div>
                <div className='side-log-reg'>
                    <Link className='side-log-reg-link' to='/login'>
                        Login
                    </Link>
                
                    <span className='side-separator'></span>

                    <Link className='side-log-reg-link' to='/register'>
                        Register
                    </Link>
                </div></center>
        </div>
    )
}

export default SideNav
