const express = require('express')
const router = express.Router()

const Event = require('../models/event.model')
const Reader = require('../models/reader.model')

//Endpoints


//Join Book Club

router.put('/joinBookClub/:bookClub_id', (req, res, next) => {

    const eventPromise = Event.findByIdAndUpdate(req.params.bookClub_id, { $push: { participants: req.user._id}}, { new: true })

    const readerPromise = Reader.findByIdAndUpdate(req.user._id, { $push: { clubsJoined: req.params.bookClub_id }}, { new: true })

    Promise.all([eventPromise, readerPromise])
        .then(results => res.json(results))
        .catch(err => next(new Error(err)))

})

//Leave Book Club

router.put('/leaveBookClub/:bookClub_id', (req, res, next) => {

    const eventPromise = Event.findByIdAndUpdate(req.params.bookClub_id, { $pull: { participants: req.user._id}}, { new: true })

    const readerPromise = Reader.findByIdAndUpdate(req.user._id, { $pull: { clubsJoined: req.params.bookClub_id }}, { new: true })

    Promise.all([eventPromise, readerPromise])
        .then(results => res.json(results))
        .catch(err => next(new Error(err)))

})


module.exports = router