import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import './Found.css'
import QuotesTable from '../QuotesTable/QuotesTable'

class Found extends Component {
    constructor() {
        super()
        this.state = {
            quotes: []
        }
    }
    componentDidMount() {
        console.log(this.props)
        const routeid = this.props.match.params.id
        if (!this.props.id) {
            axios.get('/auth/me').catch(err => {
                this.props.history.push('/')
            })

        }
        axios.get(`/quotes/${routeid}`).then(res => {
            console.log(res.data[0].quotematches)
            let quotes = res.data[0].quotematches
            this.setState({ quotes })
            console.log(this.state)
        })
    }



    render() {
        const { quotes } = this.state
        const { origin, destination } = this.props.match.params
        console.log(quotes)
        return (
            <div className='matchesBox'>
                <div className='HomeBox'>

                    <div className='HeaderBox'>
                        <h1 className='thanks'>Match Details</h1>
                        <h3 className='quoteDescription'>{`for your route from ${origin} to ${destination}`}</h3>

                        <div className="quotesTable">
                            <div className="foundHeader">
                                <h2 className='column'>Departure <br /> Date</h2>
                                <h2 className='column'>Departure <br />Airline</h2>
                                <h2 className='column'>Return <br /> Date</h2>
                                <h2 className='column'>Return <br />Airline</h2>
                                <h2 className='column'>Price</h2>
                            </div>
                        </div>
                        {quotes.map(quote => {
                            return (
                                <QuotesTable quote={quote}
                                    key={quote.QuoteId} />
                            )
                        })}
                    </div>
                        <h3 className='book'>Use your favorite booking service to book while prices last!</h3>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return state
}

export default connect(mapStateToProps)(Found)