import { Col, Card, ButtonGroup } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function MyClubsCard({clubInfo}) {
    const {bookAuthor, imgBookCover, bookClubName, bookTitle, startDate, _id} = clubInfo
    return (
        <Col md={3}>
            <Card className="clubs-card">
                <Card.Img variant="top" src={imgBookCover} />
                <Card.Body>
                    <h6>{bookClubName}</h6>
                    <hr />
                    <p><strong>{bookTitle}</strong> - {bookAuthor} </p>
                    <small>Start date: {startDate.slice(0,10)}</small>

                    <ButtonGroup size="sm" style={{ width: '100%' }}>
                        <Link to={`/club-dashboard/${_id}`} className="btn btn-dark">Go to Club</Link>
                    </ButtonGroup>

                </Card.Body>
            </Card>
        </Col>
    )
}

export default MyClubsCard