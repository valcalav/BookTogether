import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Card, ButtonGroup, Spinner } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import ShowMeetingsCard from '../CreateClubMeetings/ShowMeetingsCard'
import CreateMeetingModal from '../CreateClubMeetings/CreateMeetingModal'

import BookClubService from '../../../service/bookclubs.service'
import MeetingService from '../../../service/meeting.service'
import ReaderService from '../../../service/reader.service'


function ClubDashboard(props) {

    const { loggedUser } = props
    //Debo hacerlo aparte porque abajo paso props completo a otro componente
    
    const [bookClubInfo, setBookClubInfo] = useState('')
    const [loading, setLoading] = useState(false)
    const [modalShow, setModalShow] = useState(false)
    const [clubMeetings, setClubMeetings] = useState([])
    
    const bookClubService = new BookClubService()
    const meetingService = new MeetingService()
    const readerService = new ReaderService()
    
    const bookClub_id = props.match.params.bookClub_id
    
    useEffect(  () => {
        
        findClub()
        findMeetings()

    }, [])

    function findClub() {
        bookClubService.getBookClubDetails(bookClub_id)
            .then(response => {
                setBookClubInfo(response.data)
                setLoading({loading: true})
            })
            .catch(err => console.log(err))
    }

    function findMeetings() {
        meetingService.findMeetings(bookClub_id)
            .then(response => {
                let data = response.data
                setClubMeetings(data)
            })
    }

    function leaveClub() {
        readerService.leaveBookClub(bookClub_id)
            .then(response => {
                console.log('Left bokclub')
                props.history.push('/')
            })
            .catch(err => console.log(err))
    }
    
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
                                        <p>Author(s): {bookClubInfo.bookAuthor.map((author, idx) => <p>- {author}</p>)}</p>
                                        <p>Genre: {bookClubInfo.genre}</p>
                                        <hr />
                                        <p>Start date: {bookClubInfo.startDate.slice(0,10)}</p>
                                        <p>Duration: {bookClubInfo.duration}</p>
                                        <p>Members: </p>

                                        <ButtonGroup size="sm" style={{ width: '100%' }} >
                                        {
                                            bookClubInfo.owner === loggedUser._id ?
                                            <Link to='#' className="btn btn-outline-danger">Edit club</Link>
                                            :
                                            <Link to='#' className="btn btn-outline-danger" onClick={() => leaveClub()} >Leave club</Link>
                                        }
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
                                        <ShowMeetingsCard owner={bookClubInfo.owner} loggedUser={loggedUser} clubMeetings={clubMeetings} setModalShow={setModalShow} />
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