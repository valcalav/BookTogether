import React, { Component } from 'react'
import { Container, Row } from 'react-bootstrap'

import GenreList from '../Genres-list/GenresList'
import BookClubCard from '../Clubs-list-all/Book-club-card'

import BookClubsService from '../../../service/bookclubs.service'

class BookClubsByGenre extends Component {

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
        
        const {genre} = this.props.match.params
        console.log("funciona bien", genre)
    
        this.bookClubsService
            .getAllBookClubsByGenre(genre)
            .then(response => {
                console.log("RESPUESTA DE BUSQUEDA!:", {...response.data})
                this.setState({ bookClubs: response.data })
            })
            .catch(err => console.log(err))
    }

    render() {
        const {bookClubs} = this.state
        console.log("EL STATE 2!!!", bookClubs)

        return (
            <>
            <div className="find-club-title">
                <h3>Find and Join a Book club</h3>
            </div>
            <Container>
                <Row>
                    <GenreList />
                    {
                        bookClubs ? bookClubs.map(elm => <BookClubCard {...elm} key={elm._id} />) : null
                    }
                </Row>
            </Container>
            </>
        )
    }
}

export default BookClubsByGenre