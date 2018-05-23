import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import './Nav.css'
import {connect} from 'react-redux'

class Nav extends Component {

    componentDidMount(){

    }

    render (){      
        return(
            <div className={this.props.location.pathname==='/' ? 'hidenav' :'navbar'}>
        <h1>My Price Flights</h1>
        <div className= 'right'>
        <h3>{this.props.user}</h3>
        <img src={this.props.picture} alt=""/>
        <button className='logout'>Logout</button>
        </div>
        </div>
    )
}
}

function mapStateToProps(state){
    return state
}

export default withRouter(connect(mapStateToProps)(Nav))