import React, {Component} from 'react';
import './Landing.css'
import Particles from 'react-particles-js';

class Landing extends Component{
    render(){
        return(
            <div className= 'all'>
                <Particles params={
                    {
                        "particles": {
                          "number": {
                            "value": 5,
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
                              "src": "//pluspng.com/img-png/cloud-png-cloud-png-image-1988.png",
                              "width": 100,
                              "height": 100
                            }
                          },
                          "opacity": {
                            "value": 0.8578254525630548,
                            "random": true,
                          },
                          "size": {
                            "value": 384.81889460772544,
                            "random": false,
                          },
                          "move": {
                            "enable": true,
                            "speed": 1,
                            "direction": "bottom",
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
                }/>
            <div className='centerBox' >
                <h3 className= 'welcome'>Welcome to</h3>
                <h1 className='title' >My Price Flights</h1>
                <p className='about' >The web app that allows you to visit your dream destinations at your dream prices</p>
                <a href={process.env.REACT_APP_LOGIN}>
                  <button className='login'>Login / Register</button>
                </a>
            </div>
        </div>
    )
}
}

export default Landing