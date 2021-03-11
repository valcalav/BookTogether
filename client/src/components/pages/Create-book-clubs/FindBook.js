import React from 'react'
import { Container, Row, Col, Form, Button, Card, Spinner, ButtonGroup } from 'react-bootstrap'

import './CreateBookClubs.css'

export default function FindBook(props) {


    const { handleSubmit,
            books,
            handleBookChoice,
            setSearchBook,
            searchBook,
            handlePagination,
            setStep,
            loading
            } = props

    const defaultImg = 'https://islandpress.org/sites/default/files/default_book_cover_2015.jpg'

    return (
        <Container>
            <Row>
                <Col className="find-book">    
                    <h4>Step 1: select the book the club will read</h4>  
                </Col>
            </Row>
           <Form onSubmit={(e) => handleSubmit(e)}>
            <Row>
                <Col>
                    <Form.Group>
                        <Form.Label>Title</Form.Label>
                        <Form.Control type="text" name="title" value={searchBook.title} placeholder="Search by title..." onChange={(e) => setSearchBook({...searchBook, title: e.target.value})} />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group>
                        <Form.Label>Author</Form.Label>
                        <Form.Control type="text" name="author" value={searchBook.author} placeholder="Search by Author" onChange={(e) => setSearchBook({...searchBook, author: e.target.value})} />
                    </Form.Group>
                </Col>
            </Row>

            <div className="search-book-buttons">
                <Button className="search-book-btn" variant="info" type="submit">Search</Button>
                <Button className="search-book-btn" variant="outline-info" onClick={()=> setStep("CreateClub")}>Can't find the book you want?</Button>
            </div>

            </Form>

            <section className="search-container" >
                <small>Search resuls:</small>
                <br />
                <Row>
                    {
                    loading ?
                    <Spinner animation="border" role="status">
                        <span className="sr-only">Loading...</span>
                    </Spinner>
                    :
                    <>
                        {books && books.map((book, idx)=> {
                            return(
                                <Col md={2}>

                                <Card className="search-card" >
                                    <Card.Img variant="top" src={book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.thumbnail} />
                                    <Card.Body className="search-card-body">
                                        <Card.Title className="card-book-title" as="h6">"{book.volumeInfo.title}"</Card.Title>
                                        <Card.Text>
                                            Authors:
                                            {book.volumeInfo.authors?.map((author, idx) => <p key={idx}>- {author}</p>)}
                                        </Card.Text>

                                        <Button className="mt-auto" variant="info" onClick={() => {
                                            if (book.volumeInfo.imageLinks) {
                                                handleBookChoice(book.volumeInfo.title, book.volumeInfo.authors, book.volumeInfo.imageLinks.thumbnail)
                                            } else { handleBookChoice(book.volumeInfo.title, book.volumeInfo.authors, defaultImg)}
                                        }}>Select</Button>
                                    </Card.Body>
                                </Card>
                                </Col>
                            ) 
                        })}
                    </>
                    }
                </Row>
                        <div className="buttons-pagination" >
                            <button className="btn btn-light btn-edit btn-pagination" onClick={(e)=> handlePagination(e)} >Back</button>
                            <button className="btn btn-light btn-edit btn-pagination" onClick={(e)=> handlePagination(e)}>Next</button>
                        </div>
            </section>
            



        </Container>
    )
}
