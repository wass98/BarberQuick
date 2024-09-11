import React ,{useState, useEffect}from 'react'
import './Register.css'
import logo from '../../assets/logo.png'
import { Link } from 'react-router-dom'
import axios from 'axios';
import ErrorMsg from '../ErrorMsg/ErrorMsg'
import loadingIcon from '../../assets/loading_icon.gif'
import Navbar from '../Home/Navbar/Navbar'



const Register = (props) => {
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')
    const [confirmPass, setConfirmPass] = useState('')
    const [error, setError] = useState('')

    useEffect( ()=>{
        console.log('register rendered')
    },[])
        
    const handleRegister = async () =>{
        let loading = document.querySelector('.register-loading')
        loading.style.display = 'block'

        let userData = {}
        userData.email = email
        userData.pass = pass
        userData.confirmPass = confirmPass
       
        
        let response =  await axios.post('http://localhost:5000/register', userData)
        let {error} = response.data
        if(error){
            loading.style.display = 'none'
            console.log(error)
            setError(error)
            setTimeout( ()=>{
                setError('')
            },6000)
        }
        else{
            props.history.push({ pathname: '/login' });
            console.log('register succed')
        }   
    }

    const registerByPress = (e) =>{
        if(e.key === 'Enter')
            handleRegister()
      }

    
    return (
        <div className='register'>
            <Navbar/>
            <div className='register-container'>
                <div className='register-form'>
                    <div className='register-info'>
                        <h1>Register</h1>
                        <img src={logo} alt=''></img>
                    </div>
                    <div className='form-container'> 
                    {error !== '' ?  <ErrorMsg info={error}/>
                        
                        : ''}
                        <p>Email:</p>
                        <input type="email" 
                            placeholder='Email...'
                            className='form-container-input'
                            name='email'    
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <p>Password:</p>
                        <input type="password"
                            placeholder='Password...'
                            className='form-container-input'
                            name='password'
                            onChange={(e) => setPass(e.target.value)}
                        />
                        <p>Confirm Password:</p>
                        <input type="password"
                            placeholder='Password...'
                            className='form-container-input'
                            name='confirmPassword'
                            onChange={(e) => setConfirmPass(e.target.value)}
                            onKeyPress={(e) => registerByPress(e)}
                        /> 
                        <div className='reg-btn-div'>
                            <button onClick={handleRegister} className='reg-submit'>Register</button>
                        </div>
                        <div className='new-account-login'>
                            <Link to='/login' className='new-account-link'>
                                Have account? Login Now!
                            </Link> <br /><br />
                            <Link to='/registerb' className='new-account-link'>
                                I AM A BARBER
                            </Link>
                        </div> 
                        <div className='login-div'>
                            <img className='register-loading' src={loadingIcon} alt=""/>
                        </div>
                    </div>
                </div>
                <div className='register-img'></div>
            </div>  
        </div>
    )
}

export default Register
