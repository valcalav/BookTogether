import React from 'react'
import { Container, Form, Button } from 'react-bootstrap'

export default function FindBook(props) {
    const { handleSubmit,
            books,
            handleBookChoice,
            setSearchBook,
            searchBook,
            handlePagination
            } = props
    return (
        <div>
           <Form onSubmit={(e) => handleSubmit(e)}>
                <Form.Group>
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" name="title" value={searchBook.title} placeholder="Search by title..." onChange={(e) => setSearchBook({title: e.target.value})} />
                    <Form.Text className="text-muted">
                    Search by title.
                    </Form.Text>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Author</Form.Label>
                    <Form.Control type="text" name="author" value={searchBook.author} placeholder="Search by Author" onChange={(e) => setSearchBook({author: e.target.value})} />
                </Form.Group>

                <Button variant="primary" type="submit">Search</Button>
            </Form>
            <div>
                {books && books.map((book, idx)=> {
                    console.log(book)
                    return(
                        <div>
                            <p>{book.volumeInfo.title}</p>
                            <button onClick={() => handleBookChoice(book.volumeInfo.title, book.volumeInfo.authors, book.volumeInfo.imageLinks.thumbnail)}>Select</button>
                        </div>
                    ) 
                })}
                <button onClick={(e)=> handlePagination(e)} >Back</button>
                <button onClick={(e)=> handlePagination(e)}>Next</button>
            </div>
        </div>
    )
}
