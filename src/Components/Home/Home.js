import React, { Component } from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {userInfo, addProStatus} from '../../ducks/reducer'
import {Link} from 'react-router-dom'
import './Home.css' 
import RoutesTable from '../RoutesTable/RoutesTable'
import StripeCheckout from 'react-stripe-checkout';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';


function Transition(props) {
    return <Slide direction="up" {...props} />;
  }

class Home extends Component {
    constructor(){
        super()
        this.state={
            routes: [],
            open: false, 
        }
        this.componentDidMount= this.componentDidMount.bind(this)
        this.getRoutes=this.getRoutes.bind(this)
        this.stripeClosed=this.stripeClosed.bind(this)
        // this.onToken=this.onToken.bind(this)
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

    handleClickOpen = () => {
        this.setState({ open: true });
    };
    
    handleClose = () => {
        console.log(this.props)
        this.setState({ open: false });
    };

    onToken = (token) => {
        const {id}=this.props
        token.card = void 0;
        axios.post('/api/payment', { token, amount: 2500/* the amount actually charged*/ } ).then( () => {
            axios.put(`/pro/${id}`).then(
                res=>{
                    console.log('Nailed it!',res.data)
                    this.props.addProStatus(res.data)
                }
            )
        })
    } 

    stripeClosed(){
        this.props.history.push('/add')
    }

    render(){
        const {routes}=this.state
        return(
            <div>
                    <div className='HomeBox' > 
                        <div className= 'HeaderBox'>
                            <h1 className= 'thanks'>My Routes</h1>
                                {
                                    (routes.length>=3 && this.props.pro)||routes.length<3 ? 
                                    <Link to= '/add'>
                                        <button className='addButton'> + </button>
                                    </Link> :
                                    <button className='addButton' onClick={this.handleClickOpen}> + </button>
                                }

                        </div>

                        <div>
                            <Dialog
                            open={this.state.open}
                            TransitionComponent={Transition}
                            keepMounted
                            onClose={this.handleClose}
                            aria-labelledby="alert-dialog-slide-title"
                            aria-describedby="alert-dialog-slide-description"
                            >
                            <DialogTitle id="alert-dialog-slide-title">
                                {"Go Pro?"}
                            </DialogTitle>
                            <DialogContent>
                                <DialogContentText id="alert-dialog-slide-description">
                                Thanks for using our site! Become a Pro member to have us keep an eye on more than 3 routes at a time. It'll only cost you $25 a year!
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <button onClick={this.handleClose} className='deleteCheck cancel'>
                                Cancel
                                </button>
                                <StripeCheckout onClick={this.handleClose}
                                    token={this.onToken}
                                    stripeKey='pk_test_WAXK0vNnZczGeQSw3ToSW28g'
                                    amount={2500}
                                    closed={this.stripeClosed}
                                />
                            </DialogActions>
                            </Dialog>
                        </div>

                        <div className='routesTable'>
                            <div className='tableHeader'>
                                <div className='column' >Origin</div>
                                <div className='column'>Destination</div>
                                <div className='column'>Price</div>
                                <div className='columnSmall'></div>
                                <div className='columnSmall'></div>
                            </div>
                        {routes.map(route=>{
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

// export const SimpleModalWrapped = withStyles(styles)(Modal);


function mapStateToProps(state){
    return state
}

export default connect(mapStateToProps, {userInfo, addProStatus})(Home)