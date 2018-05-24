import React, { Component } from 'react';
import {connect} from 'react-redux';
import axios from 'axios';

class Change extends Component {
    constructor(){
        super()
        this.state={
            newOrigin: '',
            newDestination: '',
            newPrice:''
        }
    }
    componentDidMount(){
        console.log(this.props)
        if(!this.props.id){
            axios.get('/auth/me').then(res=>{
                const { id, displayname, picture, email, phone, prostatus} =res.data
                this.props.userInfo(id, displayname, picture, email, phone, prostatus)
              }).catch(err=>{
                this.props.history.push('/')
              })}
    }

    render(){
        return(
            <div className='AddRouteBox' > 
                    <div>
                        <h1 className= 'thanks '>Change Route Details</h1>
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

export default connect(mapStateToProps)(Change)