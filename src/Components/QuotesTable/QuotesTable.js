import React, {Component} from 'react';
import './QuotesTable.css';
import moment from 'moment'

export default class QuotesTable extends Component {

    render() {
        const { quote } = this.props
        let dDate= moment(quote.OutboundLeg.DepartureDate).format("MMM D, YY")
        let rDate= moment(quote.InboundLeg.DepartureDate).format("MMM D, YY")

        return (
            <div>
                    <div className= 'tableRow'>
                        <div className='column'>{dDate}</div>
                        <div className='column'>{quote.DCarrier}</div>
                        <div className='column'>{rDate}</div>
                        <div className='column'>{quote.RCarrier}</div>
                        <div className='column'>${quote.MinPrice}</div>
                    </div> 
            </div>
        )
    }
}