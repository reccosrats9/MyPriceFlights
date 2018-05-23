import React from 'react';
import {withRouter} from 'react-router-dom';
import './Nav.css'
import {connect} from 'react-redux'

function Nav (props){    
        return(
            <div className={props.location.pathname==='/' ? 'hidenav' :'navbar'}>
        <h1>My Price Flights</h1>
        <div className= 'right'>
        <h3>{props.user}</h3>
        <img src={props.picture} alt=""/>
        <a href={process.env.REACT_APP_LOGOUT}>
            <button className='logout'>Logout</button>
        </a>
        </div>
        </div>
    )
}

function mapStateToProps(state){
    return state
}

export default withRouter(connect(mapStateToProps)(Nav))