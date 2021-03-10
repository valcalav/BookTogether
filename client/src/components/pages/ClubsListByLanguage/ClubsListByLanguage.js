import React, { Component } from 'react'
import { Container, Row, Col } from 'react-bootstrap'

import GenreList from '../Genres-list/GenresList'
import LanguageList from '../LanguageList/LanguageList'
import BookClubCard from '../Clubs-list-all/BookClubCard'

import BookClubsService from '../../../service/bookclubs.service'

class BookClubsByLanguage extends Component {

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
        const {language} = this.props.match.params
    
        this.bookClubsService
            .getAllBookClubsByLanguage(language)
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
        const {bookClubs} = this.state

        return (
            <>
            <div className="find-club-title">
                <h3>Find and Join a Book club</h3>
            </div>
            <Container>
                <Row>
                    <Col lg={5}>
                        <GenreList />
                        <LanguageList />
                        
                    </Col>
                    <Col>
                        <Row>
                        {
                            bookClubs ? this.paginate(bookClubs.map(elm => <BookClubCard {...elm} key={elm._id} />)) : null
                        }
                        </Row>

                            <button 
                                onClick={ ()=> this.decreasePagination() }
                                disabled={this.state.currentFirstBookClub === 0}>Back
                            </button>
                            <button 
                                onClick={ ()=> this.increasePagination() } 
                                disabled={this.state.currentPage === Math.ceil(this.state.bookClubs.length / this.state.bookClubsPerPage) -1}>Next
                            </button>

                    </Col>
                </Row>
            </Container>
            </>
        )
    }
}

export default BookClubsByLanguage