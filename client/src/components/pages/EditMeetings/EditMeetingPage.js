import React, { useState, useEffect } from 'react'
import { Container, Form, Row, Col, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import MeetingService from '../../../service/meeting.service'

import editIcon from '../../../images/edit-icon.jpg'

function EditMeetingPage(props) {

    const [meetingInfo, setMeetingInfo] = useState('')
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)


    const meetingService = new MeetingService()
    const meeting_id = props.match.params._id

    useEffect(() => {
        meetingService.findOne(meeting_id)
        .then(response => {
            setMeetingInfo(response.data)
            setLoading({loading: false})
        })
        .catch(err => console.log(err))
    }, [])

    function deleteMeeting() {
        meetingService.deleteMeeting(meeting_id)
            .then(() => {
                props.history.push(`/club-dashboard/${meetingInfo.bookClub}`)
            })
            .catch(err => console.log(err))
    }

    function handleSubmit() {
        meetingService.editMeeting(meeting_id, meetingInfo)
            .then(() => {
                props.history.push(`/club-dashboard/${meetingInfo.bookClub}`)
            })
            .catch(err => console.log(err))
    }

    return (
        <Container fluid>

        <Row>
            <Col className="container-edit align-items-center" lg={{ span: 8, offset: 2 }}>
            
                <Form onSubmit={e => handleSubmit(e)}>
                    <h5><img src={editIcon} alt="edit-icon" />Edit meeting</h5>
                    <hr />
                    <Form.Group>
                        <Form.Label>
                        Meeting name (e.g. "First meeting", "Discussion Chapters 1-5")
                        </Form.Label>
                        <Form.Control type="text" placeholder="Discussion Chapters 1-5..." name="title" value={meetingInfo.title} onChange={(e) => setMeetingInfo({...meetingInfo, title: e.target.value})} />
                    </Form.Group>

                    <Row>
                        <Col>
                            <Form.Group>
                                <Form.Label>Meeting date</Form.Label>
                                <Form.Control type="text" name="date" value={meetingInfo.date} onChange={(e) => setMeetingInfo({...meetingInfo, date: e.target.value})} />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Label>Meeting time</Form.Label>
                                <Form.Control type="time" name="time" value={meetingInfo.time} onChange={(e) => setMeetingInfo({...meetingInfo, time: e.target.value})} />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Label>Meeting duration</Form.Label>
                                <Form.Control as="select" name="duration" value={meetingInfo.duration} onChange={(e) => setMeetingInfo({...meetingInfo, duration: e.target.value})} >
                                    <option >1 hour</option>
                                    <option >1 hour 30 minutes</option>
                                    <option >2 hours</option>
                                    <option >2 hours 30 minutes</option>
                                    <option >3 hours</option>
                                    <option >4 hours</option>
                                </Form.Control>
                            </Form.Group>
                        </Col>
                    </Row>
                    
                    <Form.Group>
                        <Form.Label>Meeting link</Form.Label>
                        <Form.Control type="text" placeholder="Link here..." name="meetingLink" value={meetingInfo.meetingLink} onChange={(e) => setMeetingInfo({...meetingInfo, meetingLink: e.target.value})} />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Note to members</Form.Label>
                        <Form.Control as="textarea" name="description" value={meetingInfo.description} onChange={(e) => setMeetingInfo({...meetingInfo, description: e.target.value})} rows={3} />
                    </Form.Group>

                    {
                        error && <span>Not able to edit meeting</span>
                    }

                    <Button block variant="light" className="btn-edit" type="submit">Edit</Button>
                    <Button block variant="outline-danger" onClick={() => deleteMeeting()}>Delete</Button>
                    <Link to={`/club-dashboard/${meetingInfo.bookClub}`} className="btn btn-info btn-back">Go back</Link>
                </Form>

            </Col>
        </Row>


        </Container>
    )
}

export default EditMeetingPage
