import React, { Component } from 'react'
import { Container, Row } from 'react-bootstrap'

import GenreList from '../Genres-list/GenresList'
import BookClubsList from './Book-clubs-list'

import './book-clubs.css'

import BookClubsService from '../../../service/bookclubs.service'

export class BookClubs extends Component {

    constructor() {
        super()
        this.state = {
            bookClubs: [],
        }

        this.bookClubsService = new BookClubsService()
    }

    componentDidMount() {
        this.loadClubs()
    }

    loadClubs() {
        this.bookClubsService
            .getAllBookClubs()
            .then(response => this.setState({ bookClubs: response.data }))
            .catch(err => console.log(err))
    }

    render() {

        return (
            <>
            <div className="find-club-title">
                <h3>Find and Join a Book club</h3>
            </div>
            <Container>
                <Row>
                    <GenreList />
                    <BookClubsList bookClubs={this.state.bookClubs} />
                </Row>

            </Container>
            </>
        )
    }
}

export default BookClubs
