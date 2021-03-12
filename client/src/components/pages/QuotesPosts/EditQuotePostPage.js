import React, { useState, useEffect } from 'react'
import { Container, Form, Row, Col, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import QuotesService from '../../../service/quotes.service'
import editIcon from '../../../images/edit-icon.jpg'


import './EditQuotePost.css'

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
        })
        .catch(err => console.log(err))
    }

    function handleSubmit() {
        quotesService.editQuote(quote_id, quoteInfo)
        .then(() => {
            props.history.push('/profile')
        })
    }

    return (
        <Container fluid>
            <Row>

            <Col className="container-edit align-items-center" lg={{ span: 8, offset: 2 }}>

                <Form onSubmit={e => handleSubmit(e)}>
                <h5><img src={editIcon} alt="edit-icon" />Edit Quote</h5>
                        <hr />
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
                        error && <span>Not able to edit quote</span>
                    }

                    <Button block className="btn-edit" variant="light" type="submit">Edit</Button>
                    <Button block variant="outline-danger" onClick={() => deleteQuote()}>Delete</Button>
                    <Link to={`/profile`} className="btn btn-info btn-back">Go back</Link>
                </Form>
            </Col>

            </Row>


        </Container>
    )
}

export default EditQuotePost
