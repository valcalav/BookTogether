import React from 'react'
import { Modal, Button } from 'react-bootstrap'
import CreateMeetingForm from './CreateMeetingForm'

function CreateMeetingModal(props) {

    const {
        setModalShow,
        onHide
    } = props

    function closeModal() {
        setModalShow(false)
    }

    return (
        <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered backdrop="static" >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                New meeting
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <CreateMeetingForm closeModal={closeModal} {...props} />
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={onHide}>Cancel</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default CreateMeetingModal
