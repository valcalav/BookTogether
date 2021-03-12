import React from 'react'
import { Modal, Button } from 'react-bootstrap'
import CreateMeetingForm from './CreateMeetingForm'

import Calendar from '../../../images/calendar.png'

import '../ClubDashboard/ClubDashboard.css'


function CreateMeetingModal(props) {
    
    const {
        refreshList,
        setModalShow,
        onHide
    } = props

    function closeModal() {
        setModalShow(false)
    }

    return (
        <Modal className="meeting-modal" {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered backdrop="static" >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                <p><img src={Calendar} alt="calendar-icon"/></p>.
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <CreateMeetingForm closeModal={closeModal} refreshList={refreshList} {...props} />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-secondary" onClick={onHide}>Cancel</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default CreateMeetingModal
