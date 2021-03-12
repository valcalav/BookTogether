import React, { useState, useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'

import './BestsellersPage.css'

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
            })
            .catch(err => setError(err))

        nytBooksService.getNonFictionBestsellers()
            .then(response => {
                setBestsellersNonFiction(response.data.results)
                setLoading(false)
            })
            .catch(err => setError(err))

    }, [])


    return (
        <div>
            <h1 className="bestseller-title">NYTimes Best sellers</h1>
            <Container>
                <Row>
                    <Col>
                        <h3>Fiction Best sellers:</h3>
                        {
                            bestsellersFiction && bestsellersFiction.map((elm, idx) => {
                                return <article key={idx} >
                                <h6>{elm.rank}. "{elm.book_details[0].title}" by {elm.book_details[0].author}</h6>
                                <p className="description">{elm.book_details[0].description}</p>
                                <p>Publisher: {elm.book_details[0].publisher}</p>
                                <p>{elm.weeks_on_list} weeks on the list</p>
                                <hr />

                                </article>
                            })
                        }
                    </Col>
                    <Col>
                    <h3>Non-Fiction Best sellers:</h3>
                    {
                        bestsellersNonFiction && bestsellersNonFiction.map((elm, idx) => {
                            return <article key={idx} >
                            <h6>{elm.rank}. "{elm.book_details[0].title}" by {elm.book_details[0].author}</h6>
                            <p className="description">{elm.book_details[0].description}</p>
                            <p>Publisher: {elm.book_details[0].publisher}</p>
                            <p>{elm.weeks_on_list} weeks on the list</p>
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
