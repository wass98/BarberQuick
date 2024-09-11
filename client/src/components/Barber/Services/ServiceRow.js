import React from 'react'
import './ServiceRow.css'

const ServiceRow = ({service, deleteService}) => {
    console.log('user row rendred')

    return (

        <tr className='table-row'>
            <td>{service.name}</td>
            <td>{service.description}</td>
            <td>{service.price} DT</td>
            <td>{service.duration} minutes</td>
            <td className='bg-action-white'>
                {/* <button onClick={() =>editUser(user._id)} className='btn-icon btn-blue-color'>
                    <i className="fa fa-pencil" aria-hidden="true"></i>
                </button> */}
                <button onClick={() => deleteService(service._id)} className='btn-icon btn-red-color'>
                    <i className="fa fa-trash" aria-hidden="true"></i>
                </button>
            </td>  
        </tr>           
    )
}

export default ServiceRow
