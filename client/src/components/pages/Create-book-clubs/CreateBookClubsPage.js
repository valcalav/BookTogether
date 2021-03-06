import React, { useState, useEffect } from 'react'
import { Container, Form, Button, Card, Row, Col } from 'react-bootstrap'

import FindBook from './FindBook'

import GBookService from '../../../service/books.api'
import BookClubsService from '../../../service/bookclubs.service'

import { GenresArr } from '../../shared/AllGenres'


export default function CreateBookClubs(props) {
    const gBookService = new GBookService()
    const bookClubsService = new BookClubsService()
    
    const [searchBook, setSearchBook] = useState({
        author:'',
        title: ''
    })
    const [createClubForm, setCreateClubForm] = useState({
        bookClubName: '',
        bookTitle: '',
        bookAuthor: '',
        genre: 'fantasy',
        startDate: '',
        duration:'4 weeks',
        recurrence:'once a week',
        language:'english',
        description:'',
        imgBookCover:'',
    })
    const [books, setBooks] = useState([])
    const [currentPage, setCurrentPage] = useState(0)
    const [numResults, setNumResults] = useState(0)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const [step, setStep] = useState('FindBook')
    const [chosenBook, setChosenBook] = useState({
        bookTitle:'',
        bookAuthor:'',
        imgBookCover:''
    })
    
    function handleSubmit(e) {
        const MAX_RESULT = 6
        if (e) { e.preventDefault() } 
        setLoading(true)

        gBookService.getByAuthor(searchBook.author, currentPage, MAX_RESULT)
            .then(res => {
                const fetchedBooks = res.data.items
                setBooks(fetchedBooks)
                setNumResults(fetchedBooks.totalItems)
                setLoading(false)
            })
            .catch(err => {
                setError(err)
            })
    }

    useEffect(() => {
        if (searchBook.author || searchBook.title) { handleSubmit() }
    }, [currentPage])

    function handleBookChoice(bookTitle, bookAuthor, imgBookCover) {
        const selectedBook = {
            bookTitle,
            bookAuthor,
            imgBookCover
        }
        setChosenBook(selectedBook)
        setCreateClubForm({...createClubForm, bookTitle: bookTitle, bookAuthor: bookAuthor, imgBookCover: imgBookCover})
        setStep('CreateClub')
    }

    function handlePagination(e){
        e.preventDefault()
        const buttonName = e.target.innerText
            if ( buttonName === "Next" ) {
              setCurrentPage(currentPage +6)    
            } else {
                if ( currentPage !== 0) {
                    setCurrentPage(currentPage -6)
                }
        }
    }

    function handleSubmitForm(e) {
        e.preventDefault()
        bookClubsService
            .newBookClub(createClubForm)
            .then(()=> {
                this.props.history.push('/bookclubs-list')
            })
            .catch(err => {
                console.log("error", err)
                setError(err)
            })
    }

    return (
        <div>
        {step === 'FindBook' && !loading ? 
            <FindBook
                handleSubmit={handleSubmit}
                searchBook={searchBook}
                setSearchBook={setSearchBook}
                books={books}
                setStep={setStep}
                step={step}
                handleBookChoice={handleBookChoice}
                handlePagination={handlePagination}
            />
            :
            <div>

            <Container >
                <Form onSubmit={e => handleSubmitForm(e)}>

                    {

                    chosenBook.bookTitle || chosenBook.bookAuthor || chosenBook.imgBookCover
                        ?
                        <Card style={{ width: '500px' }}>
                            <Row>
                                <Col md={5} lg={5}  >
                                <Card.Img variant="top" src={chosenBook.imgBookCover} alt="book cover" />
                                </Col>
                                <Col>
                                <Card.Body>
                                    <Card.Title>Book title: "{chosenBook.bookTitle}"</Card.Title>
                                    <Card.Text>
                                        Authors:
                                        {chosenBook.bookAuthor.map((author, idx) => {
                                            return <p key={idx} >- {author}</p>
                                        })}
                                    </Card.Text>
                                    <Button variant="primary" onClick={() => setStep('FindBook')} >Change Book</Button>
                                </Card.Body>
                                </Col>
                            </Row>
                        </Card>
                        :
                        <>
                        <h4>What will the club read?</h4>
                        <Form.Group>
                            <Form.Label>Title of the Book the club will read</Form.Label>
                            <Form.Control type="text" name="bookTitle" value={createClubForm.bookTitle} onChange={(e) => setCreateClubForm({...createClubForm, bookTitle: e.target.value})}/>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Author of the book</Form.Label>
                            <Form.Control type="text" name="bookAuthor" value={createClubForm.bookAuthor} onChange={(e) => setCreateClubForm({...createClubForm, bookAuthor: e.target.value})} />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Book cover image URL</Form.Label>
                            <Form.Control type="text" name="imgBookCover" value={createClubForm.imgBookCover} onChange={(e) => setCreateClubForm({...createClubForm, imgBookCover: e.target.value})} />
                        </Form.Group>
                        </>
                        
                    }

                    <hr />
                    <Form.Group>
                        <Form.Label>Book Club's Name</Form.Label>
                        <Form.Control type="text" name="bookClubName" value={createClubForm.bookClubName} onChange={(e) => setCreateClubForm({...createClubForm, bookClubName: e.target.value})} />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Choose the book genre</Form.Label>
                        <Form.Control as="select" name="genre" value={createClubForm.genre} onChange={(e) => setCreateClubForm({...createClubForm, genre: e.target.value})}>
                            {GenresArr.map(elm => <option>{elm}</option>)}
                        </Form.Control>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Write a brief description of the Book Club's goal. Is there a main theme to the discussions? Will the discussions have a social or political focus? Is there a specific edition you would rather the participants read? Will other works by the same author be an important part of the conversations?</Form.Label>
                        <Form.Control as="textarea" name="description" value={createClubForm.description} onChange={(e) => setCreateClubForm({...createClubForm, description: e.target.value})} rows={3} />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>When will the book club begin?</Form.Label>
                        <Form.Control type="date" name="startDate" value={createClubForm.startDate} onChange={(e) => setCreateClubForm({...createClubForm, startDate: e.target.value})} />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>What is the duration of the Book Club?</Form.Label>
                        <Form.Control value={createClubForm.duration} as="select" name="duration" onChange={(e) => setCreateClubForm({...createClubForm, duration: e.target.value})} >
                            <option >4 weeks</option>
                            <option >5 weeks</option>
                            <option >6 weeks</option>
                            <option >7 weeks</option>
                            <option >8 weeks</option>
                            <option >3 months</option>
                            <option >6 months</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>How often will the club meet?</Form.Label>
                        <Form.Control value={createClubForm.recurrence} as="select" name="recurrence" onChange={(e) => setCreateClubForm({...createClubForm, recurrence: e.target.value})} >
                            <option>once a week</option>
                            <option>twice a week</option>
                            <option>every two weeks</option>
                            <option>once a month</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>In what language will the book meetings be?</Form.Label>
                        <Form.Control value={createClubForm.language} as="select" name="language" onChange={(e) => setCreateClubForm({...createClubForm, language: e.target.value})} >
                            <option>english</option>
                            <option>spanish</option>
                            <option>portuguese</option>
                            <option>french</option>
                        </Form.Control>
                    </Form.Group>
                    
                    {
                        error && <span>Not able to create book Club</span>
                    }
                        <Button variant="dark" block type="submit">Create Book Club</Button>

                </Form>
            </Container>

            </div>
        }
        </div>
    )
}
