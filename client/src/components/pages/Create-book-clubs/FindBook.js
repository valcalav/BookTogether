import React from 'react'
import { Form, Button } from 'react-bootstrap'

export default function FindBook(props) {
    const { handleSubmit,
            books,
            handleBookChoice,
            setSearchBook,
            searchBook,
            handlePagination,
            setStep
            } = props

    const defaultImg = 'https://islandpress.org/sites/default/files/default_book_cover_2015.jpg'

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
            <button onClick={()=> setStep("CreateClub")}>Can't find the book you want?</button>

            <div>
            <small>Search resuls:</small> <br />
                {books && books.map((book, idx)=> {
                    console.log(book)
                    return(
                        <div>
                            <p>{book.volumeInfo.title}</p>
                            {book.volumeInfo.authors.map((author, idx) => <p key={idx}>- {author}</p>)}
                            <p>Published date: {book.volumeInfo.publishedDate}</p>
                            <button onClick={() => {
                                if (book.volumeInfo.imageLinks) {
                                    handleBookChoice(book.volumeInfo.title, book.volumeInfo.authors, book.volumeInfo.imageLinks.thumbnail)
                                } else {
                                    handleBookChoice(book.volumeInfo.title, book.volumeInfo.authors, defaultImg)
                                }
                            }
                            }>Select</button>
                        </div>
                    ) 
                })}
                <button onClick={(e)=> handlePagination(e)} >Back</button>
                <button onClick={(e)=> handlePagination(e)}>Next</button>
            </div>
        </div>
    )
}
