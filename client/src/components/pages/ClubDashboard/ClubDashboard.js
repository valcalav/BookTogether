import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Card, ButtonGroup, Spinner } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import MeetingsCard from '../Club-meetings/MeetingsCard'
import CreateMeetingModal from '../Club-meetings/CreateMeetingModal'


import BookClubService from '../../../service/bookclubs.service'
import MeetingService from '../../../service/meeting.service'


function ClubDashboard(props) {
    
    const [bookClubInfo, setBookClubInfo] = useState('')
    const [loading, setLoading] = useState(false)
    const [modalShow, setModalShow] = useState(false)
    const [clubMeetings, setClubMeetings] = useState([])
    
    const bookClubService = new BookClubService()
    const meetingService = new MeetingService()
    
    useEffect(  () => {
        const bookClub_id = props.match.params.bookClub_id
        
        bookClubService.getBookClubDetails(bookClub_id)
            .then(response => {
                setBookClubInfo(response.data)
                setLoading({loading: true})
            })
            .catch(err => console.log(err))

        meetingService.findMeetings(bookClub_id)
            .then(response => {
                console.log('RESPUESTA DE BUSQUEDA MEETINGS: ', response.data)
                setClubMeetings([response.data])
            })

    }, [])
    
    return (
        <div>
            {
                !loading ?
                <div>

                <Spinner animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                </Spinner> 
                </div>
                :
                <div>
                    <h3>Club Page: { bookClubInfo.bookClubName }</h3>
                    <Container>
                        <Row>
                            <Col lg={4}>
                                <Card>
                                    <Card.Img variant="top" src={bookClubInfo.imgBookCover} />
                                    <Card.Body>
                                        <h4>Book: {bookClubInfo.bookTitle}</h4>
                                        <p>Authors: {bookClubInfo.bookAuthor}</p>
                                        <p>Genre: {bookClubInfo.genre}</p>
                                        <hr />
                                        <p>Start date: {bookClubInfo.startDate}</p>
                                        <p>Duration: {bookClubInfo.duration}</p>
                                        <p>Members: </p>

                                        <ButtonGroup size="sm" style={{ width: '100%' }} >
                                            <Link to='#' className="btn btn-outline-danger">Leave club</Link>
                                        </ButtonGroup>

                                    </Card.Body>
                                </Card>
                            </Col>

                            <Col lg={8}>
                                <Row>
                                    <Col lg={12}>
                                        <Card>
                                            <Card.Header>About the club</Card.Header>
                                            <Card.Body>
                                                <Card.Text>
                                                {bookClubInfo.description}
                                                </Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                    <Col>
                                        <MeetingsCard setModalShow={setModalShow} />
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Container>

                    {
                        modalShow && <CreateMeetingModal {...props} show={modalShow} setModalShow={setModalShow} onHide={() => setModalShow(false)}/>
                    }

                </div>
            }
        </div>
    )
}

export default ClubDashboard