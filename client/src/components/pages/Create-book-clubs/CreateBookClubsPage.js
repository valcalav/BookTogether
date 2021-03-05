import React, { useState, useEffect } from 'react'
import { Container, Form, Button } from 'react-bootstrap'

import FindBook from './FindBook'

import GBookService from '../../../service/books.api'


export default function CreateBookClubs() {
    const gBookService = new GBookService()
    
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
        genresArr:["fantasy", "science fiction", "dystopian", "action and adventure", "mystery", "horror", "thriller and suspense", "historical fiction", "romance", "womens fiction", "LGBTQ+", "classics", "contemporary fiction", "plays and screenplays", "poetry", "literary fiction", "magical realism", "comics and graphic novels", "short story", "young adult", "new adult", "childrens literature", "memoir and autobiography", "biography", "food and drink", "art and photography", "self-help", "history", "travel", "true crime", "humor", "essays", "guide how-to", "religion and spirituality", "humanities and social sciences", "parenting and families", "science and technology"]
    })
    const [books, setBooks] = useState([])
    const [currentPage, setCurrentPage] = useState(0)
    const [numResults, setNumResults] = useState(0)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const [step, setStep] = useState('FindBook')
    const [chosenBook, setChosenBook] = useState({
        title:'',
        authors:'',
        image:''
    })
    
    function handleSubmit(e) {
        const MAX_RESULT = 6
        if (e) {e.preventDefault() } 
        setLoading(true)
        gBookService.getByAuthor(searchBook.author, currentPage, MAX_RESULT)
            .then(res => {
                // console.log(res)
                const fetchedBooks = res.data.items
                setBooks(fetchedBooks)
                setNumResults(fetchedBooks.totalItems)
                setLoading(false)
            })
            .catch(err => {
                // console.log(err)
                setError(err)
            })
    }
    useEffect(() => {
        if (searchBook.author || searchBook.title) { handleSubmit() }
    }, [currentPage])

    function handleBookChoice(title, authors, image) {
        const selectedBook = {
            title,
            authors,
            image
        }
        setChosenBook(selectedBook)
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

//TODO LO QUE TENGO A PARTIR DE LA LINEA 101 VA A SER OTRO COMPONENTE
    return (
        <div>
        {step === 'FindBook' && !loading ? 
            <FindBook
                handleSubmit={handleSubmit}
                searchBook={searchBook}
                setSearchBook={setSearchBook}
                books={books}
                handleSubmit={handleSubmit}
                setStep={setStep}
                step={step}
                handleBookChoice={handleBookChoice}
                handlePagination={handlePagination}
            /> :
            <div>

            <Container >
                <Form onSubmit={e => handleSubmit(e)}>
                    <Form.Group>
                        <Form.Label>Book Club's Name</Form.Label>
                        <Form.Control type="text" name="bookClubName" value={createClubForm.bookClubName} />
                    </Form.Group>

                    {
                        chosenBook.title
                        ? 
                        <p>Book title: "{chosenBook.title}"</p>
                        :
                        <Form.Group>
                            <Form.Label>Title of the Book the club will read</Form.Label>
                            <Form.Control type="text" name="bookTitle" value={createClubForm.bookTitle} />
                        </Form.Group>
                    }

                    {
                        chosenBook.authors
                        ?
                        <>
                        <p>Authors:</p>
                        {chosenBook.authors.map((author, idx) => {
                            return <p key={idx} >- {author}</p>
                        })}
                        </>
                        :
                        <Form.Group>
                            <Form.Label>Author of the book</Form.Label>
                            <Form.Control type="text" name="bookAuthor" value={createClubForm.bookAuthor} />
                        </Form.Group>
                    }

                    <Form.Group>
                        <Form.Label>Choose the book genre</Form.Label>
                        <Form.Control value={createClubForm.genre} as="select" name="genre" >
                            {createClubForm.genresArr?.map(elm => <option>{elm}</option>)}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Write a brief description of the Book Club's goal. Is there a main theme to the discussions? Will the discussions have a social or political focus? Is there a specific edition you would rather the participants read? Will other works by the same author be an important part of the conversations?</Form.Label>
                        <Form.Control as="textarea" name="description" value={createClubForm.description} rows={3} />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>When will the book club begin?</Form.Label>
                        <Form.Control type="date" name="startDate" value={createClubForm.startDate} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>What is the duration of the Book Club?</Form.Label>
                        <Form.Control value={createClubForm.duration} as="select" name="duration" >
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
                        <Form.Control value={createClubForm.recurrence} as="select" name="recurrence" >
                            <option>once a week</option>
                            <option>twice a week</option>
                            <option>every two weeks</option>
                            <option>once a month</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>In what language will the book meetings be?</Form.Label>
                        <Form.Control value={createClubForm.language} as="select" name="language" >
                            <option>english</option>
                            <option>spanish</option>
                            <option>portuguese</option>
                            <option>french</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Book cover image URL</Form.Label>
                        <Form.Control type="text" name="imgBookCover" value={createClubForm.imgBookCover} />
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
