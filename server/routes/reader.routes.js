const express = require('express')
const router = express.Router()

const Event = require('../models/event.model')
const Reader = require('../models/reader.model')

//Endpoints


//Join Book Club

router.put('/joinBookClub/:bookClub_id', (req, res, next) => {

    Event
        .findById(req.params.bookClub_id)
        .then(response => {
            if ( response.participants.includes(req.user._id) ) {
                console.log('Sorry, you already joined this club')
                res.json({message: 'Sorry, you already joined this club'})
            } else {
                const eventPromise = Event.findByIdAndUpdate(req.params.bookClub_id, { $push: { participants: req.user._id, participantsEmails: req.user.userInfo.email } }, { new: true })
                const readerPromise = Reader.findByIdAndUpdate(req.user._id, { $push: { clubsJoined: req.params.bookClub_id }}, { new: true })
            
                Promise.all([eventPromise, readerPromise])
                    .then(results => res.json(results))
                    .catch(err => next(new Error(err)))
            }
        })
        .catch(err => res.status(500).json({code: 500, message: 'Error'}))
})

//Leave Book Club

router.put('/leaveBookClub/:bookClub_id', (req, res, next) => {

    const eventPromise = Event.findByIdAndUpdate(req.params.bookClub_id, { $pull: { participants: req.user._id, participantsEmails: req.user.userInfo.email}}, { new: true })

    const readerPromise = Reader.findByIdAndUpdate(req.user._id, { $pull: { clubsJoined: req.params.bookClub_id }}, { new: true })

    Promise.all([eventPromise, readerPromise])
        .then(results => res.json(results))
        .catch(err => next(new Error(err)))

})

//Edit Reader info
router.put('/edit-profile/:reader_id', (req, res) => {

    console.log("el req body del profile", req.body)
    console.log("el req user id", req.user._id)

    Reader
        .findByIdAndUpdate(req.user._id, req.body)
        .then(response => res.json(response))
        .catch(err => res.status(500).json({ code:500, message: 'Error editing profile', err}))

})

module.exports = router