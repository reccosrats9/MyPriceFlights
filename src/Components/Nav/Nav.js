import React from 'react';
import {withRouter} from 'react-router-dom';
import './Nav.css'

function Nav(props){
    return(
        <div className={props.location.pathname==='/land' ? 'hidenav' :'navbar'}>
            <h1>My Price Flights</h1>
            <div className= 'right'>
                <h3>***username***</h3>
                <img src="https://i.pinimg.com/236x/fa/34/8c/fa348c8137d0c0d73a927945aa25e205--funny-bunnies-cute-bunny.jpg" alt="Profile Pic"/>
            </div>
        </div>
    )
}

export default withRouter(Nav)