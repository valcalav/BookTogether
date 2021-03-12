import React, { useState } from 'react'
import {Form, Row, Col, Button} from 'react-bootstrap'

import QuotesService from '../../../service/quotes.service'

function CreateQuotePost({ refreshList, closeModal, loggedUser }) {

    const quotesService = new QuotesService()

    const [createQuote, setCreateQuote] = useState({
        quote:'',
        author:'',
        source:''
    })
    const [error, setError] = useState(null)

    function handleSubmit(e) {
        e.preventDefault()

        quotesService.newQuote(createQuote)
            .then(() => {
                closeModal()
                refreshList()
            })
            .catch(err => {
                setError(err)
            })
    }

    return (
        <div>
            <Form onSubmit={e => handleSubmit(e)}>
                <Form.Group>
                    <Form.Label>Quote</Form.Label>
                        <Form.Control as="textarea" name="quote" value={createQuote.quote} onChange={(e) => setCreateQuote({...createQuote, quote: e.target.value})} rows={3} />
                </Form.Group>

                <Row>
                    <Col>
                        <Form.Group>
                            <Form.Label>Author</Form.Label>
                            <Form.Control type="text" name="author" value={createQuote.author} onChange={(e) => setCreateQuote({...createQuote, author: e.target.value})} />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group>
                            <Form.Label>Source</Form.Label>
                            <Form.Control type="text" name="source" value={createQuote.source} onChange={(e) => setCreateQuote({...createQuote, source: e.target.value})} />
                        </Form.Group>   
                    </Col>
                </Row>

                {
                    error && <span>Not able to add quote</span>
                }

                <Button block variant="outline-info" type="submit">Create</Button>
            </Form>
        </div>
    )
}

export default CreateQuotePost
