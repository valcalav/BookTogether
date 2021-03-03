import React, { Component } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import GenreList from '../Genres-list/GenresList'

import BookClubService from '../../../service/bookclubs.service'


export class BookClubDetails extends Component {

constructor() {
    super()
    this.state = {
        bookClub: undefined
    }
    this.bookClubService = new BookClubService()
}

componentDidMount() {
    const bookClub_id = this.props.match.params.bookClub_id

    this.bookClubService
        .getBookClubDetails(bookClub_id)
        .then(response => this.setState({ bookClub: response.data }))
        .catch(err => console.log(err))
}

    render() {

        const { bookClub } = this.state

        return (
            <>
            <div className="find-club-title">
                <h3>Find and Join a Book club</h3>
            </div>
            <Container>
                <Row>
                    <GenreList />
                    <Col md={6} >

                    { this.state.bookClub
                        ?
                            <>
                            <img src={bookClub.imgBookCover} ></img>
                            <h4>{bookClub.bookClubName}</h4>
                            <p> "{bookClub.bookTitle}" by {bookClub.bookAuthor} </p>
                            <p> {bookClub.description} </p>
                            <p> Genre: {bookClub.genre} </p>
                            <p> Duration: {bookClub.duration} </p>
                            <p> Language: {bookClub.language} </p>
                            <p> Start date: {bookClub.startDate} </p>
                            </>
                        :
                        null
                    }

                    <Link to="#" className="btn btn-dark">Join Club</Link>

                    <Link to="/bookclubs-list" className="btn btn-dark">Go back</Link>

                    </Col>
                </Row>

            </Container>
            </>
        )
    }
}

export default BookClubDetails
