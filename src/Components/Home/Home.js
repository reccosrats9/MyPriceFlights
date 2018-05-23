import React, { Component } from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {userInfo} from '../../ducks/reducer'
import Register from '../Register/Register'
import './Home.css' 
import {Redirect} from 'react-router-dom'
// import Landing from '../Landing/Landing'

class Home extends Component {
    constructor(){
        super()
        this.state={
            user: '',
            picture: '',
        }
        this.componentDidMount= this.componentDidMount.bind(this)
      }
    
    componentDidMount(){
        console.log(this.props)
      axios.get('/auth/me').then(res=>{
          console.log(res.data)
        const { id, displayname, picture, email, phone, prostatus} =res.data
        this.props.userInfo(id, displayname, picture, email, phone, prostatus)
      }
      ).catch(err=>{
        this.props.history.push('/')
      })
    }

    render(){
        let arr=[{origin: 'slc', destination: 'cdg', price: 400},{origin: 'slc', destination: 'cdg', price: 400},{origin: 'slc', destination: 'cdg', price: 400},{origin: 'slc', destination: 'cdg', price: 400},{origin: 'slc', destination: 'cdg', price: 400},{origin: 'slc', destination: 'cdg', price: 400}]
        return(
            <div>
                {this.props.id ?
            <div>
                {!this.props.phone ? 
                     <Register /> :
                    <div className='HomeBox' > 
                        <div className= 'HeaderBox'>
                            <h1 className= 'thanks'>My Routes</h1>
                            <button className='addButton'> + </button>
                        </div>
                        <div className='routesTable'>
                            <div className='tableHeader'>
                                <div className='column' >Origin</div>
                                <div className='column'>Destination</div>
                                <div className='column'>Price</div>
                                <div className='columnSmall'></div>
                                <div className='columnSmall'></div>
                            </div>
                        {arr.map((route, i)=>{
                            return(
                                <div className='tableRow' >
                                    <div className='column'>{route.origin}</div>
                                    <div className='column'>{route.destination}</div>
                                    <div className='column'>{route.price}</div>
                                    <div className='columnSmall'>
                                        <button className='tableButton'>Change</button>
                                    </div>
                                    <div className='columnSmall'>
                                        <button className='tableButton'>Delete</button>
                                    </div>
                                </div>
                            )
                        })}
                        </div>
                     </div>
                     }
            </div> :
            null
            // <Landing />
                    }
            </div>
        )
    }
}

function mapStateToProps(state){
    return state
}

export default connect(mapStateToProps, {userInfo})(Home)