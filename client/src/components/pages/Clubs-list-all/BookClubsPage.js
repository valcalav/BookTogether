import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
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
        currentBookCLubs: [],
        searchedBookClubs: [],
        bookClubsPerPage: 12,
        currentFirstBookClub: 0,
        currentPage: 0,
        loading: false,
        error: null,
        bookClubsByGenre: [],
        bookClubsByLanguage: []
    })
    const [searchedBook, setSearchedBook] = useState('')

     const currentPagination = state.currentBookCLubs ? state.currentBookCLubs.slice(state.currentFirstBookClub, state.currentFirstBookClub + state.bookClubsPerPage) : []
    
    useEffect(() => {
        function loadClubs() {
            bookClubsService
            .getAllBookClubs()
            .then(response => setState({ ...state, 
                bookClubs: response.data.allEvents, 
                currentBookCLubs: response.data.allEvents  }))
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

    const handleSearch = (e)  => {
        e.preventDefault()
        const searchedBooks = state.bookClubs.filter((club) => club.bookTitle.toLowerCase().includes(searchedBook.toLowerCase()))
        setState({ ...state,
            currentBookCLubs: searchedBooks
        })
        setSearchedBook('')
    }

    function handleGenre(genre) {
        
       return bookClubsService
            .getAllBookClubsByGenre(genre.target.innerText.toLowerCase())
            .then(response => {
                setState({...state, bookClubsByGenre: response.data })
                if (response) {
                    setState({ ...state,
                        currentPage: 0,
                        currentFirstBookClub: 0,
                        currentBookCLubs:  response.data
                    })
                }
            })
            .catch(err => console.log(err))
    }

    function handleLanguage(language) {
    
        return bookClubsService
            .getAllBookClubsByLanguage(language.target.innerText.toLowerCase())
            .then(response => {
                setState({...state, bookClubsByLanguage: response.data })
                if (response) {
                    setState({ ...state,
                        currentPage: 0,
                        currentFirstBookClub: 0,
                        currentBookCLubs: response.data
                    })
                }
            })
            .catch(err => console.log(err))
     }

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
                    <Col md={{ span: 7, offset: 4, pull: 1 }}>

                        <Form onSubmit={e => handleSearch(e)}>
                        <Form.Group className="search-bar">
                            <Form.Control type='text' value={searchedBook} onChange={(e) => setSearchedBook(e.target.value)} />
                            <Button variant="info" type="submit" className="book-title-btn" >Search by book title</Button>
                        </Form.Group>
                        </Form>
                    </Col>
                    
                </Row>



                 <Row>
                    <Col md={{ span: 3, offset: 1 }}>
                        <GenreList handleGenre={handleGenre} />
                        <LanguageList handleLanguage={handleLanguage}/>
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
                                disabled={state.currentPage === Math.ceil(state.currentBookCLubs.length / state.bookClubsPerPage) -1}
                            >Next
                            </button>
                        </div>
                    </Col>
                 </Row>
             </Container>
        </>
    )
}

