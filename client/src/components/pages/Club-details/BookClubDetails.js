import React, { Component } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import GenreList from '../Genres-list/GenresList'
import './BookClubDetails.css'

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
                            <img src={bookClub.imgBookCover} alt="book cover"></img>
                            <h4>{bookClub.bookClubName}</h4>
                            <p> "{bookClub.bookTitle}" by {bookClub.bookAuthor} </p>
                            <p> {bookClub.description} </p>
                            <p> Genre: {bookClub.genre} </p>
                            <p> Duration: {bookClub.duration} </p>
                            <p> Language: {bookClub.language} </p>
                            <p> Start date: {bookClub.startDate.slice(0,10)} </p>

                        </>
                        :
                        null
                    }
                    {
                        this.props.loggedUser 
                        ?
                        <>
                        {
                            this.props.loggedUser._id === this.state.bookClub?.owner
                            ?
                            <Link to={`/edit-club/${bookClub._id}`} className="btn btn-dark">Edit</Link>
                            :
                            <Link to="#" className="btn btn-dark" onClick={() => this.joinClub()}>Join Club</Link>
                        }
                        </>
                        :
                        <Link to="/login" className="btn btn-dark">Join Club</Link>
                    }

                    <Link to="/bookclubs-list" className="btn btn-dark">Go back</Link>

                    </Col>
                </Row>

            </Container>
            </>
        )
    }
}

export default BookClubDetails
