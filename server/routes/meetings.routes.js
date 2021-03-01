const express = require('express')
const router = express.Router()

const Meeting = require('../models/meeting.model')
const Event = require('./../models/event.model')

//Endpoints


//Create meeting

router.post('/createMeeting', (req, res) => {
    const event_id = 
    Meeting
        .create(req.body)
        .then(meeting => {
            Event
                .findByIdAndUpdate(req.params.id, { $push: { meetings: meeting._id }}, { new: true })
                .then(() => res.jason(meeting))
                .catch(err => res.status(500).json({ code: 500, message: 'Error updating event'}))
        })
        .catch(err => res.status(500).json({ code: 500, message: 'Error creating meeting'}))
})


//Edit meeting

router.put('/editMeeting/:meeting_id', (req, res) => {

    Meeting
        .findByIdAndUpdate(req.params.meeting_id, req.body)
        .then(response => res.json(response))
        .catch(err => res.status(500).json({ code: 500, message: 'Error editing meeting'}))
})


//Delete meeting

router.delete('/delete/:meeting_id', (req, res) => {
    Meeting
        .findByIdAndDelete(req.params.meeting_id, req.body)
        .then(() => res.json({message: 'Meeting deleted'}))
        .catch(err => res.status(500).json({ code: 500, message: 'Error deleting post'}))
})


module.exports = router