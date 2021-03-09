import React, { useState, useEffect } from 'react'
import { Container, Form, Row, Col, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import QuotesService from '../../../service/quotes.service'

function EditQuotePost(props) {

    const [quoteInfo, setQuoteInfo] = useState('')
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const quotesService = new QuotesService()
    const quote_id = props.match.params._id

    useEffect(() => {
        quotesService.findOne(quote_id)
        .then(response => {
            setQuoteInfo(response.data)
            setLoading({loading: false})
        })
        .catch(err => console.log(err))
    }, [])

    function deleteQuote(){
        quotesService.deleteQuote(quote_id)
        .then(() => {
            props.history.push('/profile')
            console.log('quote deleted')
        })
        .catch(err => console.log(err))
    }

    function handleSubmit() {
        quotesService.editQuote(quote_id, quoteInfo)
        .then(() => {
            props.history.push('/profile')
            console.log('quote edited')
        })
    }

    return (
        <Container>
            <h5>Edit Quote</h5>

            <Form onSubmit={e => handleSubmit(e)}>
                <Form.Group>
                    <Form.Label>Quote</Form.Label>
                        <Form.Control as="textarea" name="quote" value={quoteInfo.quote} onChange={(e) => setQuoteInfo({...quoteInfo, quote: e.target.value})} rows={3} />
                </Form.Group>

                <Row>
                    <Col>
                        <Form.Group>
                            <Form.Label>Author</Form.Label>
                            <Form.Control type="text" name="author" value={quoteInfo.author} onChange={(e) => setQuoteInfo({...quoteInfo, author: e.target.value})} />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group>
                            <Form.Label>Source</Form.Label>
                            <Form.Control type="text" name="source" value={quoteInfo.source} onChange={(e) => setQuoteInfo({...quoteInfo, source: e.target.value})} />
                        </Form.Group>   
                    </Col>
                </Row>

                {
                    error && <span>Not able to create meeting</span>
                }

                <Button block variant="dark" type="submit">Edit</Button>
            </Form>

            <Button block variant="outline-danger" onClick={() => deleteQuote()}>Delete</Button>
            <Link to={`/profile`} className="btn btn-dark">Go back</Link>

        </Container>
    )
}

export default EditQuotePost
