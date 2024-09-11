import React from 'react'
import {Route, Redirect} from 'react-router-dom'
import {getCookie} from './cookies'

export const BarberRoute = ({component: Components, ...rest}) => {



    console.log('Barber route rendred')
    return (
        <Route {...rest} render={props => {
            if(getCookie('barber') === 'true') {
              return <Components {...props} />;
            } else {
                console.log('not barber')
              return (
                <Redirect from={`${props.location}`} to='/appointment'/>
              );
            }
        }}
      />
    )
}


