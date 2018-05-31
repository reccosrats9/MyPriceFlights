import React, { Component } from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import {Link} from 'react-router-dom'
import './Add.css'

class Add extends Component {
    constructor(){
        super()
        this.state={
                origin: '',
                destination: '',
                price: '',
        }
        this.handleChangeOrigin=this.handleChangeOrigin.bind(this)
        this.handleChangeDestination=this.handleChangeDestination.bind(this)
        this.handleChangePrice=this.handleChangePrice.bind(this)
        this.submitRoute=this.submitRoute.bind(this)
    }
    componentDidMount(){
        console.log(this.props)
        if(!this.props.id){
            axios.get('/auth/me').then(res=>{
              const { id, displayname, picture, email, phone, prostatus} =res.data
              this.props.userInfo(id, displayname, picture, email, phone, prostatus)
            }).catch(err=>{
              this.props.history.push('/')
            })
        }
    }

    handleChangeOrigin(e){
        this.setState({origin: e.target.value})
    }

    handleChangeDestination(e){
        this.setState({destination: e.target.value})
    }

    handleChangePrice(e){
        this.setState({price: e.target.value})
    }

    submitRoute(){
        const {origin, destination, price}=this.state
        const {id}= this.props
        if (origin && destination && price) {axios.post('/route', {id, origin, destination, price})
        .then(this.props.history.push('/home'))
        }else {alert('Please complete all inputs so we can build your route')}
    }

    render(){
        return(
            <div className='AddRouteBox' > 
                    <Link to='/home'>
                    <img className='cancelButton' src="https://cdn1.iconfinder.com/data/icons/basic-ui-icon-rounded-colored/512/icon-02-512.png" alt=""/>
                    </Link>
                    <div>
                        <h1 className= 'thanks newRouteTitle'>Add New Route</h1>
                    </div>
                    <div className="inputContainers">
                        <form action="">
                         <div className='addRouteInputs'>
                            <h2>Origin Airport Code:</h2><input type="text" placeholder='ie: SLC' onChange={this.handleChangeOrigin} required/>
                        </div>
                        <div className='addRouteInputs'>
                            <h2>Destination Airport Code:</h2><input type="text" placeholder='ie: EDI'onChange={this.handleChangeDestination} required/>
                        </div>
                        <div className='addRouteInputs'>
                            <h2>Desired Ticket Price: </h2><input type="text" placeholder='$$$'onChange={this.handleChangePrice} required/>
                        </div>
                        </form>
                    </div>
                    <div className= 'buttonBox'>
                        <button type='submit' className='newRouteButton' onClick={this.submitRoute}>Submit</button>
                    </div>
             </div>
        )
    }
}

function mapStateToProps(state){
    return state
}

export default connect(mapStateToProps)(Add)