import React, { Component } from 'react';
import axios from 'axios';
import './RoutesTable.css';
import {Link} from 'react-router-dom'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

function Transition(props) {
    return <Slide direction="up" {...props} />;
  }

export default class RoutesTable extends Component {
    constructor() {
        super()
        this.state = {
            origin: '',
            destination: '',
            price: '',
            change: false,
            open: false
        }
        this.changeChange = this.changeChange.bind(this)
        this.changeOrigin = this.changeOrigin.bind(this)
        this.changeDestination = this.changeDestination.bind(this)
        this.changePrice = this.changePrice.bind(this)
        this.saveChange = this.saveChange.bind(this)
        this.deleteRoute = this.deleteRoute.bind(this)
        this.handleClickOpen = this.handleClickOpen.bind(this)
        this.handleClose= this.handleClose.bind(this)
    }

    componentDidMount() {
        const { origin, destination, price } = this.props.route
        this.setState({
            origin, destination, price
        })
    }

    changeChange() {
        this.setState({ change: !this.state.change })
    }

    changeOrigin(e) {
        this.setState({ origin: e.target.value })
    }

    changeDestination(e) {
        this.setState({ destination: e.target.value })
    }

    changePrice(e) {
        this.setState({ price: e.target.value })
    }

    saveChange() {
        console.log(this.props)
        const { routeid, userid } = this.props.route
        const { origin, destination, price } = this.state
        axios.put(`/route/${routeid}`, { origin, destination, price }).then(res => {
            // console.log(res.data)
            this.setState({ change: false })
            this.props.getRoutes(userid)
        })
    }

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        console.log(this.props)
        this.setState({ open: false });
    };    

    deleteRoute() {
        console.log(this.props)
        const { route } = this.props
        const { routeid, userid} = route
        axios.delete(`/route/${routeid}`).then(res => { this.props.getRoutes(userid) })
    }

    render() {
        const { route } = this.props
        const {routeid, origin, destination}= route
        console.log(route)
        return (
            <div>
                {!this.state.change ?
                    route.newmatch ? 
                    <div className={route.newmatch ? 'tableRow match' : 'tableRow'}>
                        {/* <div className="bigColumnBlock"> */}
                        <Link to={`/found/${routeid}/${origin}/${destination}`} className='link'>
                            <div className='column'>{route.origin}</div>
                            <div className='column'>{route.destination}</div>
                            <div className='column'>${route.price}</div>
                        </Link>
                        {/* </div> */}
                        <div className='columnSmall'>
                            <button className='tableButton' onClick={this.changeChange}>Change</button>
                        </div>
                        <div className='columnSmall'>
                            <button className='tableButton'
                            onClick={this.handleClickOpen}
                                // onClick={this.deleteRoute}
                            >Delete</button>
                        </div>
                    </div> 
                    :
                    <div className={route.newmatch ? 'tableRow match' : 'tableRow'}>
                    <div className='column'>{route.origin}</div>
                    <div className='column'>{route.destination}</div>
                    <div className='column'>${route.price}</div>
                    <div className='columnSmall'>
                        <button className='tableButton' onClick={this.changeChange}>Change</button>
                    </div>
                    <div className='columnSmall'>
                        <button className='tableButton'
                        onClick={this.handleClickOpen}
                            // onClick={this.deleteRoute}
                        >Delete</button>
                    </div>
                </div> 
                    :
                    <div className='tableRow' >
                        <div className='column'><input type="text" className='changeInput' placeholder={route.origin} onChange={this.changeOrigin} /></div>
                        <div className='column'><input type="text" className='changeInput' placeholder={route.destination} onChange={this.changeDestination} /></div>
                        <div className='column'><input type="text" className='changeInput' placeholder={`$ ${route.price}`} onChange={this.changePrice} /></div>
                        <div className='columnSmall'>
                            <button className='tableButton' onClick={this.saveChange}>Save</button>
                        </div>
                        <div className='columnSmall'>
                            <button className='tableButton' onClick={this.changeChange}>Cancel</button>
                        </div>
                    </div>

                }

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
                                {"Are you sure you want to delete this route?"}
                            </DialogTitle>
                            {/* <DialogContent>
                                <DialogContentText id="alert-dialog-slide-description">
                                Thanks for using our site! Become a Pro member to have us keep an eye on more than 3 routes at a time. It'll only cost you $25 a year!
                                </DialogContentText>
                            </DialogContent> */}
                            <DialogActions>
                                <button className='deleteCheck cancel' onClick={this.handleClose} color="primary">
                                Cancel
                                </button>
                                <button className='deleteCheck' onClick={this.deleteRoute}>I'm sure</button>
                            </DialogActions>
                            </Dialog>
                        </div>
            </div>
        )
    }
}

