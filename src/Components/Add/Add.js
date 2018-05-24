import React, { Component } from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
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
        axios.post('/route', {id, origin, destination, price})
        .then(this.props.history.push('/home'))
    }

    render(){
        return(
            <div className='AddRouteBox' > 
                    <div>
                        <h1 className= 'thanks newRouteTitle'>Add New Route</h1>
                    </div>
                    <div className="inputContainers">
                         <div className='addRouteInputs'>
                            <h2>Origin Airport Code:</h2><input type="text" placeholder='ie: SLC' onChange={this.handleChangeOrigin}/>
                        </div>
                        <div className='addRouteInputs'>
                            <h2>Destination Airport Code:</h2><input type="text" placeholder='ie: EDI'onChange={this.handleChangeDestination}/>
                        </div>
                        <div className='addRouteInputs'>
                            <h2>Desired Ticket Price: </h2><input type="text" placeholder='$$$'onChange={this.handleChangePrice}/>
                        </div>
                    </div>
                    <div className= 'buttonBox'>
                        <button className='newRouteButton' onClick={this.submitRoute}>Submit</button>
                    </div>
             </div>
        )
    }
}

function mapStateToProps(state){
    return state
}

export default connect(mapStateToProps)(Add)