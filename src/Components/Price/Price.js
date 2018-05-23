import React, { Component } from 'react';
import {connect} from 'react-redux';

class Price extends Component {
    constructor(){
        super()
        this.state={

        }
    }
    componentDidMount(){
        console.log(this.props)
        if(!this.props.id){
        this.props.history.push('/')}
    }



    render(){
        return(
            <div>
                Price
            </div>
        )
    }
}

function mapStateToProps(state){
    return state
}

export default connect(mapStateToProps)(Price)