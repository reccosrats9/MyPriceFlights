import React, { Component } from 'react';
import {connect} from 'react-redux';
import axios from 'axios';

class Delete extends Component {
    constructor(){
        super()
        this.state={

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
            <div>
                Delete
            </div>
        )
    }
}

function mapStateToProps(state){
    return state
}

export default connect(mapStateToProps)(Delete)