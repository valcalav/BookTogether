import React, { useState, useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'

import NYTBooksService from '../../../service/NYTimesBooks.service'

function BestsellersPage() {

    const [bestsellersFiction, setBestsellersFiction] = useState([])
    const [bestsellersNonFiction, setBestsellersNonFiction] = useState([])
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    const nytBooksService = new NYTBooksService()

    useEffect(() => {

        nytBooksService.getFictionBestsellers()
            .then(response => {
                setBestsellersFiction(response.data.results)
                setLoading(false)
                console.log("FICTION BOOKS", response.data.results)
            })
            .catch(err => setError(err))

        nytBooksService.getNonFictionBestsellers()
            .then(response => {
                setBestsellersNonFiction(response.data.results)
                setLoading(false)
                console.log("NON-FICTION BOOKS", response.data.results)
            })
            .catch(err => setError(err))

    }, [])


    return (
        <div>
            <h1>Aqui los bestsellers!</h1>
            <Container>
                <Row>
                    <Col>
                        <h4>Fiction Bestsellers:</h4>
                        {
                            bestsellersFiction && bestsellersFiction.map((elm, idx) => {
                                return <article key={idx} >
                                <p>Book: "{elm.book_details[0].title}" by {elm.book_details[0].author}</p>
                                <p>Rank: {elm.rank}</p>
                                <p>Weeks on the list: {elm.weeks_on_list}</p>
                                <p>Publisher: {elm.book_details[0].publisher}</p>
                                <hr />

                                </article>
                            })
                        }
                    </Col>
                    <Col>
                    <h4>Non-Fiction Bestsellers:</h4>
                    {
                        bestsellersNonFiction && bestsellersNonFiction.map((elm, idx) => {
                            return <article key={idx} >
                            <p>Book: "{elm.book_details[0].title}" by {elm.book_details[0].author}</p>
                            <p>Rank: {elm.rank}</p>
                            <p>Weeks on the list: {elm.weeks_on_list}</p>
                            <p>Publisher: {elm.book_details[0].publisher}</p>
                            <hr />

                            </article>
                        })
                    }
                        
                    </Col>
                </Row>
            </Container>

        </div>
    )
}

export default BestsellersPage
