import React, { Component } from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {userInfo} from '../../ducks/reducer'
import Register from '../Register/Register'

class Home extends Component {
    constructor(){
        super()
        this.state={
            user: '',
            picture: '',
          hasPhone: false
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
      )
    }



    render(){

        return(
            <div>
                {!this.props.phone ? 
                     <Register /> :
                    <div> Home </div>
                     }
            </div>
        )
    }
}

function mapStateToProps(state){
    return state
}

export default connect(mapStateToProps, {userInfo})(Home)