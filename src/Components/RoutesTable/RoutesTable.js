import React, {Component} from 'react';
import axios from 'axios';

export default class RoutesTable extends Component{
    constructor(){
        super()
        this.state={
            origin: '',
            destination: '',
            price:'',
            change: false
        }
        this.changeChange=this.changeChange.bind(this)
        this.changeOrigin=this.changeOrigin.bind(this)
        this.changeDestination=this.changeDestination.bind(this)
        this.changePrice=this.changePrice.bind(this)
        this.saveChange=this.saveChange.bind(this)
        this.deleteRoute=this.deleteRoute.bind(this)
    }

    componentDidMount(){
        const {origin, destination, price}=this.props.route
        this.setState({
            origin, destination, price
        })
    }

    changeChange(){
        this.setState({change: !this.state.change})
    }

    changeOrigin(e){
        this.setState({origin: e.target.value})
    }

    changeDestination(e){
        this.setState({destination: e.target.value})
    }

    changePrice(e){
        this.setState({price: e.target.value})
    }

    saveChange(){
        console.log(this.props)
        const{routeid, userid} =this.props.route
        const {origin, destination, price} =this.state
        axios.put(`/route/${routeid}`, {origin, destination, price}).then(res=>{
            // console.log(res.data)
            this.setState({change:false})
            this.props.getRoutes(userid)
        })
    }

    deleteRoute(){
        console.log(this.props)
        const {route} = this.props
        const {routeid, userid} =route
        axios.delete(`/route/${routeid}`).then(res=>{this.props.getRoutes(userid)})
    }

    render(){
        const {route}=this.props
        return(
            <div>
            {!this.state.change ? 
            <div className='tableRow' >
                <div className='column'>{route.origin}</div>
                <div className='column'>{route.destination}</div>
                <div className='column'>${route.price}</div>
                <div className='columnSmall'>
                    <button className='tableButton' onClick={this.changeChange}>Change</button>
                </div>
                <div className='columnSmall'>
                    <button className='tableButton' 
                    onClick={this.deleteRoute}
                    >Delete</button>
                </div>
            </div> : 
               <div className='tableRow' >
               <div className='column'><input type="text" className='changeInput' placeholder={route.origin} onChange={this.changeOrigin} /></div>
               <div className='column'><input type="text" className='changeInput' placeholder={route.destination} onChange={this.changeDestination}/></div>
               <div className='column'><input type="text" className='changeInput' placeholder={'$' +`${route.price}`} onChange={this.changePrice}/></div>
               <div className='columnSmall'>
                   <button className='tableButton' onClick={this.saveChange}>Save</button>
               </div>
               <div className='columnSmall'>
                   <button className='tableButton' onClick={this.changeChange}>Cancel</button>
               </div>
           </div> 

        }
            </div>
        )
    }
}