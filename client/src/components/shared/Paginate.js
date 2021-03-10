import React, { Component } from 'react'
import BookClubCard from '../../components/pages/Clubs-list-all/BookClubCard'


class Paginate extends Component {

    constructor(props) {
        super(props)
        this.state = {
            data: this.props.data,
            limit: 8,
            currentFirst: 0,
            currentPage: 0,
            loading: false,
            error: null,
        }
    }  

    increasePagination() {
        this.setState({
            currentPage: this.state.currentPage +1,
            currentFirst: this.state.currentFirst + this.state.limit
         })
    }

    decreasePagination() {
        this.setState({
            currentPage: this.state.currentPage -1,
            currentFirst: this.state.currentFirst - this.state.limit
        })
    }

    paginate(clubs) {
        return clubs.slice(this.state.currentFirst, this.state.currentFirst + this.state.limit)
    }

    render(){

        return (
            <div>
            <Row>
                {this.state.data ? this.paginate(this.state.data.map((elm, idx) => <BookClubCard {...elm} key={idx} />)) : null}
            </Row>
                <button onClick={ ()=> this.decreasePagination() } disabled={this.state.currentFirst === 0}>Back</button>
                <button 
                    onClick={ ()=> this.increasePagination() }
                    disabled={this.state.currentPage === Math.ceil(this.state.data.length / this.state.limit) -1}>Next
                </button>
            </div>
    )}
}

export default Paginate