import { Col, Card, ButtonGroup } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function MyClubsCard({clubInfo}) {
    const {bookAuthor, imgBookCover, bookClubName, bookTitle, startDate, _id} = clubInfo
    return (
        <Col md={5}>
            <Card className="clubs-card">
                <Card.Img variant="top" src={imgBookCover} />
                <Card.Body>
                    <h6>{bookClubName}</h6>
                    <hr />
                    <p><strong>{bookTitle}</strong> - {bookAuthor} </p>
                    <small>Start date: {startDate} </small>

                    <ButtonGroup size="sm" style={{ width: '100%' }}>
                        <Link to={`/edit-club/${_id}`} className="btn btn-dark">Edit</Link>
                    </ButtonGroup>

                </Card.Body>
            </Card>
        </Col>
    )
}

export default MyClubsCard