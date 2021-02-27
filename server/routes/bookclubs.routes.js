const express = require('express')
const router = express.Router()

const Event = require('./../models/event.model')

//Endpoints

//Book clubs list
router.get('/getAllBookClubs', (req, res) => {

    Event
        .find()
        .then(allEvents => res.json({allEvents}))
        .catch(err => res.status(500).json({code: 500, message: 'Error fetching Book Clubs'}))

})

//Book clubs list by genre
router.get('/:genre', (req, res) => {

    const genre = req.params.genre

    Event
        .find(genre)
        .then(bookClubs => { res.jason(bookClubs) })
        .catch(err => res.status(500).json({code: 500, message: 'Error fetching Book Clubs'}))
})

//Book club details
router.get('/details/:bookClub_id', (req, res) => {

    const bookClub_id = req.params.bookClub_id

    Event
        .findById(bookClub_id)
        .then(response => res.json(response))
        .catch(err => res.status(500).json({ code: 500, message:'Error fetching Book Club', err}))
})

//New Book club
router.post('/newBookClub', (req, res) => {

    const bookClub = { ...req.body, organizer: req.user._id}

    Event
        -create(bookClub)
        .then(response => res.json(response))
        .catch(err => res.status(500).json({ code:500, message:'Error saving new Book Club'}))
})

//Edit Book club
router.put('/editBookClub/:bookClub_id', (req, res) => {

    Event
        .findByIdAndUpdate(req.params.bookClub_id, req.body)
        .then(response => res.json(response))
        .catch(err => res.status(500).json({ code:500, message: 'Error editing Book Club'}))
})

//Delete Book Club
router.delete('/:bookClub_id', (req, res) => {

    Event
        .findByIdAndDelete(req.params.bookClub_id, req.body)
        .then(()=> res.json({message: 'Book Club deteled.'}))
        .catch(err => res.status(500).json({ code: 500, message: 'Error deleting BookClub'}))
})




module.exports = router