import React, {Component} from 'react';
import './Register.css'
import {addContact} from '../../ducks/reducer'
import {connect} from 'react-redux'  
import axios from 'axios'

class Register extends Component{
    constructor(){
        super()
        this.state={
            email: '',
            phone: ''
        }
        this.handleChangeEmail=this.handleChangeEmail.bind(this)
        this.handleChangePhone=this.handleChangePhone.bind(this)
        this.submit=this.submit.bind(this)
    }

    componentDidMount(){
      if(!this.props.state.id){  
        axios.get('/auth/me').then(res=>{
        const { id, displayname, picture, email, phone, prostatus} =res.data
        this.props.userInfo(id, displayname, picture, email, phone, prostatus)
      }).catch(err=>{
        this.props.history.push('/')
      })}
    }

    handleChangeEmail(e){
        this.setState({email: e.target.value})
    }

    handleChangePhone(e){
        this.setState({phone: e.target.value})
    }

    submit(){
        const {email, phone} = this.state
        const {id}= this.props.state
        this.props.addContact(email, phone)
        axios.put(`/contact/${id}`, {email, phone}).then( ()=>{//console.log('submitted')
          this.props.history.push('/home')
        })
    }

    render(){
        return(
            <div className='allRegister'>
            <div className= 'RegisterBox'> 
                <div className= 'RegisterText'>
                    <p className='thanks'>Thanks for registering!</p>
                    <p> To get you the flight deals of your dreams, we need some contact information so we can let you know when we find deals that match.</p>
                    <p>Please give us yours to continue!</p>
                </div>
                <div className='RegisterInputs'>
                    <input type="email" 
                    placeholder= 'email' required
                    onChange={this.handleChangeEmail}
                    value={this.state.email}/>
                    <input type='tel' 
                    placeholder='phone number' required
                    onChange={this.handleChangePhone}
                    value={this.state.phone} />
                <button className= 'SubmitButton'
                onClick={this.submit}>Submit</button>
                </div>
            </div>
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        state
    }
}

export default connect(mapStateToProps, {addContact})(Register)