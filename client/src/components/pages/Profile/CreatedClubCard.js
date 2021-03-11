import { Col, Card, ButtonGroup } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './Profile.css'

function MyClubsCard({clubInfo}) {
    const {bookAuthor, imgBookCover, bookClubName, bookTitle, startDate, _id} = clubInfo
    return (
        <Col lg={3}>
            <Card className="profile-clubs-card">
                <Card.Img variant="top" src={imgBookCover} />
                <Card.Body className="club-card-body">
                    <Card.Title as="h6">{bookClubName.toUpperCase()}</Card.Title>
                    <Card.Text>
                        Start date: {startDate.slice(0,10)}
                    </Card.Text>
                    <ButtonGroup className="mt-auto" size="sm" style={{width: '100%' }}>
                        <Link to={`/club-dashboard/${_id}`} className="btn btn-info">Go to Club</Link>
                    </ButtonGroup>

                </Card.Body>
            </Card>
        </Col>
    )
}

export default MyClubsCard