import React, { Component } from 'react';
import {connect} from 'react-redux';
import axios from 'axios'
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import StripeCheckout from 'react-stripe-checkout';

class Pro extends Component {
    constructor(){
        super()
        this.state={
            open:false
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

    handleOpen = () => {
        this.setState({ open: true });
      };
    
      handleClose = () => {
        this.setState({ open: false });
      };

    render(){
        return(
            <div>
            <Button onClick={this.handleOpen}>Open Modal</Button>
            <Modal
              open={this.state.open}
              onClose={this.handleClose}
            >
              <div>
                {/* <Typography variant="title" id="modal-title">
                  Text in a modal
                </Typography> */}
                <Typography variant="subheading" id="simple-modal-description">
                Thanks for using our site! Become a Pro member to have us search more than 3 routes at a time.
                </Typography>
                {/* <SimpleModalWrapped /> */}
              </div>
            </Modal>
          </div>
        )
    }
}

function mapStateToProps(state){
    return state
}

export default connect(mapStateToProps)(Pro)