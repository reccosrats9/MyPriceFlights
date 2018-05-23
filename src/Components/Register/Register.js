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
        axios.put(`/contact/${id}`, {email, phone})
    }

    render(){
        return(
            <div className='allRegister'>
                 {/* <Particles params={
                    {
                        "particles": {
                          "number": {
                            "value": 50,
                            "density": {
                              "enable": true,
                              "value_area": 2164.606282168456
                            }
                          },
                          "color": {
                            "value": "#ffffff"
                          },
                          "shape": {
                            "type": "image",
                            "image": {
                              "src": "http://pluspng.com/img-png/cloud-png-cloud-png-image-1988.png",
                              "width": 100,
                              "height": 100
                            }
                          },
                          "opacity": {
                            "value": 0.8578254525630548,
                            "random": true,
                          },
                          "size": {
                            "value": 500,
                            "random": false,
                          },
                          "move": {
                            "enable": true,
                            "speed": 5,
                            "direction": ["bottom",  "right"],
                            "random": true,
                            "straight": false,
                            "out_mode": "out",
                            "bounce": false,
                            "attract": {
                              "enable": false,
                              "rotateX": 600,
                              "rotateY": 1200
                            }
                          }
                        },
                        "interactivity": {
                          "detect_on": "canvas",
                          "events": {
                            "onhover": {
                              "enable": true,
                              "mode": "repulse"
                            },
                            "onclick": {
                              "enable": true,
                              "mode": "push"
                            },
                            "resize": true
                          },
                          "modes": {
                            "grab": {
                              "distance": 400,
                              "line_linked": {
                                "opacity": 1
                              }
                            },
                            "bubble": {
                              "distance": 400,
                              "size": 40,
                              "duration": 2,
                              "opacity": 8,
                              "speed": 3
                            },
                            "repulse": {
                              "distance": 200,
                              "duration": 0.4
                            },
                            "push": {
                              "particles_nb": 4
                            },
                            "remove": {
                              "particles_nb": 2
                            }
                          }
                        },
                        "retina_detect": true
                      }
                }/> */}
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