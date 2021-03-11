import React, { useState, useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'

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
        bookClubsPerPage: 12,
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
                        <BookClubsList bookClubs={currentPagination} />
                        <div className="buttons-pagination" >
                            <button className="btn btn-light btn-edit btn-pagination"
                                onClick={ ()=> decreasePagination() }
                                disabled={state.currentFirstBookClub === 0} 
                            >Back
                            </button>
                            <button className="btn btn-light btn-edit btn-pagination"
                                onClick={ ()=> increasePagination() } 
                                disabled={state.currentPage === Math.ceil(state.bookClubs.length / state.bookClubsPerPage) -1}
                            >Next
                            </button>
                        </div>
                    </Col>
                 </Row>
             </Container>
        </>
    )
}

