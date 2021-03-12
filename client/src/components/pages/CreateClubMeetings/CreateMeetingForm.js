import React, { useState } from 'react'
import MeetingCalendar from './NewMeetingCalendar'
import { Form, Row, Col, Button } from 'react-bootstrap'

import MeetingService from '../../../service/meeting.service'


function CreateMeetingForm({refreshList, closeModal, match}) {

    const meetingService = new MeetingService()

    const [createMeeting, setCreateMeeting] = useState({
        title: '',
        date: '',
        time: '',
        duration: '1 hour',
        meetingLink: '',
        description: ''
    })
    const [error, setError] = useState(null)
    

    function handleSubmitCreate(e) {
        e.preventDefault()
        
        meetingService.newMeeting(match.params.bookClub_id, createMeeting)
            .then(() => {
                refreshList()
                closeModal()
            })
            .catch(err => {
                console.log("error", err)
                setError(err)
            })
    }

    return (
        <div>
            <Form onSubmit={e => handleSubmitCreate(e)}>
                <Form.Group>
                    <Form.Label>
                    Meeting name (e.g. "First meeting", "Discussion Chapters 1-5")
                    </Form.Label>
                    <Form.Control type="text" placeholder="Discussion Chapters 1-5..." name="title" value={createMeeting.title} onChange={(e) => setCreateMeeting({...createMeeting, title: e.target.value})} />
                </Form.Group>

                <Row>
                    <Col>
                        <MeetingCalendar createMeeting={createMeeting} setCreateMeeting={(date)=>setCreateMeeting(date)} />
                    </Col>

                    <Col>
                        <Form.Group>
                            <Form.Label>Meeting time</Form.Label>
                            <Form.Control type="time" name="time" value={createMeeting.time} onChange={(e) => setCreateMeeting({...createMeeting, time: e.target.value})} />
                        </Form.Group>
                        <br />
                        <Form.Group>
                            <Form.Label>Meeting duration</Form.Label>
                            <Form.Control as="select" name="duration" value={createMeeting.duration} onChange={(e) => setCreateMeeting({...createMeeting, duration: e.target.value})} >
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
                    <Form.Control type="text" placeholder="Link here..." name="meetingLink" value={createMeeting.meetingLink} onChange={(e) => setCreateMeeting({...createMeeting, meetingLink: e.target.value})} />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Note to members</Form.Label>
                    <Form.Control as="textarea" name="description" value={createMeeting.description} onChange={(e) => setCreateMeeting({...createMeeting, description: e.target.value})} rows={2} />
                </Form.Group>

                {
                    error && <span>Not able to create meeting</span>
                }
                <p><strong>Club members will receive and email with the details of the new meeting</strong></p>
                <Button block variant="outline-info" type="submit">Create</Button>
            </Form>
        </div>
    )
}

export default CreateMeetingForm
