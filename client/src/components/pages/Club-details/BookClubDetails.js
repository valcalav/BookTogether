import React, { Component } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import GenreList from '../Genres-list/GenresList'
import LanguageList from '../LanguageList/LanguageList'

import './BookClubDetails.css'
import '../Clubs-list-all/bookClubs.css'


import BookClubService from '../../../service/bookclubs.service'
import ReaderService from '../../../service/reader.service'

export class BookClubDetails extends Component {

constructor(props) {
    super(props)
    this.state = {
        bookClub: undefined,
    }

    this.bookClubService = new BookClubService()
    this.readerService = new ReaderService()
}

componentDidMount() {
    this.BookDetails()
}

BookDetails() {
    const bookClub_id = this.props.match.params.bookClub_id
    
    this.bookClubService
        .getBookClubDetails(bookClub_id)
        .then(response => this.setState({ bookClub: response.data }))
        .catch(err => console.log(err))
}

joinClub() {
    const bookClub_id = this.props.match.params.bookClub_id

    this.readerService
        .joinBookClub(bookClub_id)
        .then((response) => {
            this.props.fetchUser()
            this.props.history.push('/bookclubs-list')
        })
        .catch(err => console.log(err))       
}

    render() {
        const {bookClub} = this.state

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
                    
                    <Col md={{ span: 7, offset: 3, pull: 1 }} >

                    <Row>
                        { this.state.bookClub
                            ?
                            <>
                            <Col md={{ span: 4, offset: 1 }}>
                                <img src={bookClub.imgBookCover} alt="book cover"></img>
                            </Col>
                            <Col className="details-info">
                                <h6>{bookClub.bookClubName.toUpperCase()}</h6>
                                <hr />
                                <h6> "{bookClub.bookTitle}" by {bookClub.bookAuthor} </h6>
                                <p> {bookClub.description} </p>
                                <p><strong>Genre: </strong> {bookClub.genre.charAt(0).toUpperCase() + bookClub.genre.slice(1)} </p>
                                <p><strong>Duration: </strong>{bookClub.duration} </p>
                                <p><strong>Language: </strong>{bookClub.language.charAt(0).toUpperCase() + bookClub.language.slice(1)} </p>
                                <p><strong>Start date: </strong>{bookClub.startDate.slice(0,10)} </p>
                            </Col>
                            </>
                            :
                            null
                        }
                    </Row>
                    <Row>
                        {
                            this.props.loggedUser 
                            ?
                            <>
                            {
                                this.props.loggedUser._id === this.state.bookClub?.owner
                                ?
                                <Col>
                                    <Link to={`/edit-club/${bookClub._id}`} className="btn btn-light btn-edit btn-join-right">Edit</Link>
                                </Col>
                                :
                                <Col>
                                    <Link to="#" className="btn btn-info btn-join-right" onClick={() => this.joinClub()}>Join Club</Link>
                                </Col>
                            }
                            </>
                            :
                            <Col>
                                <Link to="/login" className="btn btn-info btn-join-right">Join Club</Link>
                            </Col>
                        }
                    </Row>


                    <Link to="/bookclubs-list" className="btn btn-secondary btn-back btn-back-details">Go back</Link>

                    </Col>
                </Row>

            </Container>
            </>
        )
    }
}

export default BookClubDetails
