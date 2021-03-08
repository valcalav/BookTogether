const express = require('express')
const router = express.Router()

const Meeting = require('../models/meeting.model')
const Event = require('./../models/event.model')

//Endpoints


//Create meeting

router.post('/:event_id/createMeeting', (req, res) => {

    console.log("req body", req.body, "y req.params", req.params.event_id )

    const event_id = req.params.event_id
    const meeting = { ...req.body, bookClub: event_id }
    
    Meeting
        .create(meeting)
        .then(meeting => {
            Event
                .findByIdAndUpdate(req.params.event_id, { $push: { meetings: meeting._id }}, { new: true })
                .then(() => res.json(meeting))
                .catch(err => {
                    console.log(err)
                    res.status(500).json({ code: 500, message: 'Error updating event with meeting'})})
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ code: 500, message: 'Error creating meeting'})})
})


//Edit meeting

router.put('/editMeeting/:meeting_id', (req, res) => {

    Meeting
        .findByIdAndUpdate(req.params.meeting_id, req.body)
        .then(response => res.json(response))
        .catch(err => res.status(500).json({ code: 500, message: 'Error editing meeting'}))
})

//Find one meeting
router.get('/details/:meeting_id', (req, res) => {

    Meeting
        .findById(req.params.meeting_id)
        .then(response => res.json(response))
        .catch(err => res.status(500).json({ code: 500, message:'Error fetching meeting', err}))
})

//Find meetings by Book Club
router.get('/findMeetings/:bookClub', (req, res) => {

    const bookClub = req.params.bookClub

    Meeting
        .find({bookClub})
        .then(meetings => { res.json(meetings) })
        .catch(err => res.status(500).json({code: 500, message: 'Error fetching Meetings', err}))
})

//Delete meeting

router.delete('/delete/:meeting_id', (req, res) => {

    Meeting
        .findByIdAndDelete(req.params.meeting_id, req.body)
        .then(() => res.json({message: 'Meeting deleted'}))
        .catch(err => res.status(500).json({ code: 500, message: 'Error deleting post'}))
})





module.exports = router