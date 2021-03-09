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
        }

        this.bookClubsService = new BookClubsService()
    }

    componentDidMount() {
        this.loadClubs()
    }
    
    loadClubs() {
        
        const {language} = this.props.match.params
        console.log("funciona bien", language)
    
        this.bookClubsService
            .getAllBookClubsByLanguage(language)
            .then(response => {
                console.log("RESPUESTA DE BUSQUEDA!:", {...response.data})
                this.setState({ bookClubs: response.data })
            })
            .catch(err => console.log(err))
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
                    <Col>
                        <GenreList />
                        <LanguageList />
                        
                    </Col>
                    {
                        bookClubs ? bookClubs.map(elm => <BookClubCard {...elm} key={elm._id} />) : null
                    }
                </Row>
            </Container>
            </>
        )
    }
}

export default BookClubsByLanguage