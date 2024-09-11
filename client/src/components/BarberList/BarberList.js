// import React, {useState, useEffect} from 'react'
// import './BarberList.css'
// import Navbar from '../Home/Navbar/Navbar'
// import axios from 'axios'
// import BarberRow from './BarberRow'



// const BarberList = (props) => {

//     const [barbers, setBarbers] = useState([])


   

//     useEffect(()=>{
//         console.log('barber list rendred')
//         axios.get('http://localhost:5000/getbarbers').then((response) => {

        
//             let {error} = response.data
//             if(error){
//                 console.log(error)
//             }
//             else{
//                 console.log('all the barbers: ',response.data)
//                 setBarbers(response.data)
//             }
//         })
//     },[])


//     return (
//         <div>
//             <Navbar/>
//             <div className='user-profile-container'>
//                 <div className='user-profile-right'>
//                     {barbers.map((barber) => <BarberRow barber={barber} />)}
//                 </div>
//             </div>      
//         </div>
//     )
// }

// export default BarberList




import React, { useState, useEffect } from 'react'
import './BarberList.css'
import Navbar from '../Home/Navbar/Navbar'
import axios from 'axios'
import BarberRow from './BarberRow'

const BarberList = (props) => {
    const [barbers, setBarbers] = useState([])
    const [filteredBarbers, setFilteredBarbers] = useState([])
    const [states, setStates] = useState([])
    const [selectedState, setSelectedState] = useState('')

    useEffect(() => {
        console.log('barber list rendered')
        axios.get('http://localhost:5000/getbarbers').then((response) => {
            let { error } = response.data
            if (error) {
                console.log(error)
            } else {
                console.log('all the barbers: ', response.data)
                setBarbers(response.data)
                setFilteredBarbers(response.data)
                const uniqueStates = [...new Set(response.data.map((barber) => barber.state))]
                setStates(uniqueStates)
            }
        })
    }, [])

    const handleStateChange = (e) => {
        setSelectedState(e.target.value)
        if (e.target.value === '') {
            setFilteredBarbers(barbers)
        } else {
            const filtered = barbers.filter((barber) => barber.state === e.target.value)
            setFilteredBarbers(filtered)
        }
    }

    return (
        <div>
            <Navbar />
            <div className='user-profile-container'>
                <div className='user-profile-right'>
                    <div className='filter-container' align='right'>
                        <select className="custom-select" value={selectedState} onChange={handleStateChange}>
                            <option value=''>Filter by state</option>
                            {states.map((state) => <option value={state}>{state}</option>)}
                        </select>
                    </div>
                    <br/>
                    {filteredBarbers.map((barber) => <BarberRow barber={barber} />)}
                </div>
            </div>
        </div>
    )
}

export default BarberList