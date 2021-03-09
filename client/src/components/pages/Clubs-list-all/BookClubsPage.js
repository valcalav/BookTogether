import React, { useState, useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'

import GenreList from '../Genres-list/GenresList'
import LanguageList from '../LanguageList/LanguageList'
import BookClubsList from './BookClubsList'

import './bookClubs.css'

import BookClubsService from '../../../service/bookclubs.service'

export default function BookClubs() {

    const bookClubsService = new BookClubsService()

    const [state, setState] = useState({
        bookClubs: [],
        searchedBookClubs: [], // FALTA HACER EL SEARCH BAR !
        bookClubsPerPage: 4,
        currentFirstBookClub: 0,
        currentPage: 0,
        loading: false,
        error: null
    })

    const currentPagination = state.bookClubs ? state.bookClubs.slice(state.currentFirstBookClub, state.currentFirstBookClub + state.bookClubsPerPage) : []

    
    const [searchTerm, setSearchTerm] = useState('')
    
    useEffect(() => {
        function loadClubs() {
            bookClubsService
            .getAllBookClubs()
            .then(response => setState({ ...state, bookClubs: response.data.allEvents }))
            .catch(err => console.log(err))
        }
        loadClubs()
    }, [])
    
    const increasePagination = () => setState({ ...state,
        currentPage: state.currentPage +1,
        currentFirstBookClub: state.currentFirstBookClub + state.bookClubsPerPage
     })
    
    const decreasePagination = () => setState({ ...state,
    currentPage: state.currentPage -1,
    currentFirstBookClub: state.currentFirstBookClub - state.bookClubsPerPage
    })


    return (
        <div>
             <div className="find-club-title">
                 <h3>Find and Join a Book club</h3>
             </div>
             <Container>
                 <Row>
                    <Col lg={5} >
                        <GenreList />
                        <LanguageList />
                    </Col>
                    <Col>
                        <BookClubsList bookClubs={currentPagination} />
                        <button 
                            onClick={ ()=> decreasePagination() }
                            disabled={state.currentFirstBookClub === 0} 
                        >Back
                        </button>
                        <button 
                            onClick={ ()=> increasePagination() } 
                            disabled={state.currentPage === Math.ceil(state.bookClubs.length / state.bookClubsPerPage) -1}
                        >Next
                        </button>
                    </Col>
                 </Row>
             </Container>
        </div>
    )
}

