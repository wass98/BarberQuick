import React, {useState, useEffect} from 'react'
import './BarberProfile.css'
import Navbar from '../Home/Navbar/Navbar'
import profileImg  from '../../assets/profile-img.jpg'
// import {Link} from 'react-router-dom'
import axios from 'axios'
import {getCookie, setCookie, deleteCookie} from '../../cookies'
import Select from 'react-select';



const BarberProfile = (props) => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [state, setState] = useState('')
    const [adress, setAdress] = useState('')


    const [updatedName, setUpdatedName] = useState('')
    const [updatedEmail, setUpdatedEmail] = useState('')
    const [updatedPhone, setUpdatedPhone] = useState('')
    const [updatedState, setUpdatedState] = useState('')
    const [updatedAdress, setUpdatedAdress] = useState('')


                    const locations = [
                            { value:"Ariana" ,label:"Ariana" },
                            { value:"Béja" ,label:"Béja"},
                            { value:"Ben Arous" ,label:"Ben arous"},
                            { value:"Bizerte" ,label:"Bizerte"},
                            { value:"Gabès" ,label:"Gabès"},
                            { value:"Gafsa" ,label:"Gafsa"},
                            { value:"Jandouba" ,label:"Jandouba"},
                            { value:"Kairouane" ,label:"Kairouane"},
                            { value:"Kasserine" ,label:"Kasserine"},
                            { value:"Kébili" ,label:"Kébili"},
                            { value:"Le Kef" ,label:"LE Kef"},
                            { value:"Mahdia" ,label:"Mahdia"},
                            { value:"Le Manouba" ,label:"Le Manouba"},
                            { value:"Médenine" ,label:"Médenine"},
                            { value:"Monastir" ,label:"Monastir"},
                            { value:"Nabeul" ,label:"Nabeul"},
                            { value:"Sfax" ,label:"Sfax"},
                            { value:"Sidi Bouzid" ,label:"Sidi Bouzid"},
                            { value:"Siliana" ,label:"Siliana"},
                            { value:"Sousse" ,label:"Sousse"},
                            { value:"Tataouine" ,label:"Tataouine"},
                            { value:"Tozeur" ,label:"Tozeur"},
                            { value:"Tunis" ,label:"Tunis"},
                            { value:"Zaghouan" ,label:"Zaghouan"} 
                        ];


    // const [time, setTime] = useState('Empty')
    // const [date, setDate] = useState('')
    // const [day, setDay] = useState('')



    useEffect(() =>{
        getProfile(getCookie('id'))
        console.log('upload user profile')
    },[])



    const getProfile = (barberID) =>{
        axios.get(`http://localhost:5000/bprofiledata?id=${barberID}`).then((response) =>{

            let {error, email, name, phone, state, adress } = response.data 
            if(error){
                console.log(error)
            }
            else{
                setName(name)
                setEmail(email)
                setPhone(phone)
                setState(state)
                setAdress(adress)
                setCookie('phone', phone ,2)
                console.log(response.data)
            }
        })
    }

    const updateProfile = () =>{

        if(updatedName === '' && updatedEmail ==='' && updatedPhone ==='' && updatedState ==='' && updatedAdress ===''){ 
            alert('all fields are empty')
        }
        else{

            let obj = {}
            obj.name = updatedName
            obj.email = updatedEmail
            obj.phone = updatedPhone
            obj.state = updatedState
            obj.adress = updatedAdress
            obj.barberID = getCookie('id')
    
            axios.post('http://localhost:5000/updatebprofile', obj).then((response) =>{
                let {error} = response.data

                if(error){
                    alert('update profile: '+error)
                }
                else{
                    
                    if(email !=='')
                        setEmail(email)
                    if(phone !==''){
                        setPhone(phone)
                        setCookie('phone', phone ,2)
                    }
                    if(name !==''){
                        setCookie('name', name ,2)
                        setName(name)
                    }
                    if(state !==''){
                        setState(state)
                    }
                    if(adress !==''){
                        setAdress(adress)
                    }
                    alert('data successfully updated!')
                    window.location.reload(false);
                    console.log('server res: ', response.data)
                }
            })
        }
    }


    const deleteAcc = async() =>{
        console.log('id cookie ',getCookie('id'))
        let response = await axios.post('http://localhost:5000/deleteacc', {id:getCookie('id')})
        let {error} = response.data
        if(error){
            alert(error)
        }
        else{

            deleteCookie('id')
            deleteCookie('barber')
            deleteCookie('status')
            deleteCookie('name')

            alert(response.data)
            window.location.replace('/')
        }
    }

    return (
        <div>
            <Navbar/>
            <div className='user-profile-container'>
                <div className='user-profile-left'>
                    <center><h2>{name}</h2></center>
                    <img className='profile-img' src={profileImg} alt=""/>
                    <ul>
                        <li>
                            <i className="fa fa-user" aria-hidden="true"></i>
                            <a href='#user-profile-info'>PERSONAL INFO</a>
                        </li>
                        <li>
                            <i className="fa fa-pencil mr-right-i" aria-hidden="true"></i>
                            <a href='#user-profile-updateinfo'>UPDATE INFO</a>
                        </li>
                        <li>
                            <i className="fa fa-trash" aria-hidden="true"></i>
                            <a href='#user-profile-delete-acc'>DELETE ACCOUNT</a>
                        </li>
                    </ul>
                </div>

                <div className='user-profile-right'>
           
                    <div id='user-profile-info' className='user-profile-box'>
                        <div>
                            <h1>Personal Info</h1>
                            <div className='profile-underline'></div>
                        </div>
                        
                        <div className='user-profile-info-div'>
                            <div>
                                <p>Name:</p>
                                <span>{name}</span>
                            </div>
                            <div>
                                <p>Email:</p>
                                <span>{email}</span>
                            </div>
                            <div>
                                <p>Phone:</p>
                                <span>{phone}</span>
                            </div>
                            <div>
                                <p>State:</p>
                                <span>{state}</span>
                            </div>
                            <div>
                                <p>Adress:</p>
                                <span>{adress}</span>
                            </div>
                        </div>
                    </div>


                    <div id='user-profile-updateinfo' className='user-profile-box'>

                        <div className='profile-mr-bottom'>
                            <h1>Update Info</h1>
                            <div className='profile-underline'></div>
                        </div>
                        

                        <p>Name:</p>
                        <input type="text" placeholder='name...'
                        onChange={(e) => setUpdatedName(e.target.value)}
                        />
                        <p>Email:</p>
                        <input type="text" placeholder='email...'
                        onChange={(e) => setUpdatedEmail(e.target.value)}

                        />
                        <p>Phone:</p>
                        <input type="text" placeholder='phone...'
                        onChange={(e) => setUpdatedPhone(e.target.value)}
                        />
                        <p>State:</p>
                        <Select      
                            onChange={(locations) => setUpdatedState(locations.value)}
                            options={locations}
                            className='options' 
                        /><br/>
                        <p>Adress:</p>
                        <input type="text" placeholder='Adress...'
                        onChange={(e) => setUpdatedAdress(e.target.value)}
                        />
                        <input type="file" name="ProfilePicture" />
                        <br/>
                        <button onClick={updateProfile} className='profile-update-btn'>update</button>

                    </div>

                    <div id='user-profile-delete-acc' className='user-profile-box'>
                        <div className='profile-mr-bottom'>
                            <h1>Delete Account</h1>
                            <div className='profile-underline'></div>
                        </div>
                        <p>
                            Delete Account
                        </p>
                        <button onClick={deleteAcc}  id='profile-delete-btn'>Delete</button>

                    </div>
                </div>
            </div>      
        </div>
    )
}

export default BarberProfile