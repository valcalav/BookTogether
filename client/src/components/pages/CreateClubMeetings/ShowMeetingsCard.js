import React, { useState } from 'react'
import { Card, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'


function ShowMeetingsCard({setModalShow, clubMeetings, owner, loggedUser}) {

    
    return (
        <div>
            <Card>
                <Card.Header>Club meetings</Card.Header>
                <Card.Body>
                    <Card.Text>

                    {clubMeetings && clubMeetings.map((elm, idx) => <div key={idx}>
                        <p><strong>{elm.title}</strong></p>
                        <p>Date: {elm.date} / Time: {elm.time}</p>
                        <p>Duration: {elm.duration}</p>
                        <p>Meeting link: {elm.meetingLink}</p>
                        <small>Note: {elm.description}</small>
                        <br />
                        <div style={{ display: "flex" }}>
                            <Link to={`/edit-meeting/${elm._id}`} style={{marginLeft: "auto"}} className="btn btn-secondary">Edit</Link>
                        </div>
                        <hr />
                    </div>)}
                    
                    </Card.Text>
                    {
                        owner === loggedUser._id ?
                        <>
                        <Button block variant="primary" onClick={() => setModalShow(true)}>Create meeting</Button>
                        <small>Only you can create meetings for the Book Club</small>
                        </>
                        : null

                    }
                </Card.Body>
            </Card>
        </div>
    )
}

export default ShowMeetingsCard
