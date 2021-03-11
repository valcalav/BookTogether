import React, { Component } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import GenreList from '../Genres-list/GenresList'
import LanguageList from '../LanguageList/LanguageList'
// import Paginate from '../../shared/Paginate'
import BookClubCard from '../Clubs-list-all/BookClubCard'

import '../Clubs-list-all/bookClubs.css'

import BookClubsService from '../../../service/bookclubs.service'

class BookClubsByGenre extends Component {

    constructor() {
        super()
        this.state = {
            bookClubs: [],
            bookClubsPerPage: 8,
            currentFirstBookClub: 0,
            currentPage: 0,
            loading: false,
            error: null,
        }

        this.bookClubsService = new BookClubsService()
    }

    componentDidMount() {
        this.loadClubs()
    }
    
    loadClubs() {
        const {genre} = this.props.match.params
    
        this.bookClubsService
            .getAllBookClubsByGenre(genre)
            .then(response => {
                this.setState({ bookClubs: response.data })
            })
            .catch(err => console.log(err))
    }

    increasePagination() {
        this.setState({
            currentPage: this.state.currentPage +1,
            currentFirstBookClub: this.state.currentFirstBookClub + this.state.bookClubsPerPage
         })
    }

    decreasePagination() {
        this.setState({
            currentPage: this.state.currentPage -1,
            currentFirstBookClub: this.state.currentFirstBookClub - this.state.bookClubsPerPage
        })
    }

    paginate(clubs) {
        return clubs.slice(this.state.currentFirstBookClub, this.state.currentFirstBookClub + this.state.bookClubsPerPage)
    }



    render() {
        const { bookClubs } = this.state
        // console.log("EL STATE 2!!!", bookClubs)

        return (
            <>
            <Container fluid>
                <Row>
                    <Col className="clubs-list-header" md={{ span: 10, offset: 1, pull: 1 }}>
                        <h1>Find and Join a Book club</h1>
                        <Link to='/create-club' className="btn btn-outline-info create-btn">Create a Book Club</Link>
                    </Col>
                </Row>

                <Row>
                    <Col md={{ span: 3, offset: 1 }}>
                        <GenreList />
                        <LanguageList />
                    </Col>
                    <Col md={{ span: 7, pull: 1 }}>
                        <Row>
                        {
                            bookClubs ? this.paginate(bookClubs.map(elm => <BookClubCard {...elm} key={elm._id} />)) : null
                        }
                        </Row>
                        <div className="buttons-pagination" >

                            <button className="btn btn-light btn-edit btn-pagination"
                                onClick={ ()=> this.decreasePagination() }
                                disabled={this.state.currentFirstBookClub === 0}>Back
                            </button>
                            <button className="btn btn-light btn-edit btn-pagination" 
                                onClick={ ()=> this.increasePagination() } 
                                disabled={this.state.currentPage === Math.ceil(this.state.bookClubs.length / this.state.bookClubsPerPage) -1}>Next
                            </button>
                        </div>
                    </Col>
                </Row>
            </Container>
            </>
        )
    }
}

export default BookClubsByGenre