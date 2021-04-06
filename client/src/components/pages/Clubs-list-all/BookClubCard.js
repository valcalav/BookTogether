import React from 'react'
import { Col, Card, ButtonGroup } from 'react-bootstrap'

import { Link } from 'react-router-dom'

import './bookClubs.css'

function BookClubsCard({ bookClubName, bookTitle, bookAuthor, startDate, participants, imgBookCover, _id }) {

    return (
        <Col lg={3} md={6} sm={4} xs={12} >
                <Card className="clubs-card">
                    <div>
                    <Card.Img variant="top" src={imgBookCover} />
                    </div>
                    <Card.Body className="clubs-card-body">
                        <Card.Title as="h6">{bookClubName.toUpperCase()}</Card.Title>
                        <Card.Text>
                        <strong>{bookTitle}</strong> - {bookAuthor}
                        <br />
                        Start date: {startDate.slice(0,10)}
                        </Card.Text>

                        <ButtonGroup className="mt-auto" size="sm" style={{ width: '100%' }}>
                            <Link to={`/club-details/${_id}`} className="btn btn-info">Club details</Link>
                        </ButtonGroup>

                    </Card.Body>
                </Card>
        </Col>

    )
}

export default BookClubsCard
