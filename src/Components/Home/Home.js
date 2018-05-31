import React, { Component } from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {userInfo} from '../../ducks/reducer'
import {Link} from 'react-router-dom'
import './Home.css' 
import RoutesTable from '../RoutesTable/RoutesTable'
// import {Redirect} from 'react-router-dom'
// import Landing from '../Landing/Landing'

class Home extends Component {
    constructor(){
        super()
        this.state={
            routes: []
        }
        this.componentDidMount= this.componentDidMount.bind(this)
        this.getRoutes=this.getRoutes.bind(this)
      }
    
    componentDidMount(){
        console.log(this.props)
      axios.get('/auth/me').then(res=>{
          console.log(res.data)
        const { id, displayname, picture, email, phone, prostatus} =res.data
        this.props.userInfo(id, displayname, picture, email, phone, prostatus)
        !phone ? this.props.history.push('/register') : null
        axios.get(`/routes/${id}`).then(res=>{
            console.log(res.data)
            this.setState({routes: res.data})//.catch(err=>console.log('get routes endpoint', err))
      })
      }).catch(err=>{
        this.props.history.push('/')
        })
    }

    getRoutes(userid){
        axios.get(`/routes/${userid}`).then(res=>{
            console.log(res.data)
            this.setState({routes: res.data})//.catch(err=>console.log('get routes endpoint', err))
      })
    }

    render(){
        return(
            <div>
                    <div className='HomeBox' > 
                        <div className= 'HeaderBox'>
                            <h1 className= 'thanks'>My Routes</h1>
                                <Link to='/add'>
                                <button className='addButton'> + </button>
                                </Link>
                        </div>
                        <div className='routesTable'>
                            <div className='tableHeader'>
                                <div className='column' >Origin</div>
                                <div className='column'>Destination</div>
                                <div className='column'>Price</div>
                                <div className='columnSmall'></div>
                                <div className='columnSmall'></div>
                            </div>
                        {this.state.routes.map(route=>{
                            return(
                                <RoutesTable route={route} getRoutes={this.getRoutes} key={route.routeid}/>
                            )
                        })}
                        </div>
                     </div>
            </div>
        )
    }
}

function mapStateToProps(state){
    return state
}

export default connect(mapStateToProps, {userInfo})(Home)