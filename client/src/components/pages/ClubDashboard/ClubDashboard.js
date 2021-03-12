import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Card, ButtonGroup, Spinner } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import ShowMeetingsCard from '../CreateClubMeetings/ShowMeetingsCard'
import CreateMeetingModal from '../CreateClubMeetings/CreateMeetingModal'

import BookClubService from '../../../service/bookclubs.service'
import MeetingService from '../../../service/meeting.service'
import ReaderService from '../../../service/reader.service'

import './ClubDashboard.css'

function ClubDashboard(props) {

    const { loggedUser } = props
    
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
                props.fetchUser()
                props.history.push('/bookclubs-list')
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
                    <Container>
                        <Row>
                            <Col className="find-book">    
                                <h2>Book Club Page - { bookClubInfo.bookClubName }</h2>  
                            </Col>
                        </Row>
                        <Row>
                            <Col lg={4}>
                                <Card>
                                    <Card.Img className="club-book-cover" variant="top" src={bookClubInfo.imgBookCover} />
                                    <Card.Body className="dashboard-card">
                                        <h4>{bookClubInfo.bookTitle}</h4>
                                        <p><strong>Author(s): </strong>{bookClubInfo.bookAuthor.map((author, idx) => <p>- {author}</p>)}</p>
                                        <p><strong>Genre: </strong>{bookClubInfo.genre}</p>
                                        <p><strong>Start date: </strong>{bookClubInfo.startDate.slice(0,10)}</p>
                                        <p><strong>Duration: </strong>{bookClubInfo.duration}</p>
                                        <p><strong>Members: </strong>{bookClubInfo.participants.length}</p>

                                        <ButtonGroup size="sm" style={{ width: '100%' }} >
                                        {
                                            bookClubInfo.owner === loggedUser._id ?
                                            <Link to={`/edit-club/${bookClubInfo._id}`} className="btn btn-light btn-edit">Edit club</Link>
                                            :
                                            <Link to='/bookclubs-list' className="btn btn-outline-danger" onClick={() => leaveClub()} >Leave club</Link> 
                                        }
                                        </ButtonGroup>

                                    </Card.Body>
                                </Card>
                                    <Link to='/profile' className="btn btn-outline-secondary btn-back">Back to profile</Link>
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
                        modalShow && <CreateMeetingModal refreshList={() => findMeetings()} {...props} show={modalShow} setModalShow={setModalShow} onHide={() => setModalShow(false)}/>
                    }

                </div>
            }
        </div>
    )
}

export default ClubDashboard